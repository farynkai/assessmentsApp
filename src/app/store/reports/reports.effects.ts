import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { ToastService } from '../../services/toast.service';
import * as ReportsActions from './reports.actions'
import { ReportsService } from '../../services/reports.service';

@Injectable()
export class ReportsEffects {
  constructor(
    private actions$: Actions,
    private toastService: ToastService,
    private reportService: ReportsService
  ) {}

  getReportsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(ReportsActions.getReportsRequest),
    mergeMap(() => {
      return this.reportService.getReports().pipe(
        map((reports) => {
          return ReportsActions.setReportsSuccess( { reports });
        }),
        catchError((error) => {
          this.toastService.showError(error);
          return of(ReportsActions.setReportsFailure({ error }));
        })
      )
    })
  ));
}
