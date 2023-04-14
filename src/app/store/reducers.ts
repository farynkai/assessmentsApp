import { ActionReducerMap } from '@ngrx/store';

import { reportsFeatureKey, ReportsReducer } from './reports/reports.reducers';
import { authFeatureKey, AuthReducer } from './auth/auth.reducers';
import { LoadingSpinnerReducer, spinnerFeatureKey } from './loading-spinner/loading-spinner.reducers';

export interface AppState {
  [authFeatureKey]: any;
  [reportsFeatureKey]: any;
  [spinnerFeatureKey]: any;
}

export const reducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: AuthReducer,
  [reportsFeatureKey]: ReportsReducer,
  [spinnerFeatureKey]: LoadingSpinnerReducer
};
