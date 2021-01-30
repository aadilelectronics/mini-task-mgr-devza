import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogService } from 'primeng-lts/dynamicdialog';
import { Task } from 'src/app/models/task.model';
import { TaskEntityService } from 'src/app/store/task-entity.service';
import { TaskComponent } from '../task/task.component';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { Table } from 'primeng-lts/table';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent {
  // ?-------------------------------------------------------------------------
  public readonly priorities = [
    { label: 'Normal', value: 1 },
    { label: 'Medium', value: 2 },
    { label: 'High', value: 3 }
  ];

  selectedPriority: number;
  selectedDate: string;
  tasks$: Observable<Task[]>;
  draggingPriority: number;
  draggingTask: Task;

  @ViewChild('priorityOverlay')
  priorityOverlay: OverlayPanel;

  @ViewChild('taskTable')
  taskTable: Table;

  // ?-------------------------------------------------------------------------
  constructor(
    private taskService: TaskEntityService,
    private dialogService: DialogService,
    private confirmService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.tasks$ = this.taskService.entities$.pipe(
      map((allTasks) => {
        if (this.selectedPriority) {
          return allTasks.filter((eachTask) => eachTask.priority === this.selectedPriority);
        } else {
          return allTasks;
        }
      }),
      map((remTasks) => {
        if (this.selectedDate) {
          return remTasks.filter((eachTask) => eachTask.due_date.startsWith(this.selectedDate));
        } else {
          return remTasks;
        }
      })
    );
  }

  // ?-------------------------------------------------------------------------
  createNewTask(): void {
    this.dialogService.open(TaskComponent, {
      data: { mode: 'create' },
      header: 'Create Task',
      width: '80vw',
      modal: true,
      style: { 'max-width': '40rem' }
    });
  }

  // ?-------------------------------------------------------------------------
  editTask(task: Task): void {
    this.dialogService.open(TaskComponent, {
      data: { mode: 'edit', task },
      header: 'Edit Task',
      width: '80vw',
      modal: true,
      style: { 'max-width': '40rem' }
    });
  }

  // ?-------------------------------------------------------------------------
  dragStart(event: any, task: Task): void {
    this.draggingPriority = task.priority;
    this.draggingTask = task;
    this.priorityOverlay.show(event);
  }

  // ?-------------------------------------------------------------------------
  dragEnd(): void {
    this.draggingPriority = undefined;
    this.draggingTask = undefined;
    this.priorityOverlay.hide();
    console.log('This is dragEnd');
  }

  // ?-------------------------------------------------------------------------
  deleteTask(id: number | string): void {
    this.confirmService.confirm({
      message: `Do you want to delete the task?`,
      header: 'Delete Confirmation!',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.taskService.delete(id).subscribe(() => {
          this.messageService.clear();
          this.messageService.add({
            key: 'alerts',
            closable: false,
            sticky: false,
            summary: 'Success',
            detail: 'Task Deleted Successfully',
            severity: 'success'
          });
        });
      },
      reject: () => {}
    });
  }

  // ?-------------------------------------------------------------------------
  priorityChanged(value: number): void {
    console.log('This is priorityChanged');
    const newTask: Task = { ...this.draggingTask };
    newTask.priority = value;
    this.taskService.update(newTask, { isOptimistic: false }).subscribe(() => {
      this.messageService.clear();
      this.messageService.add({
        key: 'alerts',
        closable: false,
        sticky: false,
        summary: 'Success',
        detail: 'Task Priority Updated Successfully',
        severity: 'success'
      });
    });
  }
}
