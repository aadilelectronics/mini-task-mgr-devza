import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from 'src/app/models/task.model';
import { TaskEntityService } from 'src/app/store/task-entity.service';

@Component({
  selector: 'app-task-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatisticsComponent {
  // ?-------------------------------------------------------------------------
  taskChartData$: Observable<any>;

  // ?-------------------------------------------------------------------------
  constructor(private taskService: TaskEntityService) {
    // prettier-ignore
    this.taskChartData$ = this.taskService.entities$
                          .pipe(
                            map((taskList: Task[]) => {
                              const chartData = {
                                labels: ['Normal', 'Medium', 'High', 'No Priority'],
                                datasets: [
                                  {
                                    data: [
                                      taskList.filter(task => task.priority === 1).length,
                                      taskList.filter(task => task.priority === 2).length,
                                      taskList.filter(task => task.priority === 3).length,
                                      taskList.filter(task => !task.priority).length
                                    ],
                                    backgroundColor: ['#32a852', '#a8a032', '#a84632', '#3287a9'],
                                    hoverBackgroundColor: ['#6ed489', '#d4cd6e', '#d47f6e', '#6eb7d4']
                                  }
                                ]
                              };
                              return chartData;
                            })
                          );
  }
}
