<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasklist_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\Tasklist::class, 'tasklist_id');
            $table->string('title',1000);
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasklist_tasks');
    }
};
