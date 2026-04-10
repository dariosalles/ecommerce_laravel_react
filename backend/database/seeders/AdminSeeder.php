<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super admin padrão
        Admin::firstOrCreate(
            ['email' => 'admin@ecommerce.local'],
            [
                'name' => 'Super Admin',
                'password' => 'password123',
                'role' => 'super_admin',
                'active' => true,
            ]
        );

        // Admin adicional
        Admin::firstOrCreate(
            ['email' => 'moderator@ecommerce.local'],
            [
                'name' => 'Moderador',
                'password' => 'password123',
                'role' => 'moderator',
                'active' => true,
            ]
        );
    }
}
