import { createFeatureSelector, createSelector } from '@ngrx/store';

import { authFeatureKey } from './auth.reducers';
import { UserState } from '../../interfaces/state';

export const selectDataTableState = createFeatureSelector<UserState>(authFeatureKey);

export const selectToken = createSelector(
  selectDataTableState,
  (state: UserState) => state.userData?.token
);

export const isAuthenticated = createSelector(
  selectDataTableState,
  (state: UserState) => state.userData?.token ? true : false
);

