import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, EntityActionOptions, HttpUrlGenerator } from '@ngrx/data';
import { Task } from '../models/task.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Update } from '@ngrx/entity';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskDataService extends DefaultDataService<Task> {
  // ?-------------------------------------------------------------------------
  constructor(http: HttpClient, httpUrlGen: HttpUrlGenerator, private apiService: ApiService) {
    super('Tasks', http, httpUrlGen);
  }

  // ?-------------------------------------------------------------------------
  getAll(): Observable<Task[]> {
    return this.apiService.getTasks();
  }

  // ?-------------------------------------------------------------------------
  add(task: Task, options?: EntityActionOptions): Observable<Task> {
    return this.apiService.createTask(task);
  }

  // ?-------------------------------------------------------------------------
  update(task: Update<Task>, options?: EntityActionOptions): Observable<Task> {
    return this.apiService.updateTask(task.changes as Task);
  }

  // ?-------------------------------------------------------------------------
  delete(taskid: number | string): Observable<number | string> {
    return this.apiService.deleteTask(taskid).pipe(map((value) => taskid));
  }
}
