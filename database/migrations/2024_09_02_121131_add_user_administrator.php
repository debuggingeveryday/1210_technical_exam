<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        User::create([
            'id' => User::ADMINISTRATOR_ID,
            'name' => 'Admin User',
            'email' => 'admin@system.com',
            'email_verified_at' => now(),
            'password' => Hash::make('admin12345'),
            'remember_token' => Str::random(10)
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        User::findOrFail(User::ADMINISTRATOR_ID)->delete();
    }
};
