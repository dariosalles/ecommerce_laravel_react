<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Cria categorias específicas com dados em português
        $categories = [
            [
                'name' => 'Homens',
                'slug' => 'homens',
                'description' => 'Roupas e acessórios para homens',
                'order' => 1,
                'featured' => true,
            ],
            [
                'name' => 'Mulheres',
                'slug' => 'mulheres',
                'description' => 'Roupas e acessórios para mulheres',
                'order' => 2,
                'featured' => true,
            ],
            [
                'name' => 'Eletrônicos',
                'slug' => 'eletronicos',
                'description' => 'Dispositivos eletrônicos e gadgets',
                'order' => 3,
                'featured' => true,
            ],
            [
                'name' => 'Calçados',
                'slug' => 'calcados',
                'description' => 'Sapatos para todas as ocasiões',
                'order' => 4,
                'featured' => true,
            ],
            [
                'name' => 'Bolsas',
                'slug' => 'bolsas',
                'description' => 'Bolsas e malas de viagem',
                'order' => 5,
                'featured' => false,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
