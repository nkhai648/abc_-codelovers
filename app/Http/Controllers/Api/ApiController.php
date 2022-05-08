<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
use Hash;

class ApiController extends Controller
{


    public function register(Request $request) {
        $request->validate([
            "name" => ['required'],
            "email" => ['required', 'email', 'unique:users'],
            "password" => ['required', 'confirmed'],
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
    }
    public function login(Request $request) {
        $request->validate([
            "email" => ['required', 'email'],
            "password" => ['required']
        ]);

        $user = User::where('email', $request->email)->first();
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Account is no exists!',
            ], 401);
        }

        $token = $user->createToken('myTokenLoginCodeLove')->plainTextToken;
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout() {
        auth()->user()->tokens()->delete();
        return response()->json([
            'messag' => 'Log out success'
        ], 200);
    }
}
