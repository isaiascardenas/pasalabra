<?php

namespace App\Http\Controllers;

use App\Events\PalabraStatusUpdated;
use App\Events\RoscoStart;
use App\Events\RoscoStop;
use App\Models\Palabra;
use App\Models\PalabraRosco;
use App\Models\Rosco;
use App\Notifications\PalabraRoscoEstado;
use App\Services\DRAEService;
use Illuminate\Http\Request;

class RoscosController extends Controller
{
    public function index()
    {
        return 'Roscos index';
    }

    public function create()
    {
        $rosco = Rosco::create([
          'correctas' => 0,
          'tiempo' => 200,
          'opciones' => [
            'contiene' => 12,
          ],
          'comodines' => [
            'otra_oportunidad' => true,
            'relectura'        => true,
            'cambio_letra'     => true,
          ],
        ]);

        $abc = collect(Rosco::$abcdario);
        $contiene = $abc->random($rosco->opciones['contiene']);
        //
        $contiene->push('ñ');
        $contiene->push('j');
        $contiene->push('x');
        $contiene->push('y');
        //

        if (rand(1,10) < 8) {
          collect(['ñ', 'x', 'z', 'h', 'g', 'j', 'y', 'v'])->each(function ($l) use ($contiene) {
            if ($contiene->doesntContain($l)) {
              $contiene->push($l);
            }
          });
        }

        $abc->each(function ($letra) use ($contiene, $rosco) {
          if ($contiene->contains($letra)) {
            $palabra = Palabra::where('inicial', '!=', $letra)
              ->where('drae_id', '!=', null)
              ->whereNotIn('id', $rosco->palabrasRoscos->pluck('palabra_id'))
              ->where('palabra', 'ilike', '%'.$letra.'%')
              ->get()
              ->random();

            $definicion = DRAEService::getDefinition($palabra);

            PalabraRosco::create([
              'palabra_id'      => $palabra->id,
              'rosco_id'        => $rosco->id,
              'letra'           => $letra,
              'tipo_definicion' => $definicion['type'],
              'definicion'      => $definicion['definition'],
            ]);
          } else {
            $palabra = Palabra::where('inicial', $letra)
              ->where('drae_id', '!=', null)
              ->whereNotIn('id', $rosco->palabrasRoscos->pluck('palabra_id'))
              ->get()
              ->random();

            $definicion = DRAEService::getDefinition($palabra);

            PalabraRosco::create([
              'palabra_id'      => $palabra->id,
              'rosco_id'        => $rosco->id,
              'letra'           => $letra,
              'tipo_definicion' => $definicion['type'],
              'definicion'      => $definicion['definition'],
            ]);
          }
        });

        return 'Rosco creado';
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Rosco $rosco)
    {
        return inertia()->render('Games/Roscos/Show', [
          'rosco' => $rosco->load('palabrasRoscos.palabra'),
        ]);
    }

    public function showPublic(Rosco $rosco)
    {
      return inertia()->render('Games/Roscos/Public', [
        'rosco' => $rosco->load('palabrasRoscos.palabra'),
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

    public function start(Rosco $rosco)
    {
        RoscoStart::dispatch($rosco);
    }

    public function stop(Rosco $rosco)
    {
        $rosco->update([
          'tiempo' => request()->time,
        ]);
        RoscoStop::dispatch($rosco);
    }

    public function palabraEstado(PalabraRosco $palabraRosco)
    {
        $palabraRosco->update($this->validate(request(), [
            'estado'  => ['required'],
        ]));

        if (request()->estado == 'correcto') {
          $palabraRosco->rosco->update([
            'correctas' => $palabraRosco->rosco->correctas + 1,
          ]);
        } else {
          $palabraRosco->rosco->update([
            'tiempo' => request()->time,
          ]);
          RoscoStop::dispatch($palabraRosco->rosco);
        }

        PalabraStatusUpdated::dispatch($palabraRosco);

        return redirect()
            ->route('roscos.show',  ['rosco' => $palabraRosco->rosco_id])
            ->with('success', 'Rosco actualizado.');
    }
}
