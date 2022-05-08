<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

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

Route::post('register', [ApiController::class, 'register']);
Route::post('login', [ApiController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum'], "prefix" => 'admin'], function() {

    Route::get('/status', function() {
        return true;
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('logout', [ApiController::class, 'logout']);


    Route::group(["prefix" => 'category'], function() {
        Route::post('create', [CategoryController::class, 'create']);
        Route::get('show', [CategoryController::class, 'show']);
        Route::get('destroy/{id}', [CategoryController::class, 'destroy']);
        Route::post('update', [CategoryController::class, 'update']);
        
        Route::group(["prefix" => 'product'], function() {
            Route::get('get_cat', [ProductController::class, 'index']);
            Route::get('get_color_name', [ProductController::class, 'get_color_name']);
            Route::get('get_size_name', [ProductController::class, 'get_size_name']);
            Route::post('create', [ProductController::class, 'create']);
            Route::get('show', [ProductController::class, 'show']);
            Route::get('store', [ProductController::class, 'store']);
            Route::get('destroy/{id}', [ProductController::class, 'destroy']);
            Route::post('update', [ProductController::class, 'update']);
            Route::post('search', [ProductController::class, 'search']);
            Route::get('color/{id}', [ProductController::class, 'sort_color']);
            Route::get('size/{id}', [ProductController::class, 'sort_size']);
            Route::get('price/{param}', [ProductController::class, 'sort_price']);
        });

    });
});
