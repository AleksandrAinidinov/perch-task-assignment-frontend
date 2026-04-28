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
  task = { title: '', description: '' };

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

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

  addTask() {
    this.taskService.createTask(this.task as Task).subscribe({
      next: (res) => {
        console.log('Task created successfully:', res);
        this.getTasks();
        this.task = {
          title: '',
          description: ''
        };
      },
      error: (error) => {
        console.error('Error creating task:', error);
      }
    })
  }

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
}
