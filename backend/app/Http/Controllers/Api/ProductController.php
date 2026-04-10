<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('category', 'brand', 'color')->get();
    }

    public function show($id)
    {
        return Product::with('category', 'brand', 'color')->findOrFail($id);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');
        $categoryId = $request->input('category_id');
        $brandId = $request->input('brand_id');
        $colorId = $request->input('color_id');
        $brandNames = $request->input('brands'); // CSV string: "Brand1,Brand2"
        $colorNames = $request->input('colors'); // CSV string: "Color1,Color2"
        $minPrice = $request->input('min_price');
        $maxPrice = $request->input('max_price');

        $products = Product::with('category', 'brand', 'color');

        if ($query) {
            $products = $products->where('name', 'LIKE', "%{$query}%")
                                 ->orWhere('description', 'LIKE', "%{$query}%");
        }

        if ($categoryId) {
            $products = $products->where('category_id', $categoryId);
        }

        if ($brandId) {
            $products = $products->where('brand_id', $brandId);
        }

        if ($colorId) {
            $products = $products->where('color_id', $colorId);
        }

        // Filtrar por nomes de marca (suporta múltiplas marcas separadas por vírgula)
        if ($brandNames) {
            $brands = array_map('trim', explode(',', $brandNames));
            $products = $products->whereHas('brand', function ($q) use ($brands) {
                $q->whereIn('name', $brands);
            });
        }

        // Filtrar por nomes de cor (suporta múltiplas cores separadas por vírgula)
        if ($colorNames) {
            $colors = array_map('trim', explode(',', $colorNames));
            $products = $products->whereHas('color', function ($q) use ($colors) {
                $q->whereIn('name', $colors);
            });
        }

        if ($minPrice !== null) {
            $products = $products->where('price', '>=', $minPrice);
        }

        if ($maxPrice !== null) {
            $products = $products->where('price', '<=', $maxPrice);
        }

        return $products->get();
    }
}
