<?php

namespace Database\Seeders;

use App\Models\StoreSetting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StoreSettingSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StoreSetting::create([
            'store_name' => 'E-Com Shop',
            'store_email' => 'contato@ecom.com',
            'store_phone' => '(11) 99999-9999',
            'store_address' => 'São Paulo, SP - Brasil',
            'store_description' => 'Descubra um mundo de moda, eletrônicos e muito mais. Qualidade premium com preços imbatíveis.',
            'logo_url' => null,
            'favicon_url' => null,
            'terms_and_conditions' => 'Termos e condições da loja - a definir',
            'privacy_policy' => 'Política de privacidade - a definir',
            'shipping_policy' => 'Política de envio - a definir',
            'return_policy' => 'Política de devoluções - a definir',
            'instagram' => 'https://instagram.com/ecomshop',
            'facebook' => 'https://facebook.com/ecomshop',
            'twitter' => 'https://twitter.com/ecomshop',
            'whatsapp' => '5511999999999',
            'currency' => 'BRL',
            'shipping_base_cost' => 10.00,
            'free_shipping_enabled' => true,
            'free_shipping_min_value' => 100.00,
        ]);
    }
}
