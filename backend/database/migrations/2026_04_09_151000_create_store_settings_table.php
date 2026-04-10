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
        Schema::create('store_settings', function (Blueprint $table) {
            $table->id();
            $table->string('store_name')->default('E-Com Shop');
            $table->string('store_email')->default('contato@ecom.com');
            $table->string('store_phone')->default('(11) 99999-9999');
            $table->string('store_address')->default('São Paulo, SP - Brasil');
            $table->text('store_description')->nullable();
            $table->string('logo_url')->nullable();
            $table->string('favicon_url')->nullable();
            $table->text('terms_and_conditions')->nullable();
            $table->text('privacy_policy')->nullable();
            $table->text('shipping_policy')->nullable();
            $table->text('return_policy')->nullable();
            $table->string('instagram')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('currency')->default('BRL');
            $table->decimal('shipping_base_cost', 8, 2)->default(0);
            $table->boolean('free_shipping_enabled')->default(false);
            $table->decimal('free_shipping_min_value', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_settings');
    }
};
