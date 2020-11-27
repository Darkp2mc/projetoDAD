<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Order extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'status',
        'notes',
        'prepared_by',
        'delivred_by',
        'order_id',
        'product_id',
        'unit_price',
        
        
    ];

    public function items()
    {
        return $this->hasMany(Order_item::class);
    }


    protected $casts = [
        'current_status_at'=>'datetime',
    ];


}
