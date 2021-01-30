import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng-lts/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng-lts/dynamicdialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { TaskEntityService } from 'src/app/store/task-entity.service';
import { UserEntityService } from 'src/app/store/user-entity.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  // ?-------------------------------------------------------------------------
  public readonly priorities = [
    { label: 'Normal', value: 1 },
    { label: 'Medium', value: 2 },
    { label: 'High', value: 3 }
  ];

  taskFormGroup: FormGroup;
  users$: Observable<{ label: string; value: number }[]>;
  selectedItem;
  mode = 'create';
  loading = false;

  // ?-------------------------------------------------------------------------
  constructor(
    private userEntityService: UserEntityService,
    private taskEntityService: TaskEntityService,
    public dlgRef: DynamicDialogRef,
    public dlgConfig: DynamicDialogConfig,
    private messageService: MessageService
  ) {}

  // ?-------------------------------------------------------------------------
  ngOnInit(): void {
    this.users$ = this.userEntityService.entities$.pipe(
      map((userList) =>
        userList.map((usr) => {
          return { label: usr.name, value: usr.id };
        })
      )
    );
    const newTask: Task = {
      id: undefined,
      message: undefined,
      assigned_to: undefined,
      due_date: undefined,
      priority: undefined
    };

    this.mode = this.dlgConfig.data.mode;
    if (this.mode === 'edit') {
      Object.assign(newTask, this.dlgConfig.data.task);
    }

    this.taskFormGroup = new FormGroup({
      message: new FormControl(newTask.message, [Validators.required]),
      due_date: new FormControl(newTask.due_date),
      priority: new FormControl(newTask.priority),
      assigned_to: new FormControl(newTask.assigned_to)
    });
  }

  // ?-------------------------------------------------------------------------
  cancel(): void {
    this.dlgRef.close();
  }

  // ?-------------------------------------------------------------------------
  createTask(): void {
    const newTask: Task = { ...this.taskFormGroup.value };

    if (this.mode === 'edit') {
      newTask.id = this.dlgConfig.data.task.id;
    }

    let tmp: Observable<any>;
    if (newTask.assigned_to) {
      newTask.assigned_to = +newTask.assigned_to;
      tmp = this.userEntityService.entities$.pipe(
        map((users) => {
          const filtered = users.filter((usr) => usr.id === newTask.assigned_to);
          return filtered.length > 0 ? filtered[0] : { name: undefined };
        })
      );
    } else {
      tmp = of({ name: undefined });
    }

    tmp.subscribe((usr) => {
      if (usr.name) {
        newTask.assigned_name = usr.name;
      }
      this.loading = true;

      if (this.dlgConfig.data.mode === 'edit') {
        this.taskEntityService.update(newTask).subscribe(() => {
          this.messageService.clear();
          this.messageService.add({
            key: 'alerts',
            closable: false,
            sticky: false,
            summary: 'Success',
            detail: 'Task Updated Successfully',
            severity: 'success'
          });
          this.dlgRef.close();
        });
      } else {
        this.taskEntityService.add(newTask).subscribe(() => {
          this.messageService.clear();
          this.messageService.add({
            key: 'alerts',
            closable: false,
            sticky: false,
            summary: 'Success',
            detail: 'Task Added Successfully',
            severity: 'success'
          });
          this.dlgRef.close();
        });
      }
    });
  }
}
