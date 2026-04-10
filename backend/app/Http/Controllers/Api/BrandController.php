<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of all brands.
     */
    public function index()
    {
        return Brand::orderBy('order')->get();
    }

    /**
     * Display active brands only.
     */
    public function active()
    {
        return Brand::where('active', true)->orderBy('order')->get();
    }

    /**
     * Display the specified brand with its products.
     */
    public function show($id)
    {
        $brand = Brand::with('products')->findOrFail($id);
        return $brand;
    }

    /**
     * Store a newly created brand in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:brands',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:brands',
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
            'active' => 'nullable|boolean',
        ]);

        return Brand::create($validated);
    }

    /**
     * Update the specified brand in storage.
     */
    public function update(Request $request, $id)
    {
        $brand = Brand::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|unique:brands,name,' . $id,
            'description' => 'nullable|string',
            'slug' => 'string|unique:brands,slug,' . $id,
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
            'active' => 'nullable|boolean',
        ]);

        $brand->update($validated);
        return $brand;
    }

    /**
     * Delete the specified brand from storage.
     */
    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);
        $brand->delete();

        return response()->json(['message' => 'Brand deleted successfully']);
    }
}
