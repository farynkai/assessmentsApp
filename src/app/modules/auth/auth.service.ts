import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { UserCredential, UserInfo } from '../../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(credentials: UserCredential): Observable<UserInfo> {
    return this.httpClient.post<UserInfo>(`${environment.url}login`, credentials);
  }

  public setUserInLocalStorage(user: UserInfo): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  public getUserFromLocalStorage(): UserInfo {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      return JSON.parse(userDataStr);
    }
    return {};
  }

  public deleteUserFromLocalStorage(): void {
    localStorage.removeItem('userData');
    localStorage.removeItem('users');
  }
}
