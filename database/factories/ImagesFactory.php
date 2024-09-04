<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

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
        Storage::disk('task_images')->put("$image_name.$extension", file_get_contents($image));

        return [
            'name' => $image_name,
            'extension' => $extension,
            'task_id' => null,
        ];
    }
}
