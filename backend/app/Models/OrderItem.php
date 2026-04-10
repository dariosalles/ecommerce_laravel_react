<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price_at_purchase',
        'subtotal',
    ];

    protected $casts = [
        'price_at_purchase' => 'decimal:2',
        'subtotal' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relacionamento com pedido
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    /**
     * Relacionamento com produto
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Calcular subtotal
     */
    public function calculateSubtotal()
    {
        return $this->quantity * $this->price_at_purchase;
    }
}
