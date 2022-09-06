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
        Schema::table('palabra_rosco', function (Blueprint $table) {
            $table->string('definicion')->nullable();
            $table->string('estado')->default('inicial');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('palabra_rosco', function (Blueprint $table) {
            //
        });
    }
};
