import { ActionReducerMap } from '@ngrx/store';

import { authFeatureKey, AuthReducer } from './auth/auth.reducers';
import { LoadingSpinnerReducer, spinnerFeatureKey } from './loading-spinner/loading-spinner.reducers';

export interface AppState {
  [authFeatureKey]: any;
  [spinnerFeatureKey]: any;
}

export const reducers: ActionReducerMap<AppState> = {
  [authFeatureKey]: AuthReducer,
  [spinnerFeatureKey]: LoadingSpinnerReducer
};
