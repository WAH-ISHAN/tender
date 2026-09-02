<?php

namespace App\Controllers\Api\V1\PublicApi;

use App\Controllers\Api\V1\BaseApiController;
use App\Libraries\Ingestion\AutoCategoriser;

class RfpSubmissionController extends BaseApiController
{
    /**
     * POST /api/v1/notices/submit-rfp
     * Public intake door for corporate/private companies to submit RFPs for staff moderation.
     */
    public function submit()
    {
        $in = $this->body();
        $rules = [
            'company_name'   => 'required|min_length[3]',
            'contact_email'  => 'required|valid_email',
            'contact_phone'  => 'required|min_length[9]',
            'title'          => 'required|min_length[10]',
            'closing_date'   => 'required|valid_date',
        ];

        if (! $this->validateData($in, $rules)) {
            return problem(422, 'validation_failed', 'Fill all required fields to submit your RFP.', ['errors' => $this->validator->getErrors()]);
        }

        $title = trim($in['title']);
        $slug  = url_title($title, '-', true) . '-' . substr(bin2hex(random_bytes(2)), 0, 4);
        $cat   = $in['category'] ?? AutoCategoriser::classify($title, $in['description'] ?? '');

        $db = db_connect();
        $id = $db->table('notices')->insert([
            'slug'           => $slug,
            'title'          => $title,
            'description'    => $in['description'] ?? '',
            'category_id'    => $cat,
            'buyer_name'     => trim($in['company_name']),
            'ref_no'         => $in['ref_no'] ?? ('RFP-' . date('Ymd') . '-' . rand(100, 999)),
            'source_name'    => 'private_sector_portal',
            'contact_email'  => strtolower(trim($in['contact_email'])),
            'contact_officer'=> $in['contact_person'] ?? null,
            'closing_at'     => $in['closing_date'] . ' 14:00:00',
            'status'         => 'unverified', // Requires staff approval before publishing to live catalogue
            'stage_idx'      => 0, // Draft/Pending
            'created_at'     => date('Y-m-d H:i:s'),
        ], true);

        return $this->ok([
            'submitted'      => true,
            'submission_id'  => $id,
            'reference_slug' => $slug,
            'message'        => 'Your RFP has been submitted successfully. Our editorial desk will review and publish it within 2 hours.',
        ], [], 201);
    }
}
