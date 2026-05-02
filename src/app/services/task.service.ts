import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    private baseUrl = '/v1/tasks';

    constructor(private http: HttpClient) { }

    // GET /tasks
    getAllTasks() {
        return this.http.get<{ data: Task[] }>(this.baseUrl);
    }

    // POST /tasks
    createTask(task: Task) {
        return this.http.post<{ data: Task }>(this.baseUrl, task);
    }

    // PATCH /tasks/:id
    updateTask(id: string, completed: boolean) {
        return this.http.patch<{ data: Task }>(`${this.baseUrl}/${id}`, { completed });
    }

    // DELETE /tasks/:id
    deleteTask(id: string) {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    // DELETE /tasks/completed
    deleteAllCompletedTasks() {
        return this.http.delete<void>(`${this.baseUrl}/completed`);
    }
}