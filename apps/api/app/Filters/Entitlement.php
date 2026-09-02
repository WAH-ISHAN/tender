<?php

namespace App\Filters;

use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Plans;

/**
 * Does this plan include the capability?
 *
 * This filter originally called service('tenant') and service('entitlements') —
 * neither of which existed, so every tenant-scoped request returned 500. It now
 * reads $request->orgId (set by the tenant filter) and the plan matrix. A
 * service locator will happily hand you null and let you find out in production.
 */
class Entitlement implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $capability = $arguments[0] ?? '';
        $orgId      = (int) ($request->orgId ?? 0);

        // Entitlements are re-read server-side, not trusted from the token, so a
        // downgrade or suspension takes effect on the very next request.
        $org = model('App\Models\OrganisationModel')->find($orgId);
        if (! $org) {
            return problem(403, 'no_org_context', 'This account is not attached to an organisation.');
        }

        $plan   = (string) $org['plan'];
        $status = (string) $org['sub_status'];
        $plans  = config(Plans::class);

        if ($plan !== 'free' && $plan !== 'staff' && $status === 'expired') {
            $plan = 'free';
        }

        if (! $plans->allows($plan, $capability)) {
            return problem(402, 'plan_required', 'Your plan does not include this.', [
                'capability' => $capability,
                'plan'       => $plan,
                'upgrade_to' => $plans->upgradeTo[$capability] ?? 'business',
            ]);
        }

        $request->plan = $plan;
        $request->org  = $org;

        return null;
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null) {}
}
