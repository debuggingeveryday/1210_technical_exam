<?php

namespace App\ACL;

use App\Exceptions\InvalidPermission;
use Illuminate\Support\Facades\Auth;

class ACL
{
    public static function allowAny(array $permissions = []): void
    {
        $user_permissions = auth()->user()->permissions->pluck('name');
        $is_active = auth()->user()->is_active;
        $is_ok = $user_permissions->contains(fn ($permission) => in_array($permission, $permissions));

        if (! $is_ok || ! Auth::check() || $is_active === 0) {
            throw new InvalidPermission($user_permissions->toArray(), $permissions, $is_active);
        }
    }

    public static function allowOnly(array $permissions = []): void
    {
        $is_active = auth()->user()->is_active;
        $user_permissions = auth()->user()->permissions->pluck('name');

        $is_ok = collect($permissions)->every(function ($permission) use ($user_permissions) {
            return $user_permissions->contains($permission);
        });

        if (! $is_ok || ! Auth::check() || ! $is_active) {
            throw new InvalidPermission($user_permissions->toArray(), $permissions, $is_active);
        }
    }
}
