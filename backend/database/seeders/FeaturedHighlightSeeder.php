<?php

namespace Database\Seeders;

use App\Models\FeaturedHighlight;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeaturedHighlightSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $highlights = [
            [
                'title' => 'MODA PARA HOMENS',
                'description' => 'Descubra uma seleção exclusiva de roupas e acessórios para homens com estilo e qualidade premium. Aproveite nossas ofertas especiais.',
                'image_url' => '/images/highlights/destaque-moda-homens.jpg',
                'button_text' => 'COMPRAR AGORA',
                'button_link' => '/categories?type=men',
                'background_color' => '#667eea',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'COLEÇÃO FEMININA',
                'description' => 'Explore nossas últimas tendências em moda feminina. Peças sofisticadas, confortáveis e com excelente custo-benefício para você.',
                'image_url' => '/images/highlights/destaque-moda-feminina.jpg',
                'button_text' => 'EXPLORAR',
                'button_link' => '/categories?type=women',
                'background_color' => '#764ba2',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'ELETRÔNICOS EM PROMOÇÃO',
                'description' => 'Tecnologia de ponta com os melhores preços do mercado. Smartphones, tablets, acessórios e muito mais com garantia.',
                'image_url' => '/images/highlights/destaque-eletronicos.jpg',
                'button_text' => 'APROVEITAR',
                'button_link' => '/categories?type=electronics',
                'background_color' => '#f97316',
                'sort_order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($highlights as $highlight) {
            FeaturedHighlight::create($highlight);
        }
    }
}
