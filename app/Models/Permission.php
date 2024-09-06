<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Permission\Models\Permission as SpatieRole;

class Permission extends SpatieRole
{
    use HasFactory;

    public const CAN_ACCESS_TASK = 'can_access_task';

    public const CAN_CREATE_TASK = 'can_create_task';

    public const CAN_VIEW_ALL_TASK = 'can_view_all_task';

    public const CAN_VIEW_TASK = 'can_view_task';

    public const CAN_UPDATE_TASK = 'can_update_task';

    public const CAN_DELETE_TASK = 'can_delete_task';

    public const CAN_CHANGE_STATUS_TASK = 'can_change_status_task';

    public const CAN_ACCESS_CREATE_TASK = 'can_access_create_task';

    public const CAN_ACCESS_SHOW_TASK = 'can_access_show_task';

    public const CAN_ACCESS_EDIT_TASK = 'can_access_edit_task';

    public const ALL_PERMISSIONS = [
        self::CAN_ACCESS_TASK,
        self::CAN_CREATE_TASK,
        self::CAN_VIEW_TASK,
        self::CAN_VIEW_ALL_TASK,
        self::CAN_UPDATE_TASK,
        self::CAN_DELETE_TASK,
        self::CAN_CHANGE_STATUS_TASK,
        self::CAN_ACCESS_CREATE_TASK,
        self::CAN_ACCESS_SHOW_TASK,
        self::CAN_ACCESS_EDIT_TASK,
    ];

    public const ASSIGNEE_PERMISSIONS = [
        self::CAN_ACCESS_TASK,
        self::CAN_VIEW_TASK,
        self::CAN_CHANGE_STATUS_TASK,
        self::CAN_ACCESS_SHOW_TASK
    ];
}
