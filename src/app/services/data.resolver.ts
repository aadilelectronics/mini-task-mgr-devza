import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { TaskEntityService } from '../store/task-entity.service';
import { UserEntityService } from '../store/user-entity.service';

@Injectable({
  providedIn: 'root'
})
export class DataResolver implements Resolve<boolean> {
  constructor(private userEntityService: UserEntityService, private taskEntityService: TaskEntityService) {}

  // ?------------------------------------------------------------------------------------
  resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
    // prettier-ignore
    return this.userEntityService.getAll()
                .pipe(
                  mergeMap(users => this.taskEntityService.getAll()),
                  map(tasks => true)
                );
  }
}
