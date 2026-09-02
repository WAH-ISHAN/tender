<?php

namespace App\Libraries\Ingestion;

/**
 * AutoCategoriser
 * Classifies tenders into standard TenderHub categories using keyword and token matching.
 */
class AutoCategoriser
{
    private const KEYWORD_MAP = [
        'construction' => ['building', 'construction', 'concrete', 'rehabilitation', 'renovation', 'civil', 'drainage', 'road', 'asphalt', 'bridge'],
        'it'           => ['software', 'hardware', 'server', 'network', 'computer', 'cloud', 'license', 'database', 'cyber', 'it equipment', 'cctv'],
        'medical'      => ['hospital', 'pharmaceutical', 'medicine', 'surgical', 'medical', 'dental', 'syringe', 'healthcare', 'laboratory reagents'],
        'electrical'   => ['transformer', 'generator', 'cable', 'switchgear', 'substation', 'electrical', 'wiring', 'lighting', 'transmission'],
        'vehicles'     => ['vehicle', 'truck', 'car', 'van', 'tractor', 'bus', 'spare parts', 'tyres', 'automobile', 'transport'],
        'cleaning'     => ['janitorial', 'cleaning', 'sanitary', 'waste management', 'garbage', 'housekeeping'],
        'security'     => ['security guard', 'surveillance', 'manpower', 'patrol', 'cash in transit'],
        'printing'     => ['printing', 'stationery', 'booklet', 'gazette', 'publishing', 'paper', 'envelope'],
        'agriculture'  => ['fertilizer', 'seed', 'paddy', 'irrigation', 'farming', 'agri', 'harvest', 'crop', 'livestock'],
        'furniture'    => ['furniture', 'desk', 'chair', 'cupboard', 'table', 'cabinet', 'workstation'],
        'solar'        => ['solar', 'photovoltaic', 'pv module', 'renewable energy', 'inverter', 'battery storage'],
    ];

    /**
     * Categorizes a tender based on title and description.
     */
    public static function classify(string $title, string $description = ''): string
    {
        $text = strtolower($title . ' ' . $description);

        $scores = [];
        foreach (self::KEYWORD_MAP as $category => $keywords) {
            $score = 0;
            foreach ($keywords as $kw) {
                if (str_contains($text, $kw)) {
                    $score += 2;
                }
            }
            if ($score > 0) {
                $scores[$category] = $score;
            }
        }

        if (empty($scores)) {
            return 'unclassified';
        }

        arsort($scores);
        return array_key_first($scores);
    }
}
