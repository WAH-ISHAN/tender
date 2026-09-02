<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class CatalogueSeeder extends Seeder
{
    public function run(): void
    {
        $db   = $this->db;
        $now  = static fn (string $m) => date('Y-m-d H:i:s', strtotime($m));
        $slug = static fn (string $s) => trim(strtolower(preg_replace('/[^a-z0-9]+/i', '-', $s)), '-');

        $cat  = array_column($db->table('categories')->get()->getResultArray(), 'id', 'slug');
        $dist = array_column($db->table('districts')->get()->getResultArray(), 'id', 'slug');
        $auth = array_column($db->table('authorities')->get()->getResultArray(), 'id', 'slug');
        $src  = array_column($db->table('feed_sources')->get()->getResultArray(), 'id', 'slug');
        $srcIds = array_values($src);

        $tenders = [
            ['Rehabilitation of Colombo–Katunayake access road shoulders', 'RDA/CP/2026/114', 'road-development-authority', 'roads-bridges', 'colombo', 92000000, 'government'],
            ['Construction of a two-storey ward complex, Base Hospital Negombo', 'MOH/NB/2026/077', 'ministry-of-health', 'buildings', 'gampaha', 340000000, 'government'],
            ['Supply and delivery of 40,000 litres of diesel — monthly rate contract', 'CEB/FUEL/2026/019', 'ceylon-electricity-board', 'food-rations', 'colombo', 18500000, 'government'],
            ['Laying of 12 km distribution mains, Kalutara North scheme', 'NWSDB/KL/2026/203', 'national-water-supply-drainage-board', 'water-drainage', 'kalutara', 145000000, 'government'],
            ['Supply of laboratory reagents to teaching hospitals — 12 month contract', 'MOH/LAB/2026/031', 'ministry-of-health', 'medical-supplies', 'colombo', 62000000, 'government'],
            ['Consultancy for feasibility study — Hambantota logistics corridor', 'ADB/SL/2026/CS-08', 'asian-development-bank-project-office', 'consultancy', 'hambantota', 28000000, 'donor'],
            ['Security services for regional depots — 24 months', 'SLR/SEC/2026/006', 'sri-lanka-railways', 'security-services', 'colombo', 41000000, 'government'],
            ['Supply of 250 desktop workstations and peripherals', 'UOC/ICT/2026/044', 'university-of-colombo', 'hardware', 'colombo', 37500000, 'government'],
            ['Reconstruction of Mannar causeway approach embankment', 'RDA/NP/2026/158', 'road-development-authority', 'roads-bridges', 'mannar', 480000000, 'government'],
            ['Supply and installation of 33kV switchgear, Kurunegala grid substation', 'CEB/TX/2026/052', 'ceylon-electricity-board', 'electrical-installation', 'kurunegala', 610000000, 'government'],
            ['Janitorial services for the port administration complex', 'SLPA/FM/2026/012', 'sri-lanka-ports-authority', 'cleaning-janitorial', 'colombo', 9200000, 'government'],
            ['Supply of office furniture — divisional secretariats, Uva Province', 'UDA/UV/2026/029', 'urban-development-authority', 'furniture', 'badulla', 4300000, 'government'],
            ['Hire of heavy earth-moving machinery, Mahaweli System B', 'MASL/SB/2026/067', 'mahaweli-authority-of-sri-lanka', 'heavy-machinery', 'polonnaruwa', 76000000, 'government'],
            ['Development of an integrated licensing management system', 'SLT/IT/2026/090', 'sri-lanka-telecom-plc', 'software-systems', 'colombo', 155000000, 'private'],
            ['Widening and resurfacing of Galle–Udugama road, sections 4–7', 'RDA/SP/2026/121', 'road-development-authority', 'roads-bridges', 'galle', 265000000, 'government'],
            ['Supply of pharmaceuticals — antibiotics group B', 'MOH/PH/2026/118', 'ministry-of-health', 'medical-supplies', 'colombo', 88000000, 'government'],
            ['Repair and upgrade of the Trincomalee irrigation sluice gates', 'DOI/TR/2026/013', 'department-of-irrigation', 'water-drainage', 'trincomalee', 34000000, 'government'],
            ['Transport and logistics for the school textbook distribution 2027', 'MOH/TR/2026/005', 'ministry-of-health', 'transport-logistics', 'colombo', 52000000, 'government'],
            ['Fibre backbone extension — Jaffna to Kilinochchi', 'SLT/NW/2026/033', 'sri-lanka-telecom-plc', 'networking', 'jaffna', 210000000, 'private'],
            ['Construction of staff quarters, Anuradhapura regional office', 'UDA/NC/2026/041', 'urban-development-authority', 'buildings', 'anuradhapura', 47000000, 'government'],
            ['Supply of dry rations to welfare centres — Eastern Province', 'MOH/DR/2026/026', 'ministry-of-health', 'food-rations', 'ampara', 15800000, 'government'],
            ['Procurement of two 20-tonne recovery vehicles', 'SLPA/VH/2026/017', 'sri-lanka-ports-authority', 'vehicles', 'colombo', 96000000, 'government'],
            ['Electrical rewiring of the Matara district secretariat', 'CEB/DS/2026/061', 'ceylon-electricity-board', 'electrical-installation', 'matara', 12400000, 'government'],
            ['Consultancy — resettlement action plan, Monaragala reservoir', 'WB/SL/2026/CS-14', 'world-bank-sri-lanka', 'consultancy', 'monaragala', 19500000, 'donor'],
            ['Supply of spare parts for locomotive class M9', 'SLR/SP/2026/022', 'sri-lanka-railways', 'spare-parts', 'colombo', 43000000, 'government'],
            ['Drainage improvement works, Ratnapura urban council area', 'CMC/DR/2026/008', 'colombo-municipal-council', 'water-drainage', 'ratnapura', 68000000, 'government'],
        ];

        $auctions = [
            ['Parate execution sale — 42 perch commercial land, Nugegoda', 'BOC/PE/2026/318', 'bank-of-ceylon', 'land-sale', 'colombo', 'land', 'parate', 78000000, 10],
            ['Mortgage foreclosure — two-storey residence, Kandy Peradeniya Road', 'HNB/MF/2026/091', 'hatton-national-bank-plc', 'building-sale', 'kandy', 'house', 'foreclosure', 42000000, 10],
            ['Auction of repossessed vehicles — 14 lots, Gampaha yard', 'PB/VR/2026/205', 'people-s-bank', 'vehicles', 'gampaha', 'vehicle', 'recovery', 3200000, 15],
            ['Sale of surplus machinery — textile plant, Katunayake', 'CB/DS/2026/044', 'commercial-bank-of-ceylon-plc', 'heavy-machinery', 'gampaha', 'machinery', 'disposal', 11500000, 10],
            ['Parate sale — 1.2 acre coconut estate, Puttalam', 'SB/PE/2026/152', 'sampath-bank-plc', 'land-sale', 'puttalam', 'land', 'parate', 24000000, 10],
            ['Commercial building auction, Galle Fort periphery', 'BOC/PE/2026/327', 'bank-of-ceylon', 'building-sale', 'galle', 'commercial', 'parate', 135000000, 10],
        ];

        $i = 0;
        foreach ($tenders as [$title, $ref, $a, $c, $d, $val, $sector]) {
            $i++;
            $closingMod = match (true) {
                $i <= 4  => '+' . random_int(2, 6) . ' days',      // closing soon
                $i <= 20 => '+' . random_int(9, 45) . ' days',     // live
                default  => '-' . random_int(3, 60) . ' days',     // archived
            };
            $closing = $now($closingMod);

            $db->table('notices')->insert([
                'kind' => 'tender', 'reference' => $ref, 'slug' => $slug($ref . '-' . $title),
                'title' => $title,
                'summary' => 'The ' . ucfirst(str_replace('-', ' ', $a)) . ' invites sealed bids from eligible '
                    . 'and qualified bidders. Bidding will be conducted through the National Competitive '
                    . 'Bidding procedure. Bidding documents may be purchased on submission of a written '
                    . 'application together with the non-refundable fee.',
                'description' => "Scope of works and supply as detailed in the bidding documents.\n\n"
                    . "Qualification requirements include: registration with the relevant authority; "
                    . "an average annual turnover meeting the stated minimum; demonstrated experience on "
                    . "at least two contracts of a similar nature and value in the last five years; and "
                    . "the personnel and equipment stated in the specification.\n\n"
                    . "Bids must be accompanied by a bid security valid for twenty-eight days beyond the "
                    . "bid validity period. Late bids will be rejected and returned unopened.",
                'authority_id' => $auth[$a], 'category_id' => $cat[$c], 'district_id' => $dist[$d],
                'sector' => $sector, 'estimated_value' => $val, 'currency' => 'LKR',
                'document_fee' => round($val * 0.00005 / 500) * 500 + 2500,
                'bid_security' => round($val * 0.02),
                'contact_officer' => 'The Secretary, Departmental Procurement Committee',
                'contact_phone' => '+94 11 ' . random_int(2000000, 2999999),
                'contact_email' => 'procurement@' . explode('-', $a)[0] . '.lk',
                'source_url' => 'https://example.gov.lk/notices/' . $slug($ref),
                'source_id' => $srcIds[array_rand($srcIds)],
                'published_at' => $now('-' . random_int(1, 25) . ' days'),
                'closing_at' => $closing,
                'opening_at' => date('Y-m-d H:i:s', strtotime($closing) + 1800),
                'status' => 'published', 'verified' => 1, 'documents_count' => random_int(2, 6),
                'created_at' => $now('-' . random_int(1, 25) . ' days'), 'updated_at' => $now('now'),
            ]);
            $noticeId = (int) $db->insertID();

            foreach ([['Invitation for Bids', 'invitation'], ['Bidding Document — Volume I', 'bidding'],
                      ['Bill of Quantities', 'boq'], ['Technical Specification', 'specification']] as $k => [$dn, $dk]) {
                if ($k >= $db->table('notices')->where('id', $noticeId)->get()->getFirstRow('array')['documents_count']) {
                    break;
                }
                $bytes = str_repeat('%PDF-1.4 TenderHub fixture ' . $ref . ' ' . $dn . ' ', 200);
                $store = new \App\Libraries\DocumentStore();
                $stored = $store->put($bytes, 'pdf');
                $db->table('notice_documents')->insert([
                    'notice_id' => $noticeId, 'name' => $dn . '.pdf', 'kind' => $dk,
                    'mime' => 'application/pdf', 'size_bytes' => $stored['size'],
                    'sha256' => $stored['sha256'], 'path' => $stored['path'],
                    'source_url' => 'https://example.gov.lk/docs/' . $slug($ref . '-' . $dn) . '.pdf',
                    'mirrored_at' => $now('now'),
                    'created_at' => $now('now'), 'updated_at' => $now('now'),
                ]);
            }
            $db->table('notices')->where('id', $noticeId)->update([
                'documents_count' => $db->table('notice_documents')->where('notice_id', $noticeId)->countAllResults(),
            ]);
        }

        foreach ($auctions as [$title, $ref, $a, $c, $d, $asset, $method, $reserve, $pct]) {
            $when = $now('+' . random_int(4, 30) . ' days');
            $db->table('notices')->insert([
                'kind' => 'auction', 'reference' => $ref, 'slug' => $slug($ref . '-' . $title),
                'title' => $title,
                'summary' => 'Public auction under the instructions of the mortgagee. Inspection by prior '
                    . 'arrangement with the auctioneer. The successful bidder must lodge the deposit '
                    . 'immediately at the fall of the hammer.',
                'description' => 'Full particulars, the schedule of the property and the conditions of sale '
                    . 'are set out in the auction notice. Deposits are payable to the auctioneer.',
                'authority_id' => $auth[$a], 'category_id' => $cat[$c], 'district_id' => $dist[$d],
                'sector' => 'private', 'estimated_value' => $reserve,
                'contact_officer' => 'Licensed Auctioneer & Valuer',
                'contact_phone' => '+94 77 ' . random_int(2000000, 9999999),
                'published_at' => $now('-' . random_int(1, 12) . ' days'),
                // For an auction the closing time IS the auction time.
                'closing_at' => $when, 'opening_at' => $when,
                'status' => 'published', 'verified' => 1,
                'created_at' => $now('-10 days'), 'updated_at' => $now('now'),
            ]);
            $nid = (int) $db->insertID();
            $db->table('auction_lots')->insert([
                'notice_id' => $nid, 'lot_no' => '1', 'asset_class' => $asset, 'method' => $method,
                'reserve' => $reserve, 'deposit_pct' => $pct,
                'venue' => 'At the spot / auctioneer\'s premises',
                'auctioneer' => 'Schokman & Samerawickreme',
                'created_at' => $now('now'), 'updated_at' => $now('now'),
            ]);
        }

        // Moderation queue: parsed but incomplete. These wait, they do not publish.
        foreach ([
            ['Supply of stationery to district offices', 'UNK/2026/001', null],
            ['Repair of bridge culverts — details unclear', 'UNK/2026/002', null],
        ] as [$t, $r, $closing]) {
            $db->table('notices')->insert([
                'kind' => 'tender', 'reference' => $r, 'slug' => $slug($r . '-' . $t), 'title' => $t,
                'summary' => 'Parsed from a newspaper scan. Awaiting review.',
                'sector' => 'government', 'closing_at' => $closing,
                'status' => 'unverified', 'verified' => 0,
                'source_id' => $srcIds[array_rand($srcIds)],
                'created_at' => $now('-1 day'), 'updated_at' => $now('-1 day'),
            ]);
        }
    }
}
