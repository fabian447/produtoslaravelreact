<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Project;

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

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@authenticate');
Route::get('open', 'DataController@open');


Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::put('user/', 'UserController@UpdateUser');
    Route::get('/produtos', 'ProdutoController@index')->name('produtos.index');
    Route::post('/produtos', 'ProdutoController@store')->name('produtos.store');
    Route::get('/produtos/{produto}', 'ProdutoController@show')->name('produtos.show');
    Route::put('/produtos/{produto}', 'ProdutoController@update')->name('produtos.update');
    Route::delete('/produtos/{produto}', 'ProdutoController@destroy')->name('produtos.destroy');
});






