import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { selectReports } from '../../store/reports/reports.selectors';
import { setReports } from '../../store/reports/reports.actions';
import { selectUserName } from '../../store/auth/auth.selectors';
import { UnsubscriberComponent } from '../unsubscriber/unsubscriber.component';
import { ReportsState } from '../../interfaces/state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends UnsubscriberComponent implements OnInit {
  userName$ = this.store.select(selectUserName);
  reports$ = this.store.select(selectReports);
  constructor(
    private store: Store<ReportsState>,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }
  ngOnInit() {
    this.activatedRoute.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      this.store.dispatch(setReports({ reports: data['reports'] }));
    });
  }
}
