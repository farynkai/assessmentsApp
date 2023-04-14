import { Action, createReducer, on } from '@ngrx/store';

import { setLoadingSpinner } from './loading-spinner.actions';
import { LoadingSpinnerState } from '../../interfaces/state';

export const initialState: LoadingSpinnerState = {
  showLoading: false
}

export const spinnerFeatureKey = 'spinner';

const loadingSpinnerReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  })
);

export function LoadingSpinnerReducer(state: LoadingSpinnerState, action: Action) {
  return loadingSpinnerReducer(state, action);
}
