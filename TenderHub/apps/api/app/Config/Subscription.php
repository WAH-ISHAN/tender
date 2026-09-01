<?php

namespace Config;

use CodeIgniter\Config\BaseConfig;

/**
 * Bank details live in exactly one place. An account number that disagrees with
 * itself across two screens costs a customer.
 */
class Subscription extends BaseConfig
{
    public array $bank = [
        'account_name'   => 'TenderHub (Private) Limited',
        'bank'           => 'Commercial Bank of Ceylon PLC',
        'branch'         => 'Negombo',
        'account_number' => '8001234567',
        'swift'          => 'CCEYLKLX',
        'send_slip_to'   => 'payments@tenderhub.lk',
        'whatsapp'       => '+94 77 000 0000',
        'reference_hint' => 'Use your organisation name and the word TENDERHUB.',
    ];

    public array $terms = [
        'annual'    => ['months' => 12, 'amount' => 24000],
        'quarterly' => ['months' => 3,  'amount' => 7500],
    ];
}
