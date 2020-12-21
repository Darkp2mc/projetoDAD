<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\UserController as User;
use App\Http\Controllers\Api\UserController;

use App\Http\Controllers\ProductController as Product;
use App\Http\Controllers\Api\ProductController;

use App\Http\Controllers\OrderItemController as OrderItem;
use App\Http\Controllers\Api\OrderItemController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->get('/product', function (Request $request) {
    return $request->product();
});

Route::middleware('auth:api')->get('/order_item', function (Request $request) {
    return $request->orderitems();
});

Route::middleware('auth:sanctum')->get('users',[User::class, 'index']);
Route::middleware('auth:sanctum')->get('users/me', [UserController::class, 'me']);

Route::middleware('auth:sanctum')->get('products',[Product::class, 'index']);
Route::middleware('auth:sanctum')->get('order_item',[OrderItem::class, 'index']);

Route::post('login',             [AuthController::class, 'login']);
Route::post('logout',            [AuthController::class, 'logout']);

Route::post('register',            [AuthController::class, 'register']);

Route::get('users',                 [UserController::class, 'index']);
Route::get('users/emailavailable',  [UserController::class, 'emailAvailable']);
Route::get('users/{user}',          [UserController::class, 'show']);

Route::post('users',                [UserController::class, 'store']);
Route::put('users/{user}',          [UserController::class, 'update']);
Route::delete('users/{user}',       [UserController::class, 'destroy']);

Route::get('products',                    [ProductController::class, 'index']);
Route::get('products/{product}',          [ProductController::class, 'show']);

Route::post('products',                   [ProductController::class, 'store']);
Route::put('products/{product}',          [ProductController::class, 'update']);
Route::delete('products/{product}',       [ProductController::class, 'destroy']);

Route::get('order_items',                    [OrderItemController::class, 'index']);
Route::get('order_items/{order_item}',          [OrderItemController::class, 'show']);

Route::post('order_items',                   [OrderItemController::class, 'store']);
Route::put('order_items/{order_item}',          [OrderItemController::class, 'update']);
Route::delete('order_items/{order_item}',       [OrderItemController::class, 'destroy']);