import { createFeatureSelector, createSelector } from '@ngrx/store';

import { reportsFeatureKey } from './reports.reducers';
import { ReportsState } from '../../interfaces/state';

export const selectDataTableState = createFeatureSelector<ReportsState>(reportsFeatureKey);

export const selectReports = createSelector(
  selectDataTableState,
  (state: ReportsState) => state.reportsList
);


