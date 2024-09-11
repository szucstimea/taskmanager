<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasklist extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'title', 
        'description', 
        'deadline', 
        'status',
    ];

    public function tasks()
    {
        return $this->hasMany(TasklistTask::class);
    }
}
