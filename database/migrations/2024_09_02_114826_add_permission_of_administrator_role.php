<?php

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
        $administrator_role = Role::where(['name' => Role::ADMINISTRATOR])->firstOrFail();
        $administrator_role->givePermissionTo(Permission::ALL_PERMISSIONS);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $administrator_role = Role::where(['name' => Role::ADMINISTRATOR])->firstOrFail();
        $administrator_role->revokePermissionTo(Permission::ALL_PERMISSIONS);
    }
};
