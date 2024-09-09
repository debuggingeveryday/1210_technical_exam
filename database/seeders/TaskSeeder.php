<?php

namespace Database\Seeders;

use App\Models\Images;
use App\Models\Task;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (App::environment('local')) {
            Task::factory()->create()->each(function ($task) {
                $rand_number = mt_rand(0, 5);
                Images::factory($rand_number)->create([
                    'task_id' => $task->id,
                ]);
            });
        }
    }
}
