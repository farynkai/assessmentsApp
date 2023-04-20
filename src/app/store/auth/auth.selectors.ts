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

export const selectUserRole = createSelector(
  selectDataTableState,
  (state: UserState) => state.userData?.role
);

export const selectUserName = createSelector(
  selectDataTableState,
  (state: UserState) => state.userData?.first_name
);

export const selectUserData = createSelector(
  selectDataTableState,
  (state: UserState) => state.userData
);
