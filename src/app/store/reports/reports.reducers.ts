import { Action, createReducer, on } from '@ngrx/store';

import { setReportsSuccess, setReportsFailure, setReports } from './reports.actions';
import { ReportsState } from '../../interfaces/state';

export const initialState: ReportsState = {
  reportsList: []
}

export const reportsFeatureKey = 'reports';

const reportsReducer = createReducer(
  initialState,
  on(setReportsSuccess, (state, { reports }) => {
    return {
      ...state,
      reportsList: reports,
    }
  }),
  on(setReports, (state, { reports }) => {
    return {
      ...state,
      reportsList: reports,
    }
  }),
  on(setReportsFailure, (state, { error }) => {
    return {
      ...state,
      reportsList: [],
      reportsError: error.message
    }
  })
);

export function ReportsReducer(state: ReportsState, action: Action) {
  return reportsReducer(state, action);
}
