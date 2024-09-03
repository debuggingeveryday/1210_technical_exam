<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('Task/Task');
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
