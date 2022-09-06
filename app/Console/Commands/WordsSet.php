<?php

namespace App\Console\Commands;

use App\Models\Palabra;
use App\Services\DRAEService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class WordsSet extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'words:set';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Validate words on db';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $palabras = Palabra::where('drae_id', '=', null)
          ->get()
          ->each(function ($word) {
            $this->line('Procesando palabra: ' . $word->palabra);
            DRAEService::setWord($word);
          });
      $this->info('palabras actualizadas correctamente.');
    }
}
