<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'subtotal',
        'shipping_cost',
        'tax',
        'discount',
        'total',
        'status',
        'payment_method_id',
        'shipping_method_id',
        'shipping_address',
        'billing_address',
        'tracking_code',
        'notes',
        'shipped_at',
        'delivered_at',
        'cancelled_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'tax' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'shipped_at' => 'datetime',
        'delivered_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Relacionamento com usuário
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relacionamento com itens do pedido
     */
    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Relacionamento com método de pagamento
     */
    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    /**
     * Relacionamento com método de envio
     */
    public function shippingMethod()
    {
        return $this->belongsTo(ShippingMethod::class);
    }

    /**
     * Gerar número único do pedido
     */
    public static function generateOrderNumber()
    {
        $prefix = 'ORD-';
        $timestamp = date('YmdHis');
        $random = str_pad(random_int(0, 9999), 4, '0', STR_PAD_LEFT);
        
        return $prefix . $timestamp . $random;
    }

    /**
     * Atualizar total do pedido
     */
    public function updateTotal()
    {
        $subtotal = $this->items()->sum('subtotal');
        $this->subtotal = $subtotal;
        $this->total = $subtotal + $this->shipping_cost + $this->tax - $this->discount;
        $this->save();
    }

    /**
     * Verificar se o pedido foi entregue
     */
    public function isDelivered()
    {
        return $this->status === 'delivered' && $this->delivered_at !== null;
    }

    /**
     * Verificar se o pedido foi cancelado
     */
    public function isCancelled()
    {
        return $this->status === 'cancelled' && $this->cancelled_at !== null;
    }

    /**
     * Marcar como enviado
     */
    public function markAsShipped($trackingCode = null)
    {
        $this->status = 'shipped';
        $this->shipped_at = now();
        $this->tracking_code = $trackingCode;
        $this->save();
    }

    /**
     * Marcar como entregue
     */
    public function markAsDelivered()
    {
        $this->status = 'delivered';
        $this->delivered_at = now();
        $this->save();
    }

    /**
     * Cancelar pedido
     */
    public function cancel($reason = null)
    {
        $this->status = 'cancelled';
        $this->cancelled_at = now();
        if ($reason) {
            $this->notes = ($this->notes ?? '') . "\n[CANCELLED] " . $reason;
        }
        $this->save();
    }
}
