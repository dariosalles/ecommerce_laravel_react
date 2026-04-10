<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Awesome',
                'slug' => 'awesome',
                'description' => 'Marca Awesome - Qualidade premium',
                'order' => 1,
                'active' => true,
            ],
            [
                'name' => 'Beauty',
                'slug' => 'beauty',
                'description' => 'Marca Beauty - Beleza e elegância',
                'order' => 2,
                'active' => true,
            ],
            [
                'name' => 'Elegant',
                'slug' => 'elegant',
                'description' => 'Marca Elegant - Sofisticação garantida',
                'order' => 3,
                'active' => true,
            ],
            [
                'name' => 'Fantastic',
                'slug' => 'fantastic',
                'description' => 'Marca Fantastic - Inovação e estilo',
                'order' => 4,
                'active' => true,
            ],
            [
                'name' => 'Wonderful',
                'slug' => 'wonderful',
                'description' => 'Marca Wonderful - O melhor para você',
                'order' => 5,
                'active' => false,
            ],
        ];

        foreach ($brands as $brand) {
            Brand::create($brand);
        }
    }
}
