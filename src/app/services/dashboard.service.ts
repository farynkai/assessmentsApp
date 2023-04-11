import { Injectable } from '@angular/core';
import { UserCredential, UserInfo } from '../interfaces/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Report } from '../interfaces/report';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${environment.url}api/userassessments`);
  }
}
