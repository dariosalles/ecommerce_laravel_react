<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreContact extends Model
{
    use HasFactory;

    protected $table = 'store_contacts';

    protected $fillable = [
        'type',
        'title',
        'value',
        'description',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
