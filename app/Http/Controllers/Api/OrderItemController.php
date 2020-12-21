<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\OrderItem as OrderItemResource;
//use App\Http\Requests\StoreProductRequest;
//use App\Http\Requests\UpdateProductRequest;
use App\Models\OrderItem;

class OrderItemController extends Controller
{
    public function index(Request $request)
    {
        if ($request->has('page')) {        
            return OrderItemResource::collection(OrderItem::paginate(5));
        } else {
            return OrderItemResource::collection(OrderItem::all());
        }
    }

    public function show(OrderItem $order_item)
    {
        return new OrderItemResource($order_item);
    }
/*
    public function store(StoreProductRequest $request)
    {
        $product = new Product();
        $product->fill($request->validated());
        $product->save();
        return response()->json(new ProductResource($product), 201);
    }
    */
    /* SEM StoreUserRequest */
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'name' => 'required|regex:/^[A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ ]+$/',
    //         'email' => 'required|email|unique:users',
    //         'password' => 'required|min:8|confirmed',
    //         'age' => 'required|integer|min:18|max:75',
    //         'department_id' => 'required|integer',
    //     ]);
    //     $user = new User();
    //     $user->fill($request->all());
    //     $user->password = Hash::make($user->password);
    //     $user->save();
    //     return response()->json(new UserResource($user), 201);
    // }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return new ProductResource($product);
    }
    /* SEM UpdateUserRequest */
    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'name' => 'required|regex:/^[A-Za-záàâãéèêíóôõúçÁÀÂÃÉÈÍÓÔÕÚÇ ]+$/',
    //         'email' => 'required|email|unique:users,email,' . $this->user->id,
    //         'password' => 'nullable|string|min:6|confirmed',
    //         'age' => 'required|integer|min:18|max:75',
    //         'department_id' => 'required|integer',
    //     ]);
    //     $user = User::findOrFail($id);
    //     $user->update($request->all());
    //     return new UserResource($user);
    // }
    /*
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }*/
    public function destroy($id)
    {
        $item = OrderItem::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}
