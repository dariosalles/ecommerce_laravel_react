<?php

namespace App\Http\Controllers\Api;

use App\Models\ShippingMethod;
use Illuminate\Routing\Controller as BaseController;

class ShippingMethodController extends BaseController
{
    /**
     * Buscar todos os métodos de envio ativos
     */
    public function index()
    {
        $shippingMethods = ShippingMethod::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($shippingMethods);
    }

    /**
     * Buscar um método de envio específico
     */
    public function show($id)
    {
        $shippingMethod = ShippingMethod::findOrFail($id);

        return response()->json($shippingMethod);
    }
}
