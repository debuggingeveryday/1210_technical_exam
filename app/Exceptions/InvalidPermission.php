<?php

namespace App\Exceptions;

use Exception;

class InvalidPermission extends Exception
{
    public $user_permissions;

    public $permissions;

    public $is_active;

    public function __construct(array $user_permissions, array $permissions, bool $is_active)
    {
        $this->user_permissions = $user_permissions;
        $this->permissions = $permissions;
        $this->is_active = $is_active;
    }

    public function context(): array
    {
        return [
            'user_permissions' => $this->user_permissions,
            'permissions' => $this->permissions,
            'is_active' => $this->is_active,
        ];
    }
}
