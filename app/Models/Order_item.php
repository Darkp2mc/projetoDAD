<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Order_item extends Model
{
    use HasFactory, Notifiable;

    public function oreder()
    {
        return $this->belongsTo(Order::class);
    }




}
