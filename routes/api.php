<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\UserController as User;
use App\Http\Controllers\Api\UserController;

use App\Http\Controllers\ProductController as Product;
use App\Http\Controllers\Api\ProductController;

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

Route::middleware('auth:sanctum')->get('users',[User::class, 'index']);
Route::middleware('auth:sanctum')->get('users/me', [UserController::class, 'me']);

Route::middleware('auth:sanctum')->get('products',[Product::class, 'index']);

Route::post('login',             [AuthController::class, 'login']);
Route::post('logout',            [AuthController::class, 'logout']);

Route::get('users',              [UserController::class,'index']);

Route::get('products',                    [ProductController::class, 'index']);
Route::get('products/{product}',          [ProductController::class, 'show']);

Route::post('products',                   [ProductController::class, 'store']);
Route::put('products/{product}',          [ProductController::class, 'update']);
Route::delete('products/{product}',       [ProductController::class, 'destroy']);
