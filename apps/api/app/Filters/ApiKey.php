<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;

/**
 * This filter used to accept ANY non-empty X-Api-Key header — it returned
 * "API key required" and then let anything through. An open feed with a padlock
 * drawn on it. Keys are now rows: SHA-256 hashed, quota-counted here so a
 * partner can never reach a controller it has already exhausted.
 */
class ApiKey implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $given = trim($request->getHeaderLine('X-Api-Key'));

        // One message for "no such key" and "revoked key". Distinguishing them
        // tells an attacker which guesses were once real.
        $deny = static fn () => problem(401, 'invalid_key', 'API key missing, unknown or revoked.');

        if ($given === '') {
            return $deny();
        }

        $keys = model('App\Models\ApiKeyModel');
        $row  = $keys->where('key_hash', hash('sha256', $given))->first();

        if (! $row || $row['revoked_at'] !== null) {
            return $deny();
        }

        $today = date('Y-m-d');
        $used  = $row['quota_date'] === $today ? (int) $row['used_today'] : 0;

        if ($used >= (int) $row['daily_quota']) {
            return problem(429, 'quota_exhausted', 'Daily quota exhausted.', [
                'quota'    => (int) $row['daily_quota'],
                'resets_at'=> date('c', strtotime('tomorrow midnight')),
            ]);
        }

        $keys->update($row['id'], ['used_today' => $used + 1, 'quota_date' => $today]);

        $request->apiKey    = $row;
        $request->orgId     = (int) $row['org_id'];
        $request->remaining = (int) $row['daily_quota'] - $used - 1;

        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
        if (isset($request->remaining)) {
            $response->setHeader('X-RateLimit-Remaining', (string) $request->remaining);
        }
    }
}
