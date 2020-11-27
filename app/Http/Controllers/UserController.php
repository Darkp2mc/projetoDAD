<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use App\Models\User;
use App\Http\Resourses\User as UserResource;

class UserController extends Controller
{
    public function index(){
    	return UserResource::collection(User::all());
    }
}
