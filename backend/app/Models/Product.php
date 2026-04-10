<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'image',
        'category_id',
        'brand_id',
        'color_id',
    ];

    /**
     * Get the category that the product belongs to.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the brand that the product belongs to.
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Get the color that the product belongs to.
     */
    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    /**
     * Get the order items for this product.
     */
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}

