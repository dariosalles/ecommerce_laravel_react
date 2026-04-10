<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = [
        'name',
        'description',
        'slug',
        'image',
        'order',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Get all products for this brand.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
