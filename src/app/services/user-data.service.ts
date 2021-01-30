import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService extends DefaultDataService<User> {
  // ?-------------------------------------------------------------------------
  constructor(http: HttpClient, httpUrlGen: HttpUrlGenerator, private apiService: ApiService) {
    super('Users', http, httpUrlGen);
  }

  // ?-------------------------------------------------------------------------
  public getAll(): Observable<User[]> {
    return this.apiService.getUsers();
  }
}
