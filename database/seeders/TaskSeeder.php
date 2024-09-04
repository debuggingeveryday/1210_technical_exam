<?php

namespace Database\Seeders;

use App\Models\Images;
use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::factory()->create()->each(function ($task) {
            Images::factory()->create([
                'task_id' => $task->id,
            ]);
        });
    }
}
