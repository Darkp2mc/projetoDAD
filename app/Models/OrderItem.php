<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class OrderItem extends Model
{
    use HasFactory, Notifiable;

    public function order_items()
    {
        return $this->belongsTo(Order::class);
    }


    protected $fillable = [
       'order_id',
       'product_id',
       'quantity',
       'unit_price',
       'sub_total_price',
    ];

}
