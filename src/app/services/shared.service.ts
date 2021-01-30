import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // ?-------------------------------------------------------------------------
  private tSub1$$ = new Subject<Task>();

  public taskEvent$ = this.tSub1$$.asObservable();

  // ?-------------------------------------------------------------------------
  public openNewTaskDialog(): void {
    this.tSub1$$.next(null);
  }

  // ?-------------------------------------------------------------------------
  public openEditTaskDialog(task: Task): void {
    this.tSub1$$.next(task);
  }
}
