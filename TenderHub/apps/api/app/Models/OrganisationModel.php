<?php

namespace App\Models;

use CodeIgniter\Model;

class OrganisationModel extends Model
{
    protected $table         = 'organisations';
    protected $primaryKey    = 'id';
    protected $returnType    = 'array';
    protected $useTimestamps = true;
    protected $protectFields = false;
}
