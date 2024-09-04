<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Images;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->query('limit') ?? 5;
        $filter_by_title = $request->query('filterByTitle') ?? '';
        $filter_by_created_user = $request->query('filterByCreatedUser') ?? '';
        $filter_by_assigned_user = $request->query('filterByAssignedUser') ?? '';
        $status = $request->query('status') ?? '';
        $sort_by = $request->query('sortBy');
        $order_by = $request->query('orderBy') ?? 'DESC';

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
            ->when($filter_by_created_user || $filter_by_assigned_user || $status, function ($query) use ($filter_by_assigned_user, $status, $filter_by_created_user) {
                $query
                    ->join('users as assigned_user', 'tasks.assigned_by_user_id', '=', 'assigned_user.id')
                    ->join('users as created_user_user', 'tasks.created_by_user_id', '=', 'created_user_user.id')
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
            ->paginate($limit);

        return Inertia::render('Task/Task', [
            'response' => $data,
        ]);
    }

    public function create()
    {
        return Inertia::render('Task/Create');
    }

    public function store(TaskRequest $request)
    {
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'status' => Task::TODO,
            'is_published' => false,
            'created_by_user_id' => $request->user()->id,
            // TODO: add assignee input
            'assigned_by_user_id' => 1,
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
        $image_path = collect($task->taskImages)->map(function ($image) {
            $image_path = "/tasks/image/$image->name.$image->extension";
            return $image_path;
        });

        return Inertia::render('Task/Show', [
            'task' => [
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
                'updated_at' => $task->updated_at
            ]
        ]);
    }

    public function edit(Task $task) {}

    public function update(Request $request, Task $task) {}

    public function destroy(Task $task) {}
}
