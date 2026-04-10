<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paymentMethods = [
            [
                'name' => 'Cartão de Crédito',
                'slug' => 'credit_card',
                'description' => 'Parcelamento em até 12 vezes sem juros',
                'is_active' => true,
                'sort_order' => 1,
                'settings' => [
                    'installments' => 12,
                    'interest_rate' => 0,
                ],
            ],
            [
                'name' => 'Cartão de Débito',
                'slug' => 'debit_card',
                'description' => 'Pagamento imediato via cartão de débito',
                'is_active' => true,
                'sort_order' => 2,
                'settings' => null,
            ],
            [
                'name' => 'PIX',
                'slug' => 'pix',
                'description' => 'Transferência instantânea PIX',
                'is_active' => true,
                'sort_order' => 3,
                'settings' => [
                    'expires_in' => 3600, // 1 hora em segundos
                ],
            ],
            [
                'name' => 'Boleto Bancário',
                'slug' => 'boleto',
                'description' => 'Pagamento via boleto bancário',
                'is_active' => true,
                'sort_order' => 4,
                'settings' => [
                    'due_days' => 3,
                ],
            ],
        ];

        foreach ($paymentMethods as $method) {
            PaymentMethod::create($method);
        }
    }
}
