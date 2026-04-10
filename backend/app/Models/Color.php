<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $fillable = [
        'name',
        'hex',
        'slug',
        'order',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Get all products for this color.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
