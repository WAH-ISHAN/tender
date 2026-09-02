<?php

namespace App\Libraries\Compliance;

/**
 * CidaValidator
 * Validates Sri Lanka CIDA (Construction Industry Development Authority / ICTAD)
 * registration codes, categories, and financial grading limits.
 */
class CidaValidator
{
    // Valid CIDA Speciality Categories
    public const SPECIALITIES = [
        'BC' => 'Building Construction',
        'HW' => 'Highway Construction',
        'BR' => 'Bridge Construction',
        'IR' => 'Irrigation & Drainage',
        'WS' => 'Water Supply & Sewerage',
        'DR' => 'Dredging & Reclamation',
        'MD' => 'Maritime & Port Works',
        'EL' => 'Electrical Installation',
        'ME' => 'Mechanical Engineering',
        'HE' => 'Heavy Engineering',
    ];

    // CIDA Grade Financial Thresholds (LKR)
    public const GRADE_LIMITS = [
        'C1' => 1200000000, // Above 1.2 Billion LKR
        'C2' => 600000000,  // Up to 600 Million LKR
        'C3' => 300000000,  // Up to 300 Million LKR
        'C4' => 150000000,  // Up to 150 Million LKR
        'C5' => 75000000,   // Up to 75 Million LKR
        'C6' => 35000000,   // Up to 35 Million LKR
        'C7' => 15000000,   // Up to 15 Million LKR
        'C8' => 7000000,    // Up to 7 Million LKR
        'C9' => 3000000,    // Up to 3 Million LKR
        'C10' => 1000000,   // Up to 1 Million LKR
    ];

    /**
     * Validates if registration number complies with official CIDA/ICTAD format:
     * Examples: CIDA/BC/14582, ICTAD/HW/0942, CIDA/SP/88214
     */
    public static function isValidRegNo(string $regNo): bool
    {
        $reg = trim(strtoupper($regNo));
        // Matches CIDA or ICTAD followed by 2-4 letter category and 4-6 digit sequence
        return (bool) preg_match('/^(CIDA|ICTAD)\/[A-Z0-9]{2,4}\/[0-9]{4,6}$/', $reg);
    }

    /**
     * Checks if contractor's CIDA grade qualifies for a given tender estimated value.
     */
    public static function isGradeEligible(string $grade, float $estimatedValue): bool
    {
        $g = strtoupper(trim($grade));
        if (! isset(self::GRADE_LIMITS[$g])) {
            return false;
        }

        // C1 has no upper ceiling
        if ($g === 'C1') {
            return true;
        }

        return $estimatedValue <= self::GRADE_LIMITS[$g];
    }

    /**
     * Parses and returns details of a CIDA registration number.
     */
    public static function parse(string $regNo): ?array
    {
        $reg = trim(strtoupper($regNo));
        if (! preg_match('/^(CIDA|ICTAD)\/([A-Z0-9]{2,4})\/([0-9]{4,6})$/', $reg, $m)) {
            return null;
        }

        return [
            'authority'  => $m[1],
            'speciality' => $m[2],
            'serial'     => $m[3],
            'speciality_name' => self::SPECIALITIES[$m[2]] ?? 'Specialized Contracting',
        ];
    }
}
