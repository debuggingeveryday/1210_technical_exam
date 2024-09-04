<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'is_published',
        'created_by_user_id',
        'assigned_by_user_id',
    ];

    public const TODO = 'todo';

    public const IN_PROGRESS = 'in_progress';

    public const DONE = 'done';

    public const ALL_STATUSES = [
        self::TODO,
        self::IN_PROGRESS,
        self::DONE,
    ];

    public const PUBLISHED = 'published';

    public const DRAFT = 'draft';

    public function createdByUserId(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by_user_id');
    }

    public function assignedByUserId(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_by_user_id');
    }

    public function taskImages(): HasMany
    {
        return $this->HasMany(Images::class);
    }
}
