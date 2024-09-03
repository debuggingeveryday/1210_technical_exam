<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    public const TODO = 'todo';
    public const IN_PROGRESS = 'in progress';
    public const DONE = 'done';
    public const ALL_STATUSES = [
        self::TODO,
        self::IN_PROGRESS,
        self::DONE
    ];
}
