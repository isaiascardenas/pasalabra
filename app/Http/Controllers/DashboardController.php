<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function rosco()
    {
      return inertia()->render('Games/Rosco', []);
    }

    public function memoria()
    {
      return inertia()->render('Games/Memoria', []);
    }
}
