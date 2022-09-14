<?php

namespace App\Events;

use App\Models\Rosco;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RoscoStart implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected $rosco;

    public function __construct(Rosco $rosco)
    {
        $this->rosco = $rosco;
    }

    public function broadcastWith()
    {
        return ['rosco' => $this->rosco];
    }

    public function broadcastOn()
    {
        return new PrivateChannel(
            'roscos.'
            .$this->rosco->id
        );
    }
}
