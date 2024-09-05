<?php

namespace App\Http\Controllers;

use App\ACL\ACL;
use App\Http\Requests\TaskRequest;
use App\Http\Requests\TaskUpdateStatusRequest;
use App\Models\Images;
use App\Models\Permission;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Role;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        ACL::allowOnly([Permission::CAN_ACCESS_TASK]);

        $limit = $request->query('limit') ?? 5;
        $filter_by_title = $request->query('filterByTitle') ?? '';
        $filter_by_created_user = $request->query('filterByCreatedUser') ?? '';
        $filter_by_assigned_user = $request->query('filterByAssignedUser') ?? '';
        $publish = $request->query('publish') ?? '';
        $status = $request->query('status') ?? '';
        $sort_by = $request->query('sortBy') ?? 'created_at';
        $order_by = $request->query('orderBy') ?? 'DESC';

        $is_published = $publish === 'published' ? true : false;

        $data = Task::select(
            'tasks.id',
            'tasks.title',
            'tasks.status',
            'tasks.description',
            'tasks.is_published',
            'tasks.created_at',
            'tasks.updated_at',
            'tasks.created_by_user_id',
            'tasks.assigned_by_user_id',
        )
            ->with(['createdByUserId', 'assignedByUserId'])
            ->when($filter_by_title, fn ($query) => $query->where('title', 'LIKE', "%{$filter_by_title}%"))
            ->when($filter_by_created_user || $filter_by_assigned_user || $status, function ($query) use ($is_published, $filter_by_assigned_user, $status, $filter_by_created_user) {
                $query
                    ->join('users as assigned_user', 'tasks.assigned_by_user_id', '=', 'assigned_user.id')
                    ->join('users as created_user_user', 'tasks.created_by_user_id', '=', 'created_user_user.id')
                    ->where('tasks.is_published', 'LIKE', "%{$is_published}%")
                    ->where('tasks.status', 'LIKE', "%{$status}%")
                    ->where('assigned_user.name', 'LIKE', "%{$filter_by_assigned_user}%")
                    ->where('created_user_user.name', 'LIKE', "%{$filter_by_created_user}%");

                $query
                    ->join('users as assigned_user', 'tasks.assigned_by_user_id', '=', 'assigned_user.id')
                    ->join('users as created_user_user', 'tasks.created_by_user_id', '=', 'created_user_user.id')
                    ->where('assigned_user.id', '=', auth()->user()->id)
                    ->where('tasks.is_published', 'LIKE', "%{$is_published}%")
                    ->where('tasks.status', 'LIKE', "%{$status}%")
                    ->where('assigned_user.name', 'LIKE', "%{$filter_by_assigned_user}%")
                    ->where('created_user_user.name', 'LIKE', "%{$filter_by_created_user}%");
            })
            ->when($sort_by === 'assigned_by_user_id', function ($query) use ($order_by) {
                $query
                    ->join('users', 'tasks.assigned_by_user_id', '=', 'users.id')
                    ->orderBy('users.name', $order_by);
            })
            ->when($sort_by === 'created_by_user_id', function ($query) use ($order_by) {
                $query
                    ->join('users', 'tasks.created_by_user_id', '=', 'users.id')
                    ->orderBy('users.name', $order_by);
            })
            ->when($sort_by, fn ($query) => $query->orderBy($sort_by, $order_by))
            ->where(function ($query) {
                $can_view_all_task = auth()->user()->can(Permission::CAN_VIEW_ALL_TASK);

                if (! $can_view_all_task) {
                    $query
                        ->join('users as assigned_user', 'tasks.assigned_by_user_id', '=', 'assigned_user.id')
                        ->join('users as created_user_user', 'tasks.created_by_user_id', '=', 'created_user_user.id')
                        ->where('tasks.assigned_by_user_id', '=', auth()->user()->id);
                }
            })
            ->where(function($query) {
                $can_publish = auth()->user()->hasRole([Role::MANAGER, Role::ADMINISTRATOR]);

                if (! $can_publish) $query->where('is_published', 1);
            })
            ->paginate($limit);

        $users = User::select('id', 'name')->get()->map(function ($user) {
            return [
                'label' => $user->name,
                'value' => $user->id,
            ];
        });

        return Inertia::render('Task/Task', [
            'response' => $data,
            'users' => $users,
        ]);
    }

    public function create()
    {
        ACL::allowOnly([Permission::CAN_ACCESS_CREATE_TASK]);

        $users = User::select('id', 'name')->get()->map(function ($user) {
            return [
                'label' => $user->name,
                'value' => $user->id,
            ];
        });

        return Inertia::render('Task/Create', [
            'users' => $users,
        ]);
    }

    public function store(TaskRequest $request)
    {
        ACL::allowOnly([Permission::CAN_CREATE_TASK]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => Task::TODO,
            'is_published' => $request->isPublish,
            'created_by_user_id' => $request->user()->id,
            'assigned_by_user_id' => $request->assignTo,
        ]);

        $images = collect($request->images)->map(function ($image) use ($task) {
            [$file_name, $extension] = explode('.', $image->hashName());

            Storage::disk('task_images')->put("$file_name.$extension", file_get_contents($image));

            return [
                'name' => $file_name,
                'extension' => $extension,
                'task_id' => $task->id,
            ];
        });

        Images::insert($images->toArray());

        return to_route('task.index');
    }

    public function show(Task $task)
    {
        ACL::allowOnly([Permission::CAN_ACCESS_SHOW_TASK]);

        $image_path = collect($task->taskImages)->map(function ($image) {
            $image_path = "/tasks/image/$image->name.$image->extension";

            return $image_path;
        });

        return Inertia::render('Task/Show', [
            'task' => [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'status' => $task->status,
                // TODO: create cast
                'is_published' => $task->is_published ? 'Yes' : 'No',
                'created_by' => $task->createdByUserId->name,
                'assigned_by' => $task->assignedByUserId->name,
                'images' => $image_path,
                // TODO: create cast
                'created_at' => $task->created_at,
                'updated_at' => $task->updated_at,
            ],
        ]);
    }

    public function update_status(TaskUpdateStatusRequest $request, Task $task)
    {
        ACL::allowOnly([Permission::CAN_CHANGE_STATUS_TASK]);

        $task->update(['status' => $request->status]);
    }

    public function edit(Task $task)
    {
        ACL::allowOnly([Permission::CAN_ACCESS_EDIT_TASK]);

        $users = User::select('id', 'name')->get()->map(function ($user) {
            return [
                'label' => $user->name,
                'value' => $user->id,
            ];
        });

        $image_path = collect($task->taskImages)->map(function ($image) {
            $image_path = "/tasks/image/$image->name.$image->extension";

            return [
                'id' => $image->id,
                'name' => $image->name,
                'extension' => $image->extension,
                'image_path' => $image_path,
            ];
        });

        return Inertia::render('Task/Edit', [
            'users' => $users,
            'task' => [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'status' => $task->status,
                // TODO: create cast
                'is_published' => $task->is_published ? 'Yes' : 'No',
                'created_by' => $task->createdByUserId->name,
                'assigned_to' => $task->assignedByUserId->only('id', 'name'),
                'task_images' => $image_path,
                // TODO: create cast
                'created_at' => $task->created_at,
                'updated_at' => $task->updated_at,
            ],
        ]);
    }

    public function update(Request $request, Task $task)
    {
        ACL::allowOnly([Permission::CAN_UPDATE_TASK]);

        $updateRequest = [
            ...$request->only('title', 'description'),
            'assigned_by_user_id' => $request->assignTo,
            'is_published' => $request->isPublish,
        ];

        $task->update($updateRequest);

        return to_route('task.index');
    }

    public function destroy(Task $task)
    {
        ACL::allowOnly([Permission::CAN_DELETE_TASK]);

        $task->delete();

        return to_route('task.index');
    }
}
