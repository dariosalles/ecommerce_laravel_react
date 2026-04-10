<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreSetting extends Model
{
    use HasFactory;

    protected $table = 'store_settings';

    protected $fillable = [
        'store_name',
        'store_email',
        'store_phone',
        'store_address',
        'store_description',
        'logo_url',
        'favicon_url',
        'terms_and_conditions',
        'privacy_policy',
        'shipping_policy',
        'return_policy',
        'instagram',
        'facebook',
        'twitter',
        'whatsapp',
        'currency',
        'shipping_base_cost',
        'free_shipping_enabled',
        'free_shipping_min_value',
    ];

    protected $casts = [
        'free_shipping_enabled' => 'boolean',
    ];
}
