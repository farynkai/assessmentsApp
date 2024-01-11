import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LoadingSpinnerState } from '../../shared/interfaces/state';
import { spinnerFeatureKey } from './loading-spinner.reducers';

export const selectSpinnerState = createFeatureSelector<LoadingSpinnerState>(spinnerFeatureKey);

export const getLoading = createSelector(
  selectSpinnerState,
  (state: LoadingSpinnerState) => state.showLoading
);
