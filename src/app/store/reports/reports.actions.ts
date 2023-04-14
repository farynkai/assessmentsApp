import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Report } from '../../interfaces/report';

export const getReportsRequest = createAction('[Reports] Get Reports Request');
export const setReports = createAction('[Reports] Set Reports', props<{ reports: Report[] }>());
export const setReportsSuccess = createAction('[Reports] Set Reports Success', props<{ reports: Report[] }>());
export const setReportsFailure = createAction('[Reports] Set Reports Failure', props<{ error: HttpErrorResponse }>());
