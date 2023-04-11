import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { UserCredential, UserInfo } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  login(credentials: UserCredential): Observable<UserInfo> {
    return this.httpClient.post<UserInfo>(`${environment.url}api/login`, credentials);
  }
}
