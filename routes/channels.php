<?php

use App\Models\PalabraRosco;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('roscos.{roscoId}', function ($user, $roscoId) {
    return true;
});

Broadcast::channel('private-roscos.{roscoId}', function ($roscoId) {
    return true;
});

Broadcast::channel('App.Models.Rosco.{id}', function ($rosco, $id) {
    return (int) $rosco->id === (int) $id;
});
