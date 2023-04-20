import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { UserCredential, UserInfo } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  login(credentials: UserCredential): Observable<UserInfo> {
    return this.httpClient.post<UserInfo>(`${environment.url}login`, credentials);
  }

  setUserInLocalStorage(user: UserInfo): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  navigateTo(path: string) {
    return this.router.navigate([path]);
  }

  getUserFromLocalStorage(): UserInfo {
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      return userData;
    }
    return {};
  }

  deleteUserFromLocalStorage(): void {
    localStorage.removeItem('userData');
  }
}
