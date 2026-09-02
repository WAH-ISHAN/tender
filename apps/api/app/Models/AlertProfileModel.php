<?php

namespace App\Models;

use CodeIgniter\Model;

class AlertProfileModel extends Model
{
    protected $table         = 'alert_profiles';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = true;
    protected $allowedFields = [
        'org_id','user_id','name','kinds','category_slugs','district_slugs','keywords',
        'min_value','max_value','channels','active',
    ];

    /**
     * The single query that decides what a profile matches. Both the dry-run
     * preview and the personal feed call it, so a preview that promises matches
     * the feed then does not deliver cannot happen by construction.
     *
     * Profiles match on SLUGS, never on auto-increment ids. Ids shift on every
     * re-seed — a category moved from 1 to 35 during development and silently
     * repointed every saved profile at a different category. A subscriber would
     * have kept receiving alerts, for the wrong thing, with nothing broken
     * enough to notice.
     */
    public function matchIds(array $profile, ?string $since = null, int $limit = 200): array
    {
        $b = $this->db->table('notices')
            ->select('notices.id')
            ->join('categories', 'categories.id = notices.category_id', 'left')
            ->join('districts', 'districts.id = notices.district_id', 'left')
            ->where('notices.status', 'published')
            ->where('notices.canonical_id', null);

        $kinds = array_filter(explode(',', (string) $profile['kinds']));
        if ($kinds) {
            $b->whereIn('notices.kind', $kinds);
        }

        $cats = array_filter(explode(',', (string) $profile['category_slugs']));
        if ($cats) {
            $b->whereIn('categories.slug', $cats);
        }

        $dists = array_filter(explode(',', (string) $profile['district_slugs']));
        if ($dists) {
            $b->whereIn('districts.slug', $dists);
        }

        if (! empty($profile['keywords'])) {
            $b->groupStart();
            foreach (array_filter(array_map('trim', explode(',', $profile['keywords']))) as $i => $kw) {
                $i === 0 ? $b->like('notices.title', $kw) : $b->orLike('notices.title', $kw);
                $b->orLike('notices.summary', $kw);
            }
            $b->groupEnd();
        }

        if ($profile['min_value'] !== null && $profile['min_value'] !== '') {
            $b->where('notices.estimated_value >=', $profile['min_value']);
        }
        if ($profile['max_value'] !== null && $profile['max_value'] !== '') {
            $b->where('notices.estimated_value <=', $profile['max_value']);
        }
        if ($since !== null) {
            $b->where('notices.published_at >=', $since);
        }

        return array_map('intval', array_column(
            $b->orderBy('notices.published_at', 'DESC')->limit($limit)->get()->getResultArray(), 'id'
        ));
    }
}
