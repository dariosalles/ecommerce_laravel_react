<?php

namespace App\Http\Controllers\Api;

use App\Models\PaymentMethod;
use Illuminate\Routing\Controller as BaseController;

class PaymentMethodController extends BaseController
{
    /**
     * Buscar todos os métodos de pagamento ativos
     */
    public function index()
    {
        $paymentMethods = PaymentMethod::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($paymentMethods);
    }

    /**
     * Buscar um método de pagamento específico
     */
    public function show($id)
    {
        $paymentMethod = PaymentMethod::findOrFail($id);

        return response()->json($paymentMethod);
    }
}
