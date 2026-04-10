<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of all categories.
     */
    public function index()
    {
        return Category::orderBy('order')->get();
    }

    /**
     * Display featured categories only.
     */
    public function featured()
    {
        return Category::where('featured', true)->orderBy('order')->get();
    }

    /**
     * Display the specified category with its products.
     */
    public function show($id)
    {
        $category = Category::with('products')->findOrFail($id);
        return $category;
    }

    /**
     * Store a newly created category in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|unique:categories',
            'description' => 'nullable|string',
            'slug' => 'required|string|unique:categories',
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        return Category::create($validated);
    }

    /**
     * Update the specified category in storage.
     */
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|unique:categories,name,' . $id,
            'description' => 'nullable|string',
            'slug' => 'string|unique:categories,slug,' . $id,
            'image' => 'nullable|string',
            'order' => 'nullable|integer',
        ]);

        $category->update($validated);
        return $category;
    }

    /**
     * Delete the specified category from storage.
     */
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
