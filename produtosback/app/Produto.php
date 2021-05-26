<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $table = 'produtos';
    protected $fillable = ['user_id', 'serial_number', 'name','heigth','length','width','weigth'];
}