<?php

namespace App\Http\Controllers\Api;

use App\Models\StoreSetting;
use App\Models\StoreContact;
use Illuminate\Routing\Controller as BaseController;

class StoreInfoController extends BaseController
{
    /**
     * Buscar configurações da loja
     */
    public function settings()
    {
        $settings = StoreSetting::first();

        return response()->json($settings);
    }

    /**
     * Buscar informações de contato da loja
     */
    public function contacts()
    {
        $contacts = StoreContact::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($contacts);
    }

    /**
     * Buscar informação de contato por tipo
     */
    public function contactsByType($type)
    {
        $contacts = StoreContact::where('type', $type)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($contacts);
    }

    /**
     * Buscar todas as informações da loja
     */
    public function index()
    {
        $settings = StoreSetting::first();
        $contacts = StoreContact::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        $storeInfo = [
            'settings' => $settings,
            'contacts' => $contacts,
        ];

        return response()->json($storeInfo);
    }
}
