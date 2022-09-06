<?php

namespace App\Http\Controllers;

use App\Models\Palabra;
use App\Models\Rosco;
use App\Services\DRAEService;
use Illuminate\Http\Request;

class RoscosController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        $rosco = Rosco::create([
          'opciones' => [
            'contiene' => 12,
          ],
        ]);

        $abc = collect(Rosco::$abcdario);
        $contiene = $abc->random($rosco->opciones['contiene']);

        if (rand(1,10) < 8) {
          collect(['ñ', 'x', 'z', 'h', 'g', 'j', 'y', 'v'])->each(function ($l) use ($contiene) {
            if ($contiene->doesntContain($l)) {
              $contiene->push($l);
            }
          });
        }

        \Log::info($contiene->toArray());

        $abc->each(function ($letra) use ($contiene, $rosco) {
          \Log::info([
            'letra' => $letra,
            'contiene' => $contiene->contains($letra),
          ]);
          if ($contiene->contains($letra)) {
            $palabra = Palabra::where('inicial', '!=', $letra)
              ->where('drae_id', '!=', null)
              ->where('palabra', 'ilike', '%'.$letra.'%')
              ->get()
              ->random();
            $rosco->palabras()->attach($palabra->id, ['letra' => $letra]);
          } else {
            $palabra = Palabra::where('inicial', $letra)
              ->where('drae_id', '!=', null)
              ->get()
              ->random();
            $rosco->palabras()->attach($palabra->id, ['letra' => $letra]);
          }
        });

        $rosco->palabras->each(function ($word) {
          $word->definicion = DRAEService::getDefinition($word);
          $word->save();
        });

        return 'Rosco creado';
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Rosco $rosco)
    {
        return $rosco->palabras;
    }

    public function showPublic(Rosco $rosco)
    {
      return inertia()->render('Games/Roscos/Public', [
        'rosco' => $rosco->load('palabras'),
      ]);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
