<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\TransactionController;

Route::post('login', [ApiController::class, 'authenticate']);
Route::post('register', [ApiController::class, 'register']);

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('logout', [ApiController::class, 'logout']);
    Route::get('get_user', [ApiController::class, 'get_user']);
    Route::get('Transactions', [TransactionController::class, 'index']);
    Route::get('Transactions/{id}', [TransactionController::class, 'show']);
    Route::post('create', [TransactionController::class, 'store']);
    Route::put('update/{Transaction}',  [TransactionController::class, 'update']);
    Route::delete('delete/{Transaction}',  [TransactionController::class, 'destroy']);
});