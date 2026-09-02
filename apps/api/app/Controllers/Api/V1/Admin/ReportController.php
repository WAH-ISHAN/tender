<?php

namespace App\Controllers\Api\V1\Admin;

use App\Controllers\Api\V1\BaseApiController;

/**
 * EVERY figure on this dashboard is a real query.
 *
 * A dashboard that reports constants is worse than none, because people stop
 * checking the thing it was meant to watch.
 */
class ReportController extends BaseApiController
{
    public function health()
    {
        $db  = db_connect();
        $now = date('Y-m-d H:i:s');

        $bidders = $db->table('organisations')->where('type', 'bidder')->countAllResults();
        $paying  = $db->table('organisations')->where('type', 'bidder')->where('sub_status', 'active')->countAllResults();
        $total   = $db->table('notices')->where('status', 'published')->countAllResults();
        $verified= $db->table('notices')->where('status', 'published')->where('verified', 1)->countAllResults();
        $last    = $db->table('feed_sources')->selectMax('last_fetch_at', 'm')->get()->getFirstRow('array');

        return $this->ok([
            'catalogue' => [
                'live' => $db->table('notices')->where('status', 'published')->where('closing_at >=', $now)->countAllResults(),
                'archived' => $db->table('notices')->where('status', 'published')->where('closing_at <', $now)->countAllResults(),
                'added_today' => $db->table('notices')->where('created_at >=', date('Y-m-d 00:00:00'))->countAllResults(),
                'verified_pct' => $total ? round($verified / $total * 100, 1) : 0,
                'awaiting_review' => $db->table('notices')->where('status', 'unverified')->countAllResults(),
                'minutes_since_fetch' => $last['m'] ? (int) round((time() - strtotime($last['m'])) / 60) : null,
            ],
            'accounts' => [
                'bidders' => $bidders,
                'paying_bidders' => $paying,
                'conversion_pct' => $bidders ? round($paying / $bidders * 100, 1) : 0,
                'publishers' => $db->table('organisations')->where('type', 'company')->countAllResults(),
                'awaiting_payment' => $db->table('payments')->where('state', 'claimed')->countAllResults(),
                'unverified_orgs' => $db->table('organisations')->where('verify_state', 'unverified')->countAllResults(),
            ],
            'engagement' => [
                'active_alert_profiles' => $db->table('alert_profiles')->where('active', 1)->countAllResults(),
                'tenders_in_pipelines' => $db->table('bids')->countAllResults(),
                'submissions' => $db->table('submissions')->countAllResults(),
                'awards' => $db->table('awards')->countAllResults(),
            ],
        ]);
    }

    public function coverage()
    {
        return $this->ok(db_connect()->table('notices')
            ->select('districts.name AS district, COUNT(*) AS n')
            ->join('districts', 'districts.id = notices.district_id', 'left')
            ->where('notices.status', 'published')
            ->groupBy('districts.name')->orderBy('n', 'DESC')->get()->getResultArray());
    }

    /** Moderation queue. Each row is flagged with WHAT is missing, so a
     *  reviewer reads the gaps before the prose. */
    public function queue()
    {
        $rows = db_connect()->table('notices')
            ->select('notices.*, feed_sources.name AS source')
            ->join('feed_sources', 'feed_sources.id = notices.source_id', 'left')
            ->where('notices.status', 'unverified')->orderBy('notices.created_at', 'DESC')
            ->get()->getResultArray();

        foreach ($rows as &$r) {
            $missing = [];
            foreach (['closing_at' => 'closing date', 'estimated_value' => 'value',
                      'district_id' => 'district', 'authority_id' => 'authority'] as $col => $label) {
                if (empty($r[$col])) {
                    $missing[] = $label;
                }
            }
            $r['missing'] = $missing;
        }

        return $this->ok($rows);
    }

    public function publishNotice(int $id)
    {
        $notice = model('App\Models\NoticeModel')->find($id);
        if (! $notice) {
            return problem(404, 'not_found', 'No such notice.');
        }

        // Refused outright. A wrong deadline published as fact is the one error
        // that loses a customer permanently.
        if (empty($notice['closing_at'])) {
            return problem(409, 'no_closing_date', 'A notice cannot be published without a closing date.');
        }

        model('App\Models\NoticeModel')->update($id, [
            'status' => 'published', 'verified' => 1,
            'published_at' => $notice['published_at'] ?: date('Y-m-d H:i:s'),
        ]);

        return $this->ok(['published' => true]);
    }

    /** MERGE, not delete. A URL already indexed keeps resolving and says where
     *  it went. */
    public function merge(int $id)
    {
        $canonicalId = (int) ($this->body()['canonical_id'] ?? 0);
        $model = model('App\Models\NoticeModel');

        if ($id === $canonicalId || ! $model->find($canonicalId) || ! $model->find($id)) {
            return problem(422, 'bad_merge', 'Give a different, existing canonical notice.');
        }

        $model->update($id, ['canonical_id' => $canonicalId, 'status' => 'withdrawn']);

        return $this->ok(['merged_into' => $canonicalId]);
    }

    /**
     * "Healthy" means producing what THIS source normally produces, computed as
     * its own four-week weekly average. A source that has broken looks exactly
     * like a source having a quiet week unless its own baseline is watched.
     */
    public function sources()
    {
        $db   = db_connect();
        $rows = $db->table('feed_sources')->get()->getResultArray();

        foreach ($rows as &$s) {
            $thisWeek = $db->table('notices')->where('source_id', $s['id'])
                ->where('created_at >=', date('Y-m-d H:i:s', strtotime('-7 days')))->countAllResults();
            $total = $db->table('notices')->where('source_id', $s['id'])->countAllResults();
            $verified = $db->table('notices')->where('source_id', $s['id'])->where('verified', 1)->countAllResults();

            $baseline = (float) $s['weekly_baseline'];
            $s['this_week'] = $thisWeek;
            $s['baseline'] = $baseline;
            $s['verified_pct'] = $total ? round($verified / $total * 100, 1) : 0;
            $s['status'] = match (true) {
                (int) $s['active'] === 0 => 'paused',
                $s['last_error'] !== null => 'failing',
                $baseline > 0 && $thisWeek < $baseline * 0.5 => 'below_baseline',
                default => 'healthy',
            };
        }

        return $this->ok($rows);
    }

    /** Returns 501 with the reason, rather than pretending to queue something.
     *  The endpoint exists so the console can call it the day the worker lands. */
    public function runSource(int $id)
    {
        return problem(501, 'not_implemented', 'The crawl worker is not built yet.', [
            'design' => 'Fetch on a schedule, store the raw artefact, parse into a staging row, '
                . 'score confidence, auto-publish above the threshold and queue the rest.',
            'available_today' => ['php spark documents:mirror'],
        ]);
    }

    public function organisations()
    {
        $db   = db_connect();
        $rows = $db->table('organisations')
            ->select('organisations.*, districts.name AS district')
            ->join('districts', 'districts.id = organisations.district_id', 'left')
            ->orderBy('organisations.created_at', 'DESC')->get()->getResultArray();

        foreach ($rows as &$o) {
            $o['seats_used'] = $db->table('users')->where('org_id', $o['id'])->countAllResults();
            $o['tenders_published'] = $db->table('notices')->where('org_id', $o['id'])->where('status', 'published')->countAllResults();
            $o['bids_lodged'] = $db->table('submissions')->where('bidder_org_id', $o['id'])->countAllResults();
        }

        return $this->ok($rows);
    }

    public function verifyOrg(int $id)
    {
        $state = ($this->body()['state'] ?? 'verified') === 'rejected' ? 'rejected' : 'verified';
        model('App\Models\OrganisationModel')->update($id, [
            'verify_state' => $state,
            'verified_at' => $state === 'verified' ? date('Y-m-d H:i:s') : null,
        ]);

        return $this->ok(['verify_state' => $state]);
    }
}
