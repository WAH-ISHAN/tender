<?php

namespace App\Commands;

use CodeIgniter\CLI\BaseCommand;
use CodeIgniter\CLI\CLI;
use App\Libraries\Ingestion\AutoCategoriser;
use App\Libraries\Ingestion\DeduplicationService;

class GazetteScraper extends BaseCommand
{
    protected $group       = 'Ingestion';
    protected $name        = 'ingest:gazette';
    protected $description = 'Crawls Sri Lanka Government Gazette and Ministry procurement feeds for new tenders';

    public function run(array $params)
    {
        CLI::write("==================================================================", 'yellow');
        CLI::write("  TENDERHUB INGESTION ENGINE — SRI LANKA GAZETTE CRAWLER          ", 'green');
        CLI::write("==================================================================", 'yellow');

        $sources = [
            'documents.gov.lk' => 'Sri Lanka Government Gazette (Part I: Sec IIA)',
            'treasury.gov.lk'  => 'Department of Public Finance (Procurement Notices)',
            'cda.gov.lk'       => 'Cabinet Appointed Procurement Committees (CAPC)',
        ];

        $inserted = 0;
        $skipped  = 0;
        $db = db_connect();

        foreach ($sources as $domain => $name) {
            CLI::write("Crawling source: {$name} [{$domain}]...", 'cyan');

            // Sample simulated feed items from Gazette parser
            $scrapedNotices = [
                [
                    'title'        => 'Supply, Delivery and Commissioning of 200 Units of High-Flow Oxygen Concentrators for Teaching Hospitals',
                    'buyer'        => 'State Pharmaceuticals Corporation of Sri Lanka (SPC)',
                    'ref'          => 'SPC/DHS/ICB/G/042/26',
                    'closing_days' => 28,
                    'desc'         => 'International Competitive Bidding (ICB) for the supply of medical oxygen equipment.',
                ],
                [
                    'title'        => 'Rehabilitation and Bituminous Surfacing of Katugastota-Kurunegala-Puttalam Road (A010) Ch. 12+000 to 24+500',
                    'buyer'        => 'Road Development Authority (RDA)',
                    'ref'          => 'RDA/PR/WP/2026/089',
                    'closing_days' => 21,
                    'desc'         => 'National Competitive Bidding for asphalt overlaying and drainage improvement.',
                ],
            ];

            foreach ($scrapedNotices as $n) {
                $closingAt = date('Y-m-d 14:00:00', strtotime("+{$n['closing_days']} days"));
                $hash = DeduplicationService::fingerprint($n['title'], $n['ref'], $closingAt);
                $slug = url_title($n['title'], '-', true) . '-' . substr($hash, 0, 4);

                if (DeduplicationService::isDuplicate($slug, $hash)) {
                    CLI::write("  [SKIP] Duplicate notice detected: {$n['ref']}", 'light_gray');
                    $skipped++;
                    continue;
                }

                $cat = AutoCategoriser::classify($n['title'], $n['desc']);

                $db->table('notices')->insert([
                    'slug'         => $slug,
                    'title'        => $n['title'],
                    'description'  => $n['desc'],
                    'category_id'  => $cat,
                    'buyer_name'   => $n['buyer'],
                    'ref_no'       => $n['ref'],
                    'source_hash'  => $hash,
                    'source_name'  => $name,
                    'closing_at'   => $closingAt,
                    'published_at' => date('Y-m-d H:i:s'),
                    'status'       => 'live',
                    'stage_idx'    => 1,
                    'created_at'   => date('Y-m-d H:i:s'),
                ]);

                CLI::write("  [OK] Ingested into {$cat}: {$n['title']}", 'green');
                $inserted++;
            }
        }

        CLI::write("------------------------------------------------------------------", 'yellow');
        CLI::write("Finished: {$inserted} new notices inserted, {$skipped} duplicates skipped.", 'white');
    }
}
