<?php

namespace App\Http\Controllers\Api;

use App\Models\StoreSetting;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Validation\ValidationException;

class StoreSettingController extends BaseController
{
    /**
     * Buscar todas as configurações da loja
     */
    public function index()
    {
        $settings = StoreSetting::first();

        if (!$settings) {
            return response()->json(['message' => 'Configurações da loja não encontradas'], 404);
        }

        return response()->json($settings);
    }

    /**
     * Buscar uma minha configuração específica por ID
     */
    public function show($id)
    {
        $settings = StoreSetting::find($id);

        if (!$settings) {
            return response()->json(['message' => 'Configuração não encontrada'], 404);
        }

        return response()->json($settings);
    }

    /**
     * Criar nova configuração da loja
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'store_name' => 'required|string|max:255',
                'store_email' => 'required|email|max:255',
                'store_phone' => 'nullable|string|max:20',
                'store_address' => 'nullable|string|max:255',
                'store_description' => 'nullable|string',
                'logo_url' => 'nullable|string|url',
                'favicon_url' => 'nullable|string|url',
                'terms_and_conditions' => 'nullable|string',
                'privacy_policy' => 'nullable|string',
                'shipping_policy' => 'nullable|string',
                'return_policy' => 'nullable|string',
                'instagram' => 'nullable|string|max:255',
                'facebook' => 'nullable|string|max:255',
                'twitter' => 'nullable|string|max:255',
                'whatsapp' => 'nullable|string|max:20',
                'currency' => 'nullable|string|max:3',
                'shipping_base_cost' => 'nullable|numeric|min:0',
                'free_shipping_enabled' => 'nullable|boolean',
                'free_shipping_min_value' => 'nullable|numeric|min:0',
            ]);

            $settings = StoreSetting::create($validated);

            return response()->json([
                'message' => 'Configurações da loja criadas com sucesso',
                'data' => $settings
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erro na validação dos dados',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Atualizar configurações da loja
     */
    public function update(Request $request, $id = null)
    {
        try {
            // Se não houver ID na URL, usar a primeira configuração (único registro)
            if (!$id) {
                $settings = StoreSetting::first();
                if (!$settings) {
                    return response()->json(['message' => 'Configurações não encontradas'], 404);
                }
            } else {
                $settings = StoreSetting::find($id);
                if (!$settings) {
                    return response()->json(['message' => 'Configuração não encontrada'], 404);
                }
            }

            $validated = $request->validate([
                'store_name' => 'sometimes|required|string|max:255',
                'store_email' => 'sometimes|required|email|max:255',
                'store_phone' => 'nullable|string|max:20',
                'store_address' => 'nullable|string|max:255',
                'store_description' => 'nullable|string',
                'logo_url' => 'nullable|string|url',
                'favicon_url' => 'nullable|string|url',
                'terms_and_conditions' => 'nullable|string',
                'privacy_policy' => 'nullable|string',
                'shipping_policy' => 'nullable|string',
                'return_policy' => 'nullable|string',
                'instagram' => 'nullable|string|max:255',
                'facebook' => 'nullable|string|max:255',
                'twitter' => 'nullable|string|max:255',
                'whatsapp' => 'nullable|string|max:20',
                'currency' => 'nullable|string|max:3',
                'shipping_base_cost' => 'nullable|numeric|min:0',
                'free_shipping_enabled' => 'nullable|boolean',
                'free_shipping_min_value' => 'nullable|numeric|min:0',
            ]);

            $settings->update($validated);

            return response()->json([
                'message' => 'Configurações atualizado com sucesso',
                'data' => $settings
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Erro na validação dos dados',
                'errors' => $e->errors()
            ], 422);
        }
    }

    /**
     * Deletar configuração da loja
     */
    public function destroy($id)
    {
        $settings = StoreSetting::find($id);

        if (!$settings) {
            return response()->json(['message' => 'Configuração não encontrada'], 404);
        }

        $settings->delete();

        return response()->json([
            'message' => 'Configurações deletadas com sucesso'
        ]);
    }
}
