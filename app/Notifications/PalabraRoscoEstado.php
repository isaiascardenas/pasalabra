<?php

namespace App\Notifications;

use App\Models\PalabraRosco;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class PalabraRoscoEstado extends Notification
{
    use Queueable;

    protected $palabraRosco;

    public function __construct(PalabraRosco $palabraRosco)
    {
        $this->palabraRosco = $palabraRosco;
    }

    public function via($notifiable)
    {
        return ['broadcast'];
        //return ['database', 'broadcast'];
    }

    public function toArray($notifiable)
    {
        return [
            'prueba' => 'esta es una prueba',
        ];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }

    public function broadcastType()
    {
        return 'palabrarosco.estado';
    }
}
