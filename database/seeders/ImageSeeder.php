<?php

namespace Database\Seeders;

use App\Models\Images;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (App::environment('local')) {
            Images::factory()->create();
        }
    }
}
