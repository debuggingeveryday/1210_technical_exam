<?php

use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->middleware(['auth', 'verified'])->name('dashboard');
Route::resource('/task', TaskController::class)->middleware(['auth', 'verified']);

Route::get('/tasks/image/{image}', function ($image) {
    $path = storage_path("app/tasks/$image");
    return response()->file($path);
})->middleware(['auth', 'verified']);

/* for testing */
Route::get('/test', fn () => Inertia::render('Test'));

require __DIR__.'/auth.php';
