<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

/**
 * Rev 3.0 core schema — written with Forge so the same migration produces the
 * same schema on SQLite (dev) and MySQL 8 (prod). Hand-written MySQL DDL was
 * the Rev 2.0 mistake: it locked development to a database server.
 */
class CoreSchema extends Migration
{
    public function up(): void
    {
        $id = ['type' => 'INTEGER', 'auto_increment' => true, 'constraint' => 11];

        // ---------------------------------------------------------- identity
        $this->forge->addField([
            'id'            => $id,
            'name'          => ['type' => 'VARCHAR', 'constraint' => 200],
            'slug'          => ['type' => 'VARCHAR', 'constraint' => 220],
            'type'          => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'bidder'], // bidder|company|staff
            'reg_no'        => ['type' => 'VARCHAR', 'constraint' => 60, 'null' => true],
            'district_id'   => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'cida_grade'    => ['type' => 'VARCHAR', 'constraint' => 10, 'null' => true],
            'plan'          => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'free'],
            'sub_status'    => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'none'], // none|pending|active|expired
            'renews_at'     => ['type' => 'DATETIME', 'null' => true],
            'seats'         => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 3],
            'verified_at'   => ['type' => 'DATETIME', 'null' => true],
            'verify_state'  => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'unverified'],
            'approval_threshold' => ['type' => 'DECIMAL', 'constraint' => '18,2', 'default' => 50000000],
            'standstill_days'    => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 7],
            'contact_email' => ['type' => 'VARCHAR', 'constraint' => 160, 'null' => true],
            'contact_phone' => ['type' => 'VARCHAR', 'constraint' => 40, 'null' => true],
            'created_at'    => ['type' => 'DATETIME', 'null' => true],
            'updated_at'    => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->createTable('organisations', true);

        $this->forge->addField([
            'id'          => $id,
            'org_id'      => ['type' => 'INTEGER', 'constraint' => 11],
            'name'        => ['type' => 'VARCHAR', 'constraint' => 160],
            'email'       => ['type' => 'VARCHAR', 'constraint' => 160],
            'phone'       => ['type' => 'VARCHAR', 'constraint' => 40, 'null' => true],
            'password_hash' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'role'        => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'owner'],
            'user_group'  => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'bidder'],
            'status'      => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'active'],
            'otp_hash'    => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'otp_expires_at' => ['type' => 'DATETIME', 'null' => true],
            'free_views'  => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 0],
            'last_login_at' => ['type' => 'DATETIME', 'null' => true],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
            'updated_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('email');
        $this->forge->addKey('org_id');
        $this->forge->createTable('users', true);

        $this->forge->addField([
            'id'         => $id,
            'user_id'    => ['type' => 'INTEGER', 'constraint' => 11],
            'family_id'  => ['type' => 'VARCHAR', 'constraint' => 64],
            'token_hash' => ['type' => 'VARCHAR', 'constraint' => 64],
            'used_at'    => ['type' => 'DATETIME', 'null' => true],
            'revoked_at' => ['type' => 'DATETIME', 'null' => true],
            'expires_at' => ['type' => 'DATETIME'],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('token_hash');
        $this->forge->addKey('family_id');
        $this->forge->createTable('refresh_tokens', true);

        $this->forge->addField([
            'id'         => $id,
            'org_id'     => ['type' => 'INTEGER', 'constraint' => 11],
            'email'      => ['type' => 'VARCHAR', 'constraint' => 160],
            'role'       => ['type' => 'VARCHAR', 'constraint' => 20],
            'token_hash' => ['type' => 'VARCHAR', 'constraint' => 64],
            'state'      => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'pending'],
            'expires_at' => ['type' => 'DATETIME'],
            'accepted_at'=> ['type' => 'DATETIME', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('org_id');
        $this->forge->createTable('invitations', true);

        // --------------------------------------------------------- reference
        $this->forge->addField([
            'id'   => $id,
            'name' => ['type' => 'VARCHAR', 'constraint' => 60],
            'slug' => ['type' => 'VARCHAR', 'constraint' => 60],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->createTable('provinces', true);

        $this->forge->addField([
            'id'          => $id,
            'province_id' => ['type' => 'INTEGER', 'constraint' => 11],
            'name'        => ['type' => 'VARCHAR', 'constraint' => 60],
            'slug'        => ['type' => 'VARCHAR', 'constraint' => 60],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->createTable('districts', true);

        $this->forge->addField([
            'id'        => $id,
            'parent_id' => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'name'      => ['type' => 'VARCHAR', 'constraint' => 80],
            'slug'      => ['type' => 'VARCHAR', 'constraint' => 90],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->createTable('categories', true);

        $this->forge->addField([
            'id'      => $id,
            'name'    => ['type' => 'VARCHAR', 'constraint' => 200],
            'slug'    => ['type' => 'VARCHAR', 'constraint' => 220],
            'sector'  => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'government'],
            'website' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->createTable('authorities', true);

        // --------------------------------------------------------- catalogue
        $this->forge->addField([
            'id'             => $id,
            'kind'           => ['type' => 'VARCHAR', 'constraint' => 10, 'default' => 'tender'], // tender|auction
            'reference'      => ['type' => 'VARCHAR', 'constraint' => 80],
            'slug'           => ['type' => 'VARCHAR', 'constraint' => 255],
            'title'          => ['type' => 'VARCHAR', 'constraint' => 255],
            'title_si'       => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'title_ta'       => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'summary'        => ['type' => 'TEXT', 'null' => true],
            'description'    => ['type' => 'TEXT', 'null' => true],
            'authority_id'   => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'org_id'         => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true], // native publisher
            'category_id'    => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'district_id'    => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'sector'         => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'government'],
            'estimated_value'=> ['type' => 'DECIMAL', 'constraint' => '18,2', 'null' => true],
            'currency'       => ['type' => 'VARCHAR', 'constraint' => 5, 'default' => 'LKR'],
            'document_fee'   => ['type' => 'DECIMAL', 'constraint' => '18,2', 'null' => true],
            'bid_security'   => ['type' => 'DECIMAL', 'constraint' => '18,2', 'null' => true],
            'contact_officer'=> ['type' => 'VARCHAR', 'constraint' => 200, 'null' => true],
            'contact_phone'  => ['type' => 'VARCHAR', 'constraint' => 60, 'null' => true],
            'contact_email'  => ['type' => 'VARCHAR', 'constraint' => 160, 'null' => true],
            'source_url'     => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'source_id'      => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'published_at'   => ['type' => 'DATETIME', 'null' => true],
            'closing_at'     => ['type' => 'DATETIME', 'null' => true],
            'opening_at'     => ['type' => 'DATETIME', 'null' => true],
            'status'         => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'draft'], // draft|unverified|published|withdrawn
            'verified'       => ['type' => 'INTEGER', 'constraint' => 1, 'default' => 0],
            'missing_fields' => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'canonical_id'   => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'documents_count'=> ['type' => 'INTEGER', 'constraint' => 11, 'default' => 0],
            'created_at'     => ['type' => 'DATETIME', 'null' => true],
            'updated_at'     => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->addKey(['kind', 'status']);
        $this->forge->addKey('closing_at');
        $this->forge->createTable('notices', true);

        $this->forge->addField([
            'id'          => $id,
            'notice_id'   => ['type' => 'INTEGER', 'constraint' => 11],
            'name'        => ['type' => 'VARCHAR', 'constraint' => 255],
            'kind'        => ['type' => 'VARCHAR', 'constraint' => 30, 'default' => 'bidding'],
            'mime'        => ['type' => 'VARCHAR', 'constraint' => 100, 'default' => 'application/pdf'],
            'size_bytes'  => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'sha256'      => ['type' => 'VARCHAR', 'constraint' => 64, 'null' => true],
            'path'        => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'source_url'  => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'mirrored_at' => ['type' => 'DATETIME', 'null' => true],
            'mirror_error'=> ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'uploaded_by' => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
            'updated_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('notice_id');
        $this->forge->addKey('sha256');
        $this->forge->createTable('notice_documents', true);

        // ------------------------------------------------------------ bidder
        $this->forge->addField([
            'id'         => $id,
            'org_id'     => ['type' => 'INTEGER', 'constraint' => 11],
            'user_id'    => ['type' => 'INTEGER', 'constraint' => 11],
            'name'       => ['type' => 'VARCHAR', 'constraint' => 120],
            'kinds'      => ['type' => 'VARCHAR', 'constraint' => 60, 'default' => 'tender'],
            'category_slugs' => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'district_slugs' => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'keywords'   => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'min_value'  => ['type' => 'DECIMAL', 'constraint' => '18,2', 'null' => true],
            'max_value'  => ['type' => 'DECIMAL', 'constraint' => '18,2', 'null' => true],
            'channels'   => ['type' => 'VARCHAR', 'constraint' => 60, 'default' => 'inapp'],
            'active'     => ['type' => 'INTEGER', 'constraint' => 1, 'default' => 1],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('org_id');
        $this->forge->createTable('alert_profiles', true);

        $this->forge->addField([
            'id'          => $id,
            'org_id'      => ['type' => 'INTEGER', 'constraint' => 11],
            'notice_id'   => ['type' => 'INTEGER', 'constraint' => 11],
            'stage'       => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'watching'],
            'owner_id'    => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'checklist_total' => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 0],
            'checklist_ready' => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 0],
            'notes'       => ['type' => 'TEXT', 'null' => true],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
            'updated_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('org_id');
        $this->forge->createTable('bids', true);

        $this->forge->addField([
            'id'         => $id,
            'org_id'     => ['type' => 'INTEGER', 'constraint' => 11],
            'name'       => ['type' => 'VARCHAR', 'constraint' => 160],
            'kind'       => ['type' => 'VARCHAR', 'constraint' => 40],
            'sha256'     => ['type' => 'VARCHAR', 'constraint' => 64, 'null' => true],
            'path'       => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'size_bytes' => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'expires_at' => ['type' => 'DATE', 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
            'updated_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('org_id');
        $this->forge->createTable('document_assets', true);

        // ------------------------------------------------------- procurement
        $this->forge->addField([
            'id'            => $id,
            'org_id'        => ['type' => 'INTEGER', 'constraint' => 11],
            'notice_id'     => ['type' => 'INTEGER', 'constraint' => 11],
            'stage_idx'     => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 0],
            'created_by'    => ['type' => 'INTEGER', 'constraint' => 11],
            'submitted_by'  => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'approved_by'   => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'approved_at'   => ['type' => 'DATETIME', 'null' => true],
            'published_by'  => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'published_at'  => ['type' => 'DATETIME', 'null' => true],
            'opened_by_a'   => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'opened_by_b'   => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'opening_started_at' => ['type' => 'DATETIME', 'null' => true],
            'opened_at'     => ['type' => 'DATETIME', 'null' => true],
            'created_at'    => ['type' => 'DATETIME', 'null' => true],
            'updated_at'    => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('org_id');
        $this->forge->addUniqueKey('notice_id');
        $this->forge->createTable('procurements', true);

        $this->forge->addField([
            'id'             => $id,
            'procurement_id' => ['type' => 'INTEGER', 'constraint' => 11],
            'bidder_org_id'  => ['type' => 'INTEGER', 'constraint' => 11],
            'bidder_name'    => ['type' => 'VARCHAR', 'constraint' => 200],
            'reference'      => ['type' => 'VARCHAR', 'constraint' => 40],
            'total_price'    => ['type' => 'DECIMAL', 'constraint' => '18,2', 'null' => true],
            'has_security'   => ['type' => 'INTEGER', 'constraint' => 1, 'default' => 0],
            'size_bytes'     => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 0],
            'content_hash'   => ['type' => 'VARCHAR', 'constraint' => 64, 'null' => true],
            'cipher_path'    => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'status'         => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'submitted'],
            'disqualified'   => ['type' => 'INTEGER', 'constraint' => 1, 'default' => 0],
            'received_at'    => ['type' => 'DATETIME'],
            'created_at'     => ['type' => 'DATETIME', 'null' => true],
            'updated_at'     => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('procurement_id');
        $this->forge->addUniqueKey(['procurement_id', 'bidder_org_id']);
        $this->forge->createTable('submissions', true);

        $this->forge->addField([
            'id'             => $id,
            'procurement_id' => ['type' => 'INTEGER', 'constraint' => 11],
            'buyer_org_id'   => ['type' => 'INTEGER', 'constraint' => 11],
            'amount'         => ['type' => 'DECIMAL', 'constraint' => '18,2', 'default' => 0],
            'receipt_no'     => ['type' => 'VARCHAR', 'constraint' => 40, 'null' => true],
            'purchased_at'   => ['type' => 'DATETIME', 'null' => true],
            'created_at'     => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['procurement_id', 'buyer_org_id']);
        $this->forge->createTable('doc_purchases', true);

        $this->forge->addField([
            'id'             => $id,
            'procurement_id' => ['type' => 'INTEGER', 'constraint' => 11],
            'asker_org_id'   => ['type' => 'INTEGER', 'constraint' => 11],
            'question'       => ['type' => 'TEXT'],
            'answer'         => ['type' => 'TEXT', 'null' => true],
            'answered_by'    => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'answered_at'    => ['type' => 'DATETIME', 'null' => true],
            'created_at'     => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('procurement_id');
        $this->forge->createTable('clarifications', true);

        $this->forge->addField([
            'id'             => $id,
            'procurement_id' => ['type' => 'INTEGER', 'constraint' => 11],
            'number'         => ['type' => 'INTEGER', 'constraint' => 11],
            'reason'         => ['type' => 'TEXT'],
            'new_closing_at' => ['type' => 'DATETIME', 'null' => true],
            'issued_by'      => ['type' => 'INTEGER', 'constraint' => 11],
            'created_at'     => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['procurement_id', 'number']);
        $this->forge->createTable('addenda', true);

        $this->forge->addField([
            'id'             => $id,
            'procurement_id' => ['type' => 'INTEGER', 'constraint' => 11],
            'user_id'        => ['type' => 'INTEGER', 'constraint' => 11],
            'has_conflict'   => ['type' => 'INTEGER', 'constraint' => 1, 'default' => 0],
            'statement'      => ['type' => 'TEXT', 'null' => true],
            'created_at'     => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['procurement_id', 'user_id']);
        $this->forge->createTable('coi_declarations', true);

        $this->forge->addField([
            'id'             => $id,
            'procurement_id' => ['type' => 'INTEGER', 'constraint' => 11],
            'label'          => ['type' => 'VARCHAR', 'constraint' => 160],
            'type'           => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'weighted'],
            'weight'         => ['type' => 'DECIMAL', 'constraint' => '6,2', 'default' => 0],
            'max_score'      => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 100],
            'created_at'     => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('procurement_id');
        $this->forge->createTable('eval_criteria', true);

        $this->forge->addField([
            'id'            => $id,
            'submission_id' => ['type' => 'INTEGER', 'constraint' => 11],
            'criterion_id'  => ['type' => 'INTEGER', 'constraint' => 11],
            'evaluator_id'  => ['type' => 'INTEGER', 'constraint' => 11],
            'is_consensus'  => ['type' => 'INTEGER', 'constraint' => 1, 'default' => 0],
            'score'         => ['type' => 'DECIMAL', 'constraint' => '8,2', 'null' => true],
            'passed'        => ['type' => 'INTEGER', 'constraint' => 1, 'null' => true],
            'note'          => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'created_at'    => ['type' => 'DATETIME', 'null' => true],
            'updated_at'    => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['submission_id', 'criterion_id', 'evaluator_id', 'is_consensus']);
        $this->forge->createTable('eval_scores', true);

        $this->forge->addField([
            'id'             => $id,
            'procurement_id' => ['type' => 'INTEGER', 'constraint' => 11],
            'submission_id'  => ['type' => 'INTEGER', 'constraint' => 11],
            'supplier_org_id'=> ['type' => 'INTEGER', 'constraint' => 11],
            'amount'         => ['type' => 'DECIMAL', 'constraint' => '18,2'],
            'committee_ref'  => ['type' => 'VARCHAR', 'constraint' => 80],
            'awarded_by'     => ['type' => 'INTEGER', 'constraint' => 11],
            'awarded_at'     => ['type' => 'DATETIME'],
            'standstill_until' => ['type' => 'DATETIME'],
            'created_at'     => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('procurement_id');
        $this->forge->createTable('awards', true);

        // ---------------------------------------------------------- auctions
        $this->forge->addField([
            'id'          => $id,
            'notice_id'   => ['type' => 'INTEGER', 'constraint' => 11],
            'lot_no'      => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => '1'],
            'asset_class' => ['type' => 'VARCHAR', 'constraint' => 20], // land|house|commercial|vehicle|machinery|goods
            'method'      => ['type' => 'VARCHAR', 'constraint' => 30], // parate|foreclosure|recovery|disposal
            'reserve'     => ['type' => 'DECIMAL', 'constraint' => '18,2', 'null' => true],
            'deposit_pct' => ['type' => 'DECIMAL', 'constraint' => '5,2', 'default' => 10],
            'venue'       => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'auctioneer'  => ['type' => 'VARCHAR', 'constraint' => 200, 'null' => true],
            'result'      => ['type' => 'VARCHAR', 'constraint' => 20, 'null' => true], // sold|unsold|withdrawn|postponed
            'hammer_price'=> ['type' => 'DECIMAL', 'constraint' => '18,2', 'null' => true],
            'result_note' => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
            'updated_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('notice_id');
        $this->forge->createTable('auction_lots', true);

        // ---------------------------------------------------------- commerce
        $this->forge->addField([
            'id'          => $id,
            'org_id'      => ['type' => 'INTEGER', 'constraint' => 11],
            'user_id'     => ['type' => 'INTEGER', 'constraint' => 11],
            'plan'        => ['type' => 'VARCHAR', 'constraint' => 20],
            'term'        => ['type' => 'VARCHAR', 'constraint' => 20], // annual|quarterly
            'amount'      => ['type' => 'DECIMAL', 'constraint' => '18,2'],
            'method'      => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'bank_transfer'],
            'bank'        => ['type' => 'VARCHAR', 'constraint' => 80, 'null' => true],
            'slip_ref'    => ['type' => 'VARCHAR', 'constraint' => 80, 'null' => true],
            'paid_on'     => ['type' => 'DATE', 'null' => true],
            'channel'     => ['type' => 'VARCHAR', 'constraint' => 20, 'null' => true],
            'state'       => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'claimed'], // claimed|confirmed|rejected
            'reviewed_by' => ['type' => 'INTEGER', 'constraint' => 11, 'null' => true],
            'reviewed_at' => ['type' => 'DATETIME', 'null' => true],
            'reject_reason' => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
            'updated_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('org_id');
        $this->forge->addKey('state');
        $this->forge->createTable('payments', true);

        $this->forge->addField([
            'id'         => $id,
            'award_id'   => ['type' => 'INTEGER', 'constraint' => 11],
            'direction'  => ['type' => 'VARCHAR', 'constraint' => 20], // buyer_rates_supplier|supplier_rates_buyer
            'rater_org_id'  => ['type' => 'INTEGER', 'constraint' => 11],
            'rated_org_id'  => ['type' => 'INTEGER', 'constraint' => 11],
            'score'      => ['type' => 'INTEGER', 'constraint' => 11],
            'comment'    => ['type' => 'VARCHAR', 'constraint' => 1000, 'null' => true],
            'created_at' => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey(['award_id', 'direction']);
        $this->forge->createTable('ratings', true);

        // ---------------------------------------------------------- platform
        $this->forge->addField([
            'id'          => $id,
            'org_id'      => ['type' => 'INTEGER', 'constraint' => 11],
            'label'       => ['type' => 'VARCHAR', 'constraint' => 80],
            'prefix'      => ['type' => 'VARCHAR', 'constraint' => 12],
            'key_hash'    => ['type' => 'VARCHAR', 'constraint' => 64],
            'daily_quota' => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 1000],
            'used_today'  => ['type' => 'INTEGER', 'constraint' => 11, 'default' => 0],
            'quota_date'  => ['type' => 'DATE', 'null' => true],
            'revoked_at'  => ['type' => 'DATETIME', 'null' => true],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
            'updated_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addKey('key_hash');
        $this->forge->createTable('api_keys', true);

        $this->forge->addField([
            'id'          => $id,
            'org_id'      => ['type' => 'INTEGER', 'constraint' => 11],
            'url'         => ['type' => 'VARCHAR', 'constraint' => 500],
            'event'       => ['type' => 'VARCHAR', 'constraint' => 60],
            'secret_hash' => ['type' => 'VARCHAR', 'constraint' => 64],
            'active'      => ['type' => 'INTEGER', 'constraint' => 1, 'default' => 1],
            'created_at'  => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->createTable('webhooks', true);

        $this->forge->addField([
            'id'            => $id,
            'name'          => ['type' => 'VARCHAR', 'constraint' => 160],
            'slug'          => ['type' => 'VARCHAR', 'constraint' => 160],
            'url'           => ['type' => 'VARCHAR', 'constraint' => 500, 'null' => true],
            'mode'          => ['type' => 'VARCHAR', 'constraint' => 20, 'default' => 'scrape'], // feed|mailbox|scrape
            'weekly_baseline' => ['type' => 'DECIMAL', 'constraint' => '8,2', 'default' => 0],
            'last_fetch_at' => ['type' => 'DATETIME', 'null' => true],
            'last_error'    => ['type' => 'VARCHAR', 'constraint' => 255, 'null' => true],
            'active'        => ['type' => 'INTEGER', 'constraint' => 1, 'default' => 1],
            'created_at'    => ['type' => 'DATETIME', 'null' => true],
            'updated_at'    => ['type' => 'DATETIME', 'null' => true],
        ]);
        $this->forge->addKey('id', true);
        $this->forge->addUniqueKey('slug');
        $this->forge->createTable('feed_sources', true);
    }

    public function down(): void
    {
        foreach ([
            'feed_sources','webhooks','api_keys','ratings','payments','auction_lots','awards',
            'eval_scores','eval_criteria','coi_declarations','addenda','clarifications',
            'doc_purchases','submissions','procurements','document_assets','bids','alert_profiles',
            'notice_documents','notices','authorities','categories','districts','provinces',
            'invitations','refresh_tokens','users','organisations',
        ] as $t) {
            $this->forge->dropTable($t, true);
        }
    }
}
