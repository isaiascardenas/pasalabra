<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Palabra extends Model
{
    use HasFactory;

    protected $fillable = [
      'inicial',
      'palabra',
      'drae_id',
    ];

    public function palabrasRoscos()
    {
        return $this->hasMany(PalabraRosco::class)
            ->orderBy('palabra_rosco.letra');
    }

    //public function roscos()
    //{
        //return $this->belongsToMany(Rosco::class);
    //}
}
