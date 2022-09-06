<?php

namespace App\Console\Commands;

use App\Models\Palabra;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class WordsRandom extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'words:random';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Populate db with random words';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
      for ($x = 0; $x < 500; $x++) {
        $word = Http::get('https://clientes.api.greenborn.com.ar/public-random-word')
          ->json()[0];

        $this->line('Palabra: ' . $word);

        if (Palabra::where('palabra', $word)->doesntExist()) {
          Palabra::create([
            'palabra' => $word,
            'inicial' => Str::slug($word)[0],
          ]);
          sleep(1);
        }
      }

      $this->info('Carga de palabras realizada correctamente.');
      return 0;
    }
}
