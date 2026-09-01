<?php

namespace App\Controllers\Api\V1\Authority;

use App\Controllers\Api\V1\BaseApiController;

abstract class WorkspaceBase extends BaseApiController
{
    public const STAGES = ['Draft', 'Approval', 'Published', 'Closed', 'Opened', 'Evaluation', 'Award'];

    /**
     * Every workspace lookup is scoped by org HERE, in one place, so no
     * controller can omit it. The org id comes from the verified token.
     */
    protected function procurement(int $id): ?array
    {
        return db_connect()->table('procurements')
            ->select('procurements.*, notices.title, notices.reference, notices.slug, notices.closing_at,
                      notices.opening_at, notices.estimated_value, notices.status AS notice_status,
                      notices.kind, notices.document_fee')
            ->join('notices', 'notices.id = procurements.notice_id')
            ->where('procurements.id', $id)
            ->where('procurements.org_id', (int) $this->request->orgId)
            ->get()->getFirstRow('array');
    }

    /** Comparisons like "has this been opened" are stage_idx >= 4, not a string
     *  set that drifts. */
    protected function isOpened(array $proc): bool
    {
        return (int) $proc['stage_idx'] >= 4;
    }

    protected function advance(int $id, int $stage, array $extra = []): void
    {
        db_connect()->table('procurements')->where('id', $id)
            ->update(array_merge(['stage_idx' => $stage, 'updated_at' => date('Y-m-d H:i:s')], $extra));
    }
}
