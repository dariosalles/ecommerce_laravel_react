<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    /**
     * Display a listing of all colors.
     */
    public function index()
    {
        return Color::orderBy('order')->get();
    }

    /**
     * Display active colors only.
     */
    public function active()
    {
        return Color::where('active', true)->orderBy('order')->get();
    }

    /**
     * Display the specified color with its products.
     */
    public function show($id)
    {
        $color = Color::with('products')->findOrFail($id);
        return $color;
    }

    /**
     * Store a newly created color in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:colors',
            'hex' => 'required|string|unique:colors',
            'slug' => 'required|string|unique:colors',
            'order' => 'nullable|integer',
            'active' => 'nullable|boolean',
        ]);

        return Color::create($validated);
    }

    /**
     * Update the specified color in storage.
     */
    public function update(Request $request, $id)
    {
        $color = Color::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|unique:colors,name,' . $id,
            'hex' => 'string|unique:colors,hex,' . $id,
            'slug' => 'string|unique:colors,slug,' . $id,
            'order' => 'nullable|integer',
            'active' => 'nullable|boolean',
        ]);

        $color->update($validated);
        return $color;
    }

    /**
     * Delete the specified color from storage.
     */
    public function destroy($id)
    {
        $color = Color::findOrFail($id);
        $color->delete();

        return response()->json(['message' => 'Color deleted successfully']);
    }
}
