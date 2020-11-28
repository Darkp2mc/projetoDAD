<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\Product;
use App\Http\Resources\Product as ProductResource;

class ProductController extends Controller
{
    public function index(){
    	return ProductResource::collection(Product::all());
    }
}
