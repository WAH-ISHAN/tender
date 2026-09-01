<?php

namespace App\Controllers\Api\V1\Authority;

class TeamController extends WorkspaceBase
{
    public const ROLES = ['owner', 'officer', 'approver', 'evaluator', 'finance', 'observer'];

    public function index()
    {
        $orgId = (int) $this->request->orgId;
        $db    = db_connect();

        return $this->ok([
            'members' => $db->table('users')->select('id, name, email, role, status, last_login_at')
                ->where('org_id', $orgId)->get()->getResultArray(),
            'invitations' => $db->table('invitations')->select('id, email, role, state, expires_at')
                ->where('org_id', $orgId)->where('state', 'pending')->get()->getResultArray(),
        ], [
            'roles' => self::ROLES,
            // The distinction that matters more than the roles themselves.
            'note' => 'These are organisation-wide capabilities. Committee membership is '
                . 'per tender and is a different thing entirely.',
        ]);
    }

    public function invite()
    {
        $in    = $this->body();
        $orgId = (int) $this->request->orgId;
        $role  = in_array($in['role'] ?? '', self::ROLES, true) ? $in['role'] : 'observer';
        $db    = db_connect();
        $org   = model('App\Models\OrganisationModel')->find($orgId);

        // An invitation nobody has accepted still holds a seat someone else
        // cannot use.
        $used = $db->table('users')->where('org_id', $orgId)->countAllResults()
              + $db->table('invitations')->where('org_id', $orgId)->where('state', 'pending')->countAllResults();

        if ($used >= (int) $org['seats']) {
            return problem(402, 'seats_exhausted', 'All seats on this plan are in use.', [
                'seats' => (int) $org['seats'], 'used' => $used,
                'remedy' => 'Revoke an outstanding invitation or upgrade the plan.',
                'upgrade_to' => 'enterprise',
            ]);
        }

        $token = bin2hex(random_bytes(24));
        $db->table('invitations')->insert([
            'org_id' => $orgId, 'email' => strtolower((string) $in['email']), 'role' => $role,
            'token_hash' => hash('sha256', $token), 'state' => 'pending',
            'expires_at' => date('Y-m-d H:i:s', time() + 14 * 86400),
            'created_at' => date('Y-m-d H:i:s'),
        ]);

        return $this->ok([
            // Shown once. We store only a hash, so it cannot be recovered.
            'accept_url' => '/invitations/accept?token=' . $token,
            'expires_at' => date('c', time() + 14 * 86400),
        ], [
            'delivery' => 'E-mail delivery is not live yet. Copy this link and send it '
                . 'yourself — we would rather say so than claim to have sent something.',
        ], 201);
    }

    public function changeRole(int $userId)
    {
        $orgId = (int) $this->request->orgId;
        $role  = $this->body()['role'] ?? '';
        if (! in_array($role, self::ROLES, true)) {
            return problem(422, 'bad_role', 'Unknown role.');
        }

        $db   = db_connect();
        $user = $db->table('users')->where('id', $userId)->where('org_id', $orgId)->get()->getFirstRow('array');
        if (! $user) {
            return problem(404, 'not_found', 'No such member.');
        }

        // Demoting the last owner would leave nobody with the right to add one back.
        if ($user['role'] === 'owner' && $role !== 'owner') {
            $owners = $db->table('users')->where('org_id', $orgId)->where('role', 'owner')->countAllResults();
            if ($owners <= 1) {
                return problem(409, 'last_owner', 'An organisation must keep at least one owner.');
            }
        }

        $db->table('users')->where('id', $userId)->update(['role' => $role]);

        return $this->ok(['role' => $role], [
            // Past actions keep the role they were taken under. The audit trail
            // records what happened, not what is true now.
            'note' => 'Approvals already signed are unaffected by this change.',
        ]);
    }

    public function suppliers()
    {
        $rows = db_connect()->table('organisations')
            ->select('organisations.id, organisations.name, organisations.cida_grade, districts.name AS district')
            ->join('districts', 'districts.id = organisations.district_id', 'left')
            ->where('organisations.type', 'bidder')->limit(200)->get()->getResultArray();

        $db = db_connect();
        foreach ($rows as &$r) {
            $ratings = $db->table('ratings')->selectAvg('score', 'avg')->selectCount('id', 'n')
                ->where('rated_org_id', $r['id'])->get()->getFirstRow('array');
            $n = (int) $ratings['n'];
            $r['ratings_count'] = $n;
            // Below five ratings NO average is published. A mean of two is noise
            // dressed as a score.
            $r['rating'] = $n >= 5 ? round((float) $ratings['avg'], 2) : null;
            $r['rating_note'] = $n >= 5 ? null : 'Fewer than five ratings — no average published.';
        }

        return $this->ok($rows);
    }

    public function profile()
    {
        if ($this->request->getMethod() === 'PUT') {
            model('App\Models\OrganisationModel')->update((int) $this->request->orgId,
                array_intersect_key($this->body(), array_flip([
                    'name', 'reg_no', 'district_id', 'cida_grade', 'contact_email', 'contact_phone',
                    'approval_threshold', 'standstill_days',
                ])));
        }

        return $this->ok(model('App\Models\OrganisationModel')->find((int) $this->request->orgId));
    }
}
