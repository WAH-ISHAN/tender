<?php

namespace App\Controllers\Api\V1\Partner;

use App\Controllers\Api\V1\BaseApiController;
use App\Transformers\NoticeTransformer;

class PartnerController extends BaseApiController
{
    /**
     * Cursor paging, not page numbers. A partner polling every ten minutes needs
     * "everything since the last thing I saw"; offset paging silently skips rows
     * whenever new notices arrive between two requests. The cursor is handed
     * back rather than left for the partner to derive.
     */
    public function notices()
    {
        $cursor = (int) ($this->request->getGet('cursor') ?? 0);
        $limit  = min(200, max(1, (int) ($this->request->getGet('limit') ?? 50)));

        $rows = model('App\Models\NoticeModel')->partnerFeed($cursor, $limit);
        $next = $rows ? (int) $rows[count($rows) - 1]['id'] : $cursor;

        return $this->ok(NoticeTransformer::collection($rows, 'paid'), [
            'cursor' => $next,
            'has_more' => count($rows) === $limit,
            'next' => count($rows) === $limit ? '/api/v1/partner/notices?cursor=' . $next . '&limit=' . $limit : null,
        ]);
    }

    public function registerWebhook()
    {
        $in    = $this->body();
        $url   = (string) ($in['url'] ?? '');
        $event = (string) ($in['event'] ?? '');

        if (! str_starts_with($url, 'https://')) {
            return problem(422, 'insecure_url', 'Webhook URLs must be https.');
        }
        if (! in_array($event, ['notice.published', 'notice.updated', 'award.published'], true)) {
            return problem(422, 'unknown_event', 'Unknown event.', [
                'allowed' => ['notice.published', 'notice.updated', 'award.published'],
            ]);
        }

        $secret = bin2hex(random_bytes(24));
        db_connect()->table('webhooks')->insert([
            'org_id' => (int) $this->request->orgId, 'url' => $url, 'event' => $event,
            'secret_hash' => hash('sha256', $secret), 'active' => 1,
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        return $this->ok(['url' => $url, 'event' => $event, 'signing_secret' => $secret], [
            // Storing something we can show again later means storing something
            // an attacker can read later.
            'warning' => 'This secret is shown exactly once. If you lose it, rotate the webhook.',
        ], 201);
    }
}
