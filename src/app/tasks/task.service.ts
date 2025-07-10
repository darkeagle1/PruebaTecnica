import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Task, TaskListResponse } from './task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = environment.apiUrl + '/tasks';

  constructor(private http: HttpClient) {}

  getTasks(page: number, pageSize: number): Observable<TaskListResponse> {
    return this.http.get<TaskListResponse>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }

  createTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
