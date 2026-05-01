import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  task = { title: '', description: '', priority: 'Medium' };
  searchText: string = '';
  submitted = false;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  // Filter tasks based on search text
  get filteredTasks() {
    return this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Fetch all tasks from the backend
  getTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (res) => {
        this.tasks = res.data;
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
      }
    })
  }

  // Add a new task using form's data
  addTask() {
    this.submitted = true;
    if (!this.task.title.trim()) {
      return;
    }

    this.taskService.createTask(this.task as Task).subscribe({
      next: (res) => {
        console.log('Task created successfully:', res);
        this.getTasks();
        this.task = {
          title: '',
          description: '',
          priority: 'Medium'
        };
        this.submitted = false;
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    })
  }

  // Update the completion status of a task
  updateTaskStatus(id: string, completed: boolean) {
    this.taskService.updateTask(id, completed).subscribe({
      next: (res) => {
        console.log('Task updated successfully:', res);
        this.getTasks();
      },
      error: (error) => {
        console.error('Error updating task:', error);
      }
    })
  }

  // Delete a task by its ID
  deleteTask(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: (res) => {
          console.log('Task deleted successfully:', res);
          this.getTasks();
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        }
      })
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Low':
        return 'text-info';
      case 'Medium':
        return 'text-warning';
      case 'High':
        return 'text-danger fw-bold';
    }
    return 'text-secondary';
  }
}
