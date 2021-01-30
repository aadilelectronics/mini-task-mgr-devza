import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // tslint:disable
  // ?-------------------------------------------------------------------------
  private headers = new HttpHeaders({ AuthToken: environment.authToken });
  private apiUrlPrefix = environment.apiUrlPrefix;

  // ?-------------------------------------------------------------------------
  constructor(private http: HttpClient) {}

  // ?-------------------------------------------------------------------------
  public getUsers(): Observable<User[]> {
    // prettier-ignore
    return this.http.get(`${this.apiUrlPrefix}listusers`, { headers: this.headers, observe: 'body' })
                    .pipe(
                      map((respGetUser: {status: string, users?: Array<User>, error?: string}) => {
                        if(respGetUser.status === 'success') {
                          const updatedArr = new Array(...respGetUser.users);
                          updatedArr.forEach(user => {
                            if(user.id) {
                              user.id = +user.id;
                            }
                          });
                          return updatedArr;
                        } else {
                          throwError(respGetUser.error);
                        }
                      })
                    );
  }

  // ?-------------------------------------------------------------------------
  public getTasks(): Observable<Task[]> {
    // prettier-ignore
    return this.http.get(`${this.apiUrlPrefix}list`, { headers: this.headers, observe: 'body' })
                    .pipe(
                      map((respGetTasks: {status: string, tasks?: Array<Task>, error?: string}) => {
                        if(respGetTasks.status === 'success') {
                          const updatedArr = new Array(...respGetTasks.tasks);
                          updatedArr.forEach(task => {
                            if(task.id) {
                              task.id = +task.id;
                              task.priority && (task.priority = +task.priority);
                              task.assigned_to && (task.assigned_to = +task.assigned_to);
                            }
                          });
                          return updatedArr;
                        } else {
                          throwError(respGetTasks.error);
                        }
                      })
                    );
  }

  // ?-------------------------------------------------------------------------
  public createTask(task: Task): Observable<Task> {
    const createReqBody = new FormData();
    createReqBody.append('message', task.message);
    task.due_date && createReqBody.append('due_date', task.due_date);
    task.priority && createReqBody.append('priority', task.priority.toString());
    task.assigned_to && createReqBody.append('assigned_to', task.assigned_to.toString());

    // prettier-ignore
    return this.http.post(`${this.apiUrlPrefix}create`, createReqBody, { headers: this.headers, observe: 'body' })
                    .pipe(
                      map((respCreateTask: {status: string, taskid?: number, error?: string}) => {
                        if(respCreateTask.status === 'success') {
                          const newTask = {...task};
                          newTask.id = +respCreateTask.taskid;
                          return newTask;
                        } else {
                          throwError(respCreateTask.error);
                        }
                      })
                    );
  }

  // ?-------------------------------------------------------------------------
  public updateTask(task: Task): Observable<Task> {
    const updateReqBody = new FormData();
    updateReqBody.append('taskid', task.id.toString());
    updateReqBody.append('message', task.message);
    task.due_date && updateReqBody.append('due_date', task.due_date);
    task.priority && updateReqBody.append('priority', task.priority.toString());
    task.assigned_to && updateReqBody.append('assigned_to', task.assigned_to.toString());

    // prettier-ignore
    return this.http.post(`${this.apiUrlPrefix}update`, updateReqBody, { headers: this.headers, observe: 'body' })
                    .pipe(
                      map((respUpdateTask: {status: string, taskid?: number, error?: string}) => {
                        if(respUpdateTask.status === 'success') {
                          return task;
                        } else {
                          throwError(respUpdateTask.error);
                        }
                      })
                    );
  }

  // ?-------------------------------------------------------------------------
  public deleteTask(taskid: number | string): Observable<number | string> {
    const deleteReqBody = new FormData();
    deleteReqBody.append('taskid', taskid.toString());

    // prettier-ignore
    return this.http.post(`${this.apiUrlPrefix}delete`, deleteReqBody, { headers: this.headers, observe: 'body' })
                    .pipe(
                      map((respDeleteTask: {status: string, message?: string, error?: string}) => {
                        if(respDeleteTask.status === 'success') {
                          return respDeleteTask.message;
                        } else {
                          throwError(respDeleteTask.error);
                        }
                      })
                    );
  }
}
