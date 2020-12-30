<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Order extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'customer_id',
        'status',
        'notes',
        'total_price',
        'date',
        'prepared_by',
        'opened_at',
        'current_status_at',
        'delivered_by',
        'order_id',
        'product_id',
        'unit_price',
        'preparation_time',
        'delivery_time',
        'total_time'
        
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }


    protected $casts = [
        'current_status_at'=>'datetime',
    ];


}
