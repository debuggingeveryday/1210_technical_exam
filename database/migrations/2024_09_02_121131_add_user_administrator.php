<?php

declare(strict_types=1);

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $admin_user = User::create([
            'id' => User::ADMINISTRATOR_ID,
            'name' => 'Admin User',
            'email' => 'admin@system.com',
            'email_verified_at' => now(),
            'is_active' => true,
            'password' => Hash::make('admin12345'),
            'remember_token' => Str::random(10),
        ]);

        $admin_user->assignRole(Role::ADMINISTRATOR);
        $admin_user->givePermissionTo(Permission::ALL_PERMISSIONS);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        User::findOrFail(User::ADMINISTRATOR_ID)->delete();
    }
};
