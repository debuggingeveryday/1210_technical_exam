<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory;

    public const ADMINISTRATOR = 'administrator';

    public const MANAGER = 'manager';

    public const ASSIGNEE = 'assignee';

    public const ALL_ROLES = [
        self::ADMINISTRATOR,
        self::MANAGER,
        self::ASSIGNEE,
    ];
}
