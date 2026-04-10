<?php

namespace App\Http\Controllers\Api;

use App\Models\FeaturedHighlight;
use Illuminate\Routing\Controller as BaseController;

class FeaturedHighlightController extends BaseController
{
    /**
     * Buscar todos os destaques ativos
     */
    public function index()
    {
        $highlights = FeaturedHighlight::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json($highlights);
    }

    /**
     * Buscar um destaque específico
     */
    public function show($id)
    {
        $highlight = FeaturedHighlight::findOrFail($id);

        return response()->json($highlight);
    }
}
