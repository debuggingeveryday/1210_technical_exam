<?php

declare(strict_types=1);

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $manager_role = Role::where(['name' => Role::MANAGER])->firstOrFail();
        $manager_role->givePermissionTo(Permission::ALL_PERMISSIONS);

        $manager_role = Role::where(['name' => Role::WORKER])->firstOrFail();
        $manager_role->givePermissionTo([
            Permission::CAN_ACCESS_TASK,
            Permission::CAN_VIEW_TASK,
            Permission::CAN_UPDATE_TASK,
            Permission::CAN_DELETE_TASK,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $manager_role = Role::where(['name' => Role::MANAGER])->firstOrFail();
        $manager_role->revokePermissionTo(Permission::ALL_PERMISSIONS);

        $manager_role = Role::where(['name' => Role::WORKER])->firstOrFail();
        $manager_role->revokePermissionTo([
            Permission::CAN_ACCESS_TASK,
            Permission::CAN_VIEW_TASK,
            Permission::CAN_UPDATE_TASK,
            Permission::CAN_DELETE_TASK,
        ]);
    }
};
