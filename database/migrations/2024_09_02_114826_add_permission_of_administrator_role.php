<?php

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
