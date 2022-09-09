<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('palabra_rosco', function (Blueprint $table) {
            $table->id();
            $table->foreignId('palabra_id')->constrained('palabras');
            $table->foreignId('rosco_id')->constrained('roscos');
            $table->string('letra');
            $table->string('tipo_definicion')->default('def');
            $table->text('definicion')->nullable();
            $table->string('estado')->default('inicial');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('palabra_rosco');
    }
};
