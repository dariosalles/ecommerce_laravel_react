<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Array de URLs de imagens de exemplo (Unsplash - variadas)
        $imageUrls = [
            '/images/products/product-001.jpg',
            '/images/products/product-002.jpg',
            '/images/products/product-003.jpg',
            '/images/products/product-004.jpg',
            '/images/products/product-005.jpg',
            '/images/products/product-006.jpg',
            '/images/products/product-007.jpg',
            '/images/products/product-008.jpg',
            '/images/products/product-009.jpg',
            '/images/products/product-010.jpg',
        ];

        // Se as imagens locais não existirem, usa URLs externas
        $useLocalImages = file_exists(public_path('images/products/product-001.jpg'));
        
        if (!$useLocalImages) {
            $imageUrls = [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1525572614635-e7e99976dac1?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1459262838948-3e59a75a84e9?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1516762714618-e620b8b67dff?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1517670244965-e3b5b7c3cd0b?w=500&h=500&fit=crop',
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            ];
        }

        return [
            'name' => fake()->word(),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 10, 1000),
            'stock' => fake()->numberBetween(1, 100),
            'image_url' => fake()->randomElement($imageUrls),
        ];
    }
}
