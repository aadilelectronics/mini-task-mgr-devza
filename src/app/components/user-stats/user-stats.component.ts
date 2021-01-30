import { Component, Input, OnInit } from '@angular/core';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { map, switchAll, switchMap, tap } from 'rxjs/operators';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { TaskEntityService } from 'src/app/store/task-entity.service';
import { UserEntityService } from 'src/app/store/user-entity.service';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.scss']
})
export class UserStatisticsComponent implements OnInit {
  // ?-------------------------------------------------------------------------
  userData$: Observable<{ picture: string; name: string; taskCount: number }[]>;

  // ?-------------------------------------------------------------------------
  constructor(private userEntityService: UserEntityService, private taskEntityService: TaskEntityService) {}

  // ?-------------------------------------------------------------------------
  ngOnInit(): void {
    console.log('I am here');
    // prettier-ignore
    this.userData$ = combineLatest([this.userEntityService.entities$, this.taskEntityService.entities$])
                      .pipe(
                        map(([users, tasks]) => {
                          const usrDataArr = [];
                          users.forEach( user => {
                            const usrData = {
                              picture: user.picture,
                              name: user.name,
                              taskCount: tasks.filter(task => task.assigned_to === user.id).length
                            };
                            usrDataArr.push(usrData);
                          });
                          return usrDataArr;
                          console.log(usrDataArr);
                        })
                      );
  }
}
