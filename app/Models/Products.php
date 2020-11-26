<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
class Products extends Model
{
    use HasFactory, Notifiable;


     
    protected $fillable = [
       'name',
       'type',
       'description',
       'photo_url',
       'price',
    ];


    protected $casts = [
        'created_at'=>'datetime',
        'updated_at'=>'datetime',
        'deleted_at'=>'datetime',
    ];



}
