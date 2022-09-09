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
        Schema::create('roscos', function (Blueprint $table) {
            $table->id();
            $table->json('opciones')->nullable();
            $table->json('comodines')->nullable();
            $table->integer('correctas')->default(0);
            $table->string('tiempo')->nullable();
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
        Schema::dropIfExists('roscos');
    }
};
