<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TasklistTask extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'status', 'tasklist_id'];

    public function tasklist()
    {
        return $this->belongsTo(Tasklist::class);
    }
}
