<?php

namespace App\Http\Requests;

use \App\Models\Tasklist;
use Illuminate\Foundation\Http\FormRequest;

class UpdateTasklistRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $tasklist = $this->route('tasklist');
        if($this->user()->id !== $tasklist->user_id){
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:1000',
            'description' => 'nullable|string',
            'deadline' => 'nullable|date',
            'status' => 'nullable|string',
            'user_id' => 'exists:users,id',
            'tasks' => 'array'
        ];
    }
}
