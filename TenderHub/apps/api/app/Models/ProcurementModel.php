<?php

namespace App\Models;

use CodeIgniter\Model;

class ProcurementModel extends Model
{
    protected $table         = 'procurements';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = true;
    protected $protectFields = false;
}
