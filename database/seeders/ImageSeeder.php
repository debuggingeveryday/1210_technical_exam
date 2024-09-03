<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Images;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Images::factory()->create();
    }
}
