<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PalabraRosco extends Model
{
    use HasFactory;

    protected $table = 'palabra_rosco';

    protected $fillable = [
      'palabra_id',
      'rosco_id',
      'letra',
      'tipo_definicion',
      'definicion',
      'estado',
    ];

    public function rosco()
    {
        return $this->belongsTo(Rosco::class);
    }

    public function palabra()
    {
        return $this->belongsTo(Palabra::class);
    }
}
