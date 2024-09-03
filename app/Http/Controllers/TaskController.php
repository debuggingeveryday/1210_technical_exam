<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $limit = $request->query('limit') ?? 5;
        $filter_by_title = $request->query('filterByTitle') ?? '';
        $filter_by_created_user = $request->query('filterByCreatedUser') ?? '';
        $filter_by_assigned_user = $request->query('filterByAssignedUser') ?? '';
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
            ->when($filter_by_created_user || $filter_by_assigned_user, function ($query) use ($filter_by_assigned_user, $filter_by_created_user) {
                $query
                    ->join('users as assigned_user', 'tasks.assigned_by_user_id', '=', 'assigned_user.id')
                    ->join('users as created_user_user', 'tasks.created_by_user_id', '=', 'created_user_user.id')
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
            'response' => $data
        ]);
    }

    public function create()
    {
        return Inertia::render('Task/Create');
    }

    public function store(Request $request)
    {
        
    }

    public function show(Task $task)
    {
        return Inertia::render('Task/Show');
    }

    public function edit(Task $task)
    {
        
    }

    public function update(Request $request, Task $task)
    {
        
    }

    public function destroy(Task $task)
    {
        
    }
}
