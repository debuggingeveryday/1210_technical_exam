<?php

use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))->name('dashboard');
    Route::resource('/task', TaskController::class);
    Route::put('/task/{task}/update-status', [TaskController::class, 'update_status'])->name('task.update-status');
    Route::post('/task/{task}/upload-files', [TaskController::class, 'upload_files'])->name('task.upload-files');
});

Route::get('/tasks/image/{image}', function ($image) {
    $path = storage_path("app/tasks/$image");

    return response()->file($path);
})->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
