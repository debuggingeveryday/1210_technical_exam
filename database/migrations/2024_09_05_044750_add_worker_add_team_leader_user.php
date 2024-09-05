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
        $manager = User::create([
            'name' => 'Manager manager',
            'email' => 'manager@system.com',
            'email_verified_at' => now(),
            'is_active' => true,
            'password' => Hash::make('manager12345'),
            'remember_token' => Str::random(10),
        ]);

        $manager->assignRole(Role::MANAGER);
        $manager->givePermissionTo(Permission::ALL_PERMISSIONS);

        $assignee = User::create([
            'name' => 'Assignee assignee',
            'email' => 'assignee@system.com',
            'email_verified_at' => now(),
            'is_active' => true,
            'password' => Hash::make('assignee12345'),
            'remember_token' => Str::random(10),
        ]);

        $assignee->assignRole(Role::ASSIGNEE);
        $assignee->givePermissionTo(Permission::ASSIGNEE_PERMISSIONS);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        User::where('email', 'manager@system.com')->forceDelete();
        User::where('email', 'worker@system.com')->forceDelete();
    }
};
