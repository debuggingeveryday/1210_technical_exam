<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission as SpatieRole;

class Permission extends SpatieRole
{
    use HasFactory;

    public const CAN_ACCESS_TASK = "can_access_task";
    public const CAN_CREATE_TASK = "can_create_task";
    public const CAN_VIEW_TASK = "can_view_task";
    public const CAN_UPDATE_TASK = "can_update_task";
    public const CAN_DELETE_TASK = "can_delete_task";

    public const ALL_PERMISSIONS = [
        self::CAN_ACCESS_TASK,
        self::CAN_CREATE_TASK,
        self::CAN_VIEW_TASK,
        self::CAN_UPDATE_TASK,
        self::CAN_DELETE_TASK
    ];
}
