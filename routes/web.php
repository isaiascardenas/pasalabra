<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\RoscosController;
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
    return redirect()->route('login');
});

Route::middleware(['auth', 'web'])->group(function () {
  Route::get('/home', function () {
    return Inertia::render('Home');
  })->name('home');

  Route::get('roscos/create', [RoscosController::class, 'create'])
    ->name('roscos.create');
  Route::get('roscos/{rosco}/public', [RoscosController::class, 'showPublic'])
    ->name('roscos.show.public');
  Route::get('roscos/{rosco}', [RoscosController::class, 'show'])
    ->name('roscos.show');

  Route::post('roscos/palabras/{palabraRosco}', [RoscosController::class, 'palabraEstado'])
    ->name('roscos.palabras.estado');
  Route::post('roscos/start/{rosco}', [RoscosController::class, 'start'])
    ->name('roscos.start');
  Route::post('roscos/stop/{rosco}', [RoscosController::class, 'stop'])
    ->name('roscos.stop');

  Route::get('games/roscos', [RoscosController::class, 'index'])
    ->name('games.rosco');
  Route::get('games/memoria', [DashboardController::class, 'memoria'])
    ->name('games.memoria');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
