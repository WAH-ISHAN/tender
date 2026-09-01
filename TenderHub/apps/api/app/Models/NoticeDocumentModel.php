<?php

namespace App\Models;

use CodeIgniter\Model;

class NoticeDocumentModel extends Model
{
    protected $table         = 'notice_documents';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = true;
    protected $protectFields = false;
}
