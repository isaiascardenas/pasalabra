<?php

namespace App\Services;

use App\Models\Palabra;
use GuzzleHttp\Client;
use Illuminate\Support\Str;

class DRAEService
{
  public static function getDefinition(Palabra $word)
  {
    // from: https://github.com/mgp25/RAE-API/blob/master/src/HttpInterface.php
    $url = 'https://85.62.86.187/data/';
    $client = new Client();

    $response = $client->request(
      'GET',
      $url . 'fetch?'. http_build_query([ 'id' => $word->drae_id ]),
      [
        'headers'   =>
        [
          'User-Agent'    => 'Diccionario/2 CFNetwork/808.2.16 Darwin/16.3.0',
          'Authorization' => 'Basic cDY4MkpnaFMzOmFHZlVkQ2lFNDM0',
        ],
        'version'   => '2.0',
        'verify'    => false
      ],
    );

    $contents = $response->getBody()->getContents();

    try {
        $body = str_replace("\n", '', $contents);
        $body = str_replace("\t", '', $body);

        $body = self::getDefinitions(strip_tags($body));
        $defs = collect($body['definitions']);
        // obtiene una definicion aleatoria si tiene mas de 1 asepción
        //if ($defs->count() > 1) {
          //return $defs->random()['definition'];
        //}

        return array_key_exists('definition', $defs->first()) ? $defs->first()['definition'] : '';


    } catch (Exception $e) {
      \Log::info('Error:', $word);
      return '';
    }
  }

  public static function setWord(Palabra $word)
  {
    // from: https://github.com/mgp25/RAE-API/blob/master/src/HttpInterface.php
    $url = 'https://85.62.86.187/data/';
    $client = new Client();
    $response = $client->request(
      'GET',
      $url . 'search?'. http_build_query([ 'w' => $word->palabra ]),
      [
        'headers'   =>
        [
          'User-Agent'    => 'Diccionario/2 CFNetwork/808.2.16 Darwin/16.3.0',
          'Authorization' => 'Basic cDY4MkpnaFMzOmFHZlVkQ2lFNDM0',
        ],
        'version'   => '2.0',
        'verify'    => false
      ],
    );

    $contents = $response->getBody()->getContents();

    try {
      $body = str_replace("\n", '', $contents);
      $body = str_replace("\t", '', $body);
      $body = json_decode($body);

      if (count($body->res) > 0) {
        // word exist on drae
        $palabra = explode('<', $body->res[0]->header)[0];
        $id = $body->res[0]->id;

        if (Palabra::where('palabra', $palabra)->doesntExist()) {
          $word->palabra = $palabra;
          $word->drae_id = $id;
          $word->save();
        } else {
          $word->delete();
        }
      } else {
        $word->delete();
      }

    } catch (Exception $e) {
      \Log::info('Error:', $word);
    }
  }

  public static function getDefinitions($html)
    {
        $text = strip_tags($html);
        $text = str_replace('U.', '', $text);
        $text = str_replace(' c.', '', $text);
        $text = str_replace('Era u.', '', $text);
        $text = str_replace('p. us.', '', $text);
        $text = str_replace('desus.', '', $text);
        $text = str_replace('coloq.', '', $text);
        $text = str_replace('Esp.', '', $text);
        $text = str_replace('. y ', '.', $text);
        $text = str_replace('m.', '', $text);
        $text = str_replace(' prnl.', '', $text);
        $text = str_replace('f.', '', $text);
        $text = str_replace('t. repetida', '', $text);
        $text = str_replace(' interj.', 'interj.', $text);
        $text = Str::before($text, '.Conjugación de');
        $text = Str::after($text, '1.');

        $defs = [];
        for ($i = 2; $i < 7; $i++) {
          $after = Str::after($text, '.'.$i.'.');
          if ($after == $text) {
            $defs[] = Str::substr($text, 0, strlen($text) - 1);
            break;
          }
          $defs[] = Str::before($text, '.'.$i.'.');

          $text = $after;
        }

        $definitions = [];
        foreach ($defs as $def) {
            $data = explode('.', $def, 2);
            if (strlen(rtrim(ltrim($data[0])) > 2)) {
                if (count($data) > 1 && strlen(rtrim(ltrim($data[0]))) < 8) {
                    $definitions[] =
                      [
                        'type'       => rtrim(ltrim($data[0])),
                        'definition' => mb_convert_encoding(rtrim(ltrim($data[1])), 'UTF-8', 'HTML-ENTITIES')
                      ];
                } else {
                    $definitions[] =
                      [
                        'type'       => 'def',
                        'definition' => mb_convert_encoding(rtrim(ltrim($data[0])), 'UTF-8', 'HTML-ENTITIES')
                      ];
                }
            }
        }

        $body =
        [
            'definitions' => $definitions,
        ];

        return $body;
    }
}
