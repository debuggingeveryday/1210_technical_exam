<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->word,
            'description' => fake()->paragraph(),
            'is_published' => fake()->boolean(),
            'status' => fake()->randomElement(Task::ALL_STATUSES),
            'created_by_user_id' => User::factory(),
            'assigned_by_user_id' => User::factory(),
        ];
    }
}
