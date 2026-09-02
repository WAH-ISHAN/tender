<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

/**
 * The plan matrix.
 *
 * This is config and not a table on purpose: plans change on a commit, not on a
 * customer call, and a table nobody can edit safely is worse than a file
 * everybody can read. It moves to the database the day sales can change a plan
 * without a deploy — the entitlement filter reads a matrix either way, so
 * nothing else in the system changes when it does.
 */
class Plans extends BaseConfig
{
    /** capability key => plans that include it */
    public array $matrix = [
        'feed'          => ['free', 'business', 'publish', 'enterprise', 'staff'],
        'documents'     => ['business', 'publish', 'enterprise', 'staff'],
        'esubmission'   => ['business', 'publish', 'enterprise', 'staff'],
        'publish'       => ['publish', 'enterprise', 'staff'],
        'evaluation'    => ['publish', 'enterprise', 'staff'],
        'award'         => ['publish', 'enterprise', 'staff'],
        'partner_api'   => ['enterprise', 'staff'],
        'admin'         => ['staff'],
    ];

    /** which plan an unentitled caller should be told to buy, per capability */
    public array $upgradeTo = [
        'feed'        => 'business',
        'documents'   => 'business',
        'esubmission' => 'business',
        'publish'     => 'publish',
        'evaluation'  => 'publish',
        'award'       => 'publish',
        'partner_api' => 'enterprise',
    ];

    public array $catalogue = [
        'free'     => ['label' => 'Free',       'audience' => 'New bidder',        'annual' => 0,     'quarterly' => 0,    'free_views' => 5],
        'business' => ['label' => 'Business',   'audience' => 'Paid bidder',       'annual' => 24000, 'quarterly' => 7500, 'free_views' => 0],
        'publish'  => ['label' => 'Publisher',  'audience' => 'Buying organisation','annual' => 0,    'quarterly' => 0,    'free_views' => 0],
        'enterprise'=>['label' => 'Enterprise', 'audience' => 'Large buyer',       'annual' => null,  'quarterly' => null, 'free_views' => 0],
        'staff'    => ['label' => 'Staff',      'audience' => 'TenderHub',         'annual' => 0,     'quarterly' => 0,    'free_views' => 0],
    ];

    public int $freeViewLimit = 5;

    public function allows(string $plan, string $capability): bool
    {
        return in_array($plan, $this->matrix[$capability] ?? [], true);
    }
}
