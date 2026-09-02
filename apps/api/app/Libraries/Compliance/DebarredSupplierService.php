<?php

namespace App\Libraries\Compliance;

/**
 * DebarredSupplierService
 * Validates contractors and bidders against the National Debarred / Suspended
 * Public Procurement Blacklist (Ministry of Finance / Department of Public Finance).
 */
class DebarredSupplierService
{
    /**
     * Checks if a supplier (by BRN or CIDA Reg No) is currently debarred.
     */
    public static function check(string $identifier): array
    {
        $cleanId = strtoupper(trim($identifier));
        
        $db = db_connect();
        $row = $db->table('debarred_suppliers')
            ->where('identifier', $cleanId)
            ->where('status', 'active')
            ->where('ends_at >=', date('Y-m-d'))
            ->get()
            ->getFirstRow('array');

        if ($row) {
            return [
                'is_debarred' => true,
                'reason'      => $row['reason'],
                'gazette_ref' => $row['gazette_ref'] ?? null,
                'starts_at'   => $row['starts_at'],
                'ends_at'     => $row['ends_at'],
            ];
        }

        return [
            'is_debarred' => false,
            'reason'      => null,
        ];
    }
}
