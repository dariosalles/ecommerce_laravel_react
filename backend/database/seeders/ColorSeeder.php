<?php

namespace Database\Seeders;

use App\Models\Color;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            [
                'name' => 'White',
                'hex' => '#FFFFFF',
                'slug' => 'white',
                'order' => 1,
                'active' => true,
            ],
            [
                'name' => 'Black',
                'hex' => '#000000',
                'slug' => 'black',
                'order' => 2,
                'active' => true,
            ],
            [
                'name' => 'Blue',
                'hex' => '#0000FF',
                'slug' => 'blue',
                'order' => 3,
                'active' => true,
            ],
            [
                'name' => 'Red',
                'hex' => '#FF0000',
                'slug' => 'red',
                'order' => 4,
                'active' => true,
            ],
            [
                'name' => 'Green',
                'hex' => '#00AA00',
                'slug' => 'green',
                'order' => 5,
                'active' => false,
            ],
        ];

        foreach ($colors as $color) {
            Color::create($color);
        }
    }
}
