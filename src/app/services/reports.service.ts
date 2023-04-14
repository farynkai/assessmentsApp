import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Report } from '../interfaces/report';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private httpClient: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.httpClient.get<Report[]>(`${environment.url}userassessments`);
  }
}
