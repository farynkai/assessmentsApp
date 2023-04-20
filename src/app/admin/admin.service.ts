import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  updatedData = new Subject();
  newUser = new Subject();
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.url}users`);
  }
}
