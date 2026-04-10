<?php

namespace Database\Seeders;

use App\Models\ShippingMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShippingMethodSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shippingMethods = [
            [
                'name' => 'SEDEX',
                'slug' => 'sedex',
                'description' => 'Entrega rápida em 2-3 dias úteis',
                'base_cost' => 15.00,
                'cost_per_kg' => 2.50,
                'delivery_days_min' => 2,
                'delivery_days_max' => 3,
                'is_active' => true,
                'sort_order' => 1,
                'settings' => [
                    'carrier' => 'correios',
                ],
            ],
            [
                'name' => 'PAC',
                'slug' => 'pac',
                'description' => 'Entrega econômica em 5-8 dias úteis',
                'base_cost' => 8.00,
                'cost_per_kg' => 1.50,
                'delivery_days_min' => 5,
                'delivery_days_max' => 8,
                'is_active' => true,
                'sort_order' => 2,
                'settings' => [
                    'carrier' => 'correios',
                ],
            ],
            [
                'name' => 'Retirada na Loja',
                'slug' => 'pickup',
                'description' => 'Retire seu pedido na loja física',
                'base_cost' => 0.00,
                'cost_per_kg' => 0.00,
                'delivery_days_min' => 1,
                'delivery_days_max' => 1,
                'is_active' => true,
                'sort_order' => 3,
                'settings' => [
                    'address' => 'São Paulo, SP - Brasil',
                    'hours' => 'Seg-Sex: 08h-18h, Sab: 09h-14h',
                ],
            ],
            [
                'name' => 'Entrega Agendada',
                'slug' => 'scheduled',
                'description' => 'Agende o dia e hora para receber seu pedido',
                'base_cost' => 20.00,
                'cost_per_kg' => 2.00,
                'delivery_days_min' => 1,
                'delivery_days_max' => 15,
                'is_active' => true,
                'sort_order' => 4,
                'settings' => [
                    'requires_address' => true,
                ],
            ],
        ];

        foreach ($shippingMethods as $method) {
            ShippingMethod::create($method);
        }
    }
}
