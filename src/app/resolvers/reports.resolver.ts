import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Report } from '../interfaces/report';
import { ReportsService } from '../services/reports.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsResolver implements Resolve<Report[]> {
  constructor(private reportsService: ReportsService) {}
  resolve(): Observable<Report[]> {
    return this.reportsService.getReports();
  }
}
