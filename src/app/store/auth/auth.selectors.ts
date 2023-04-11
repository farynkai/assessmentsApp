import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../../interfaces/state';
import { dataListFeatureKey } from './auth.reducers';

export const selectDataTableState = createFeatureSelector<UserState>(dataListFeatureKey);

export const selectToken = createSelector(
  selectDataTableState,
  (state: UserState) => state.token
);

