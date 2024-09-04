<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Images>
 */
class ImagesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $image = fake()->image(null, 360, 360, 'animals', true);
        [$image_path, $extension] = explode('.', $image);
        $image_name = str_replace('/tmp/', '', $image_path);

        return [
            'name' => $image_name,
            'extension' => $extension,
            'task_id' => null,
        ];
    }
}
