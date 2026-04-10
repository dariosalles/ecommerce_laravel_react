<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShippingMethod extends Model
{
    use HasFactory;

    protected $table = 'shipping_methods';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'base_cost',
        'cost_per_kg',
        'delivery_days_min',
        'delivery_days_max',
        'is_active',
        'sort_order',
        'settings',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'base_cost' => 'decimal:2',
        'cost_per_kg' => 'decimal:2',
        'settings' => 'json',
    ];
}
