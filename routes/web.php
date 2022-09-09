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
    return Inertia::render('Home');
});

Route::get('/test', function () {
  //$word = App\Models\Palabra::find(336);
  //$word = App\Models\Palabra::find(968);
  //$word = App\Models\Palabra::find(234);
  //$word = App\Models\Palabra::find(126);
  $word = App\Models\Palabra::find(130);
  $definicion = App\Services\DRAEService::getDefinition($word);

  $rosco = App\Models\Rosco::find(7);
  $rosco->palabras->each(function ($word) use ($rosco) {
    $definicion = App\Services\DRAEService::getDefinition($word);
    $word->definicion = $definicion;
    $rosco->palabras()->updateExistingPivot($word->id, [
      'definicion' => $definicion,
    ]);
  });

  dd($rosco->palabras);
  return 'Rosco creado';
});

Route::get('roscos/{rosco}/public', [RoscosController::class, 'showPublic'])
    ->name('roscos.show.public');
Route::get('roscos/create', [RoscosController::class, 'create'])
    ->name('roscos.create');

Route::get('games/roscos', [RoscosController::class, 'index'])
    ->name('games.rosco');
Route::get('games/memoria', [DashboardController::class, 'memoria'])
    ->name('games.memoria');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
