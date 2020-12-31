<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Resources\User;


class AuthController extends Controller{

	public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            return Auth::user();
            //return response()->json(['status' => 'success'])->header('Authorization', $credentials);
        } else {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }
	}
	
	public function logout(){
		Auth::logout(); //check if Auth::logout(); works
		return response()->json(['msg' => 'User session closed'], 200);
    }
    
    public function register(Request $request){
        /*name: "",
        email: "",
        password: "",
        photo_url: "",
        address: "",
        phone: "",
        nif: "",*/
        //$credentials = $request->only('name','email', 'password','photo_url','address','phone','nif');
        $credentials = $request->only('name','email', 'password','photo_url');
        if(Auth::attempt($credentials)){
            Auth::validate();
        }
        
    }
}