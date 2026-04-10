<?php

namespace Database\Seeders;

use App\Models\StoreContact;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StoreContactSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contacts = [
            [
                'type' => 'email',
                'title' => 'E-mail Principal',
                'value' => 'contato@ecom.com',
                'description' => 'Envie seus e-mails para este endereço',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'type' => 'email',
                'title' => 'E-mail de Suporte',
                'value' => 'suporte@ecom.com',
                'description' => 'Para dúvidas sobre seus pedidos',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'type' => 'phone',
                'title' => 'Telefone Principal',
                'value' => '(11) 99999-9999',
                'description' => 'Ligue para nós',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'type' => 'phone',
                'title' => 'WhatsApp',
                'value' => '(11) 99999-9999',
                'description' => 'Melhor forma de entrar em contato',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'type' => 'address',
                'title' => 'Endereço da Loja',
                'value' => 'Rua Exemplo, 123 - São Paulo, SP - 01234-567 - Brasil',
                'description' => 'Para retirada de pedidos',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'type' => 'hours',
                'title' => 'Horário de Funcionamento',
                'value' => 'Seg-Sex: 08h00 até 18h00 | Sab: 09h00 até 14h00',
                'description' => 'Atendimento presencial e telefônico',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($contacts as $contact) {
            StoreContact::create($contact);
        }
    }
}
