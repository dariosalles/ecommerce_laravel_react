<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeaturedHighlight extends Model
{
    use HasFactory;

    protected $table = 'featured_highlights';

    protected $fillable = [
        'title',
        'description',
        'image_url',
        'button_text',
        'button_link',
        'background_color',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
