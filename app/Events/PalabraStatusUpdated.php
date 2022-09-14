<?php

namespace App\Events;

use App\Models\PalabraRosco;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;


class PalabraStatusUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $palabraRosco;

    public function __construct(PalabraRosco $palabraRosco)
    {
        $this->palabraRosco = $palabraRosco;
    }

    public function broadcastOn()
    {
        \Log::info([
          'broadcastOn' => $this->palabraRosco->rosco_id,
        ]);
        return new PrivateChannel(
            'roscos.'
            .$this->palabraRosco->rosco_id
        );
    }
}
