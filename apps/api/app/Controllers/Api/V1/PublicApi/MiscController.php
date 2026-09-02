<?php

namespace App\Controllers\Api\V1\PublicApi;

use App\Controllers\Api\V1\BaseApiController;

class MiscController extends BaseApiController
{
    /** Published awards, past standstill only. Publishing one during the
     *  challenge window would prejudice an appeal that is still live. */
    public function awards()
    {
        $rows = db_connect()->table('awards')
            ->select('awards.id, awards.amount, awards.awarded_at, awards.committee_ref,
                      notices.title, notices.reference, notices.slug, notices.kind,
                      districts.name AS district, supplier.name AS supplier, buyer.name AS buyer')
            ->join('procurements', 'procurements.id = awards.procurement_id')
            ->join('notices', 'notices.id = procurements.notice_id')
            ->join('districts', 'districts.id = notices.district_id', 'left')
            ->join('organisations AS supplier', 'supplier.id = awards.supplier_org_id', 'left')
            ->join('organisations AS buyer', 'buyer.id = procurements.org_id', 'left')
            ->where('awards.standstill_until <', date('Y-m-d H:i:s'))
            ->orderBy('awards.awarded_at', 'DESC')
            ->limit($this->per())->get()->getResultArray();

        return $this->ok(array_map(static fn ($r) => [
            'id' => (int) $r['id'], 'title' => $r['title'], 'reference' => $r['reference'],
            'slug' => $r['slug'], 'buyer' => $r['buyer'], 'supplier' => $r['supplier'],
            'amount' => (float) $r['amount'], 'district' => $r['district'],
            'awarded_at' => $r['awarded_at'], 'committee_ref' => $r['committee_ref'],
        ], $rows));
    }

    public function summary()
    {
        $db  = db_connect();
        $now = date('Y-m-d H:i:s');

        return $this->ok([
            'live'        => $db->table('notices')->where('status', 'published')->where('closing_at >=', $now)->countAllResults(),
            'archived'    => $db->table('notices')->where('status', 'published')->where('closing_at <', $now)->countAllResults(),
            'auctions'    => $db->table('notices')->where('status', 'published')->where('kind', 'auction')->where('closing_at >=', $now)->countAllResults(),
            'added_today' => $db->table('notices')->where('published_at >=', date('Y-m-d 00:00:00'))->countAllResults(),
            'authorities' => $db->table('authorities')->countAllResults(),
            'awards'      => $db->table('awards')->where('standstill_until <', $now)->countAllResults(),
        ]);
    }

    public function taxonomy(string $set)
    {
        $db = db_connect();

        return match ($set) {
            'categories' => $this->ok($db->table('categories')->select('id, parent_id, name, slug')->orderBy('name')->get()->getResultArray()),
            'districts'  => $this->ok($db->table('districts')
                ->select('districts.id, districts.name, districts.slug, provinces.name AS province')
                ->join('provinces', 'provinces.id = districts.province_id', 'left')
                ->orderBy('districts.name')->get()->getResultArray()),
            'authorities'=> $this->ok($db->table('authorities')->select('id, name, slug, sector')->orderBy('name')->get()->getResultArray()),
            'value_bands'=> $this->ok(\App\Models\NoticeModel::VALUE_BANDS),
            'plans'      => $this->ok(config(\Config\Plans::class)->catalogue),
            default      => problem(404, 'not_found', 'No such taxonomy set.'),
        };
    }
}
