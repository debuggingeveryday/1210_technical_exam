<?php

declare(strict_types=1);

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Role;
use App\Models\Permission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach (Role::ALL_ROLES as $role_name) {
            Role::create(['name' => $role_name]);
        }

        foreach (Permission::ALL_PERMISSIONS as $permission_name) {
            Permission::create(['name' => $permission_name]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach (Role::ALL_ROLES as $role_name) {
            Role::where(['name' => $role_name])->delete();
        }

        foreach (Permission::ALL_PERMISSIONS as $permission_name) {
            Permission::where(['name' => $permission_name])->delete();
        }
    }
};
