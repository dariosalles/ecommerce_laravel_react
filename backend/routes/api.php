<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\ColorController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PaymentMethodController;
use App\Http\Controllers\Api\ShippingMethodController;
use App\Http\Controllers\Api\StoreInfoController;
use App\Http\Controllers\Api\FeaturedHighlightController;
use App\Http\Controllers\Api\OrderController;

// Authentication routes (public)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected authentication routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user/profile', [AuthController::class, 'updateProfile']);
    Route::post('/user/change-password', [AuthController::class, 'changePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Orders routes (protected)
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/all', [OrderController::class, 'allOrders']); // Admin only
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);

    // Users routes (admin only)
    Route::get('/users', function() {
        return response()->json(\App\Models\User::paginate(50));
    });
    Route::delete('/users/{id}', function($id) {
        \App\Models\User::findOrFail($id)->delete();
        return response()->json(['message' => 'User deleted']);
    });
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/products/{id}', [ProductController::class, 'show']);

Route::get('/categories/featured', [CategoryController::class, 'featured']);
Route::get('/categories/all', [CategoryController::class, 'index']); // Alias para admin
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::put('/categories/{id}', [CategoryController::class, 'update']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

Route::get('/brands/active', [BrandController::class, 'active']);
Route::get('/brands', [BrandController::class, 'index']);
Route::get('/brands/{id}', [BrandController::class, 'show']);
Route::post('/brands', [BrandController::class, 'store']);
Route::put('/brands/{id}', [BrandController::class, 'update']);
Route::delete('/brands/{id}', [BrandController::class, 'destroy']);

Route::get('/colors/active', [ColorController::class, 'active']);
Route::get('/colors', [ColorController::class, 'index']);
Route::get('/colors/{id}', [ColorController::class, 'show']);
Route::post('/colors', [ColorController::class, 'store']);
Route::put('/colors/{id}', [ColorController::class, 'update']);
Route::delete('/colors/{id}', [ColorController::class, 'destroy']);

// Store information routes (public)
Route::get('/store', [StoreInfoController::class, 'index']);
Route::get('/store/settings', [StoreInfoController::class, 'settings']);
Route::get('/store/contacts', [StoreInfoController::class, 'contacts']);
Route::get('/store/contacts/{type}', [StoreInfoController::class, 'contactsByType']);

// Payment methods routes (public)
Route::get('/payment-methods', [PaymentMethodController::class, 'index']);
Route::get('/payment-methods/{id}', [PaymentMethodController::class, 'show']);

// Shipping methods routes (public)
Route::get('/shipping-methods', [ShippingMethodController::class, 'index']);
Route::get('/shipping-methods/{id}', [ShippingMethodController::class, 'show']);

// Featured highlights routes (public)
Route::get('/featured-highlights', [FeaturedHighlightController::class, 'index']);
Route::get('/featured-highlights/{id}', [FeaturedHighlightController::class, 'show']);