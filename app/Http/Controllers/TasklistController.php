<?php

namespace App\Http\Controllers;

use App\Models\Tasklist;
use App\Models\TasklistTask;
use App\Http\Requests\StoreTasklistRequest;
use App\Http\Requests\UpdateTasklistRequest;
use Illuminate\Http\Request;
use App\Http\Resources\TasklistResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Arr;

class TasklistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return TasklistResource::collection(Tasklist::where('user_id', $user->id)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTasklistRequest $request)
    {
        $data = $request->validated();

        $tasklist = Tasklist::create($data);

        foreach($data['tasks'] as $task){
            $task['tasklist_id'] = $tasklist->id;
            $this->createTask($task);
        }

        return new TasklistResource($tasklist);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tasklist $tasklist, Request $request)
    {
        $user = $request->user();
        if($user->id !== $tasklist->user_id){
            return abort(403, 'Unauthorized action.');
        }
        return new TasklistResource($tasklist);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTasklistRequest $request, Tasklist $tasklist)
    {
        $data = $request->validated();

        $tasklist->update($data);

        //get ids of existing tasks
        //pluck get the collection of ids
        $existingIds = $tasklist->tasks()->pluck('id')->toArray();
        //get ids of new tasks
        $newIds = Arr::pluck($data['tasks'], 'id');
        //find tasks to delete
        $toDelete = array_diff($existingIds, $newIds);
        //find tasks to add
        $toAdd = array_diff( $newIds, $existingIds);
        //delete tasks by $toDelete array
        TasklistTask::destroy($toDelete);
        //create new tasks
        foreach($data['tasks'] as $task){
            if(in_array($task['id'], $toAdd)){
                $task['tasklist_id'] = $tasklist->id;
                $this->createTask($task);
            }
        }
        //update existing tasks
        $taskMap = collect($data['tasks'])->keyBy('id');
        foreach($tasklist->tasks as $task){
            if(isset($taskMap[$task->id])){
                $this->updateTask($task, $taskMap[$task->id]);
            }
        }
        
        return new TasklistResource($tasklist);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tasklist $tasklist, Request $request)
    {
        $user = $request->user();
        if($user->id !== $tasklist->user_id){
            return abort(403, 'Unauthorized action.');
        }

        $tasklist->delete();
        return response('',204);
    }

    private function createTask($data){
        $validator = Validator::make($data,[
            'title' => 'required|string',
            'status' => 'nullable|string',
            'tasklist_id' => 'exists:App\Models\Tasklist,id'
        ]);

        return TasklistTask::create($validator->validated());
    }

    private function updateTask(TasklistTask $task, $data){

        $validator = Validator::make($data, [
            'id' => 'exists:App\Models\TasklistTask,id',
            'title' => 'required|string',
            'status' => 'nullable|string'
        ]);

        return $task->update($validator->validated());
    }
}
