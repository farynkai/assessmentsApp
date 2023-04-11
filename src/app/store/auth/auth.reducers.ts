import { Action, createReducer, on } from '@ngrx/store';

import { loginFailure, loginSuccess } from './auth.actions';
import { UserState } from '../../interfaces/state';

export const initialState: UserState = {
  token: null,
}

export const dataListFeatureKey = 'users';

const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { accessToken }) => {
    return {
      ...state,
      token: accessToken,
    }
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      loginError: error,
      token: null,
    }
  }),
);

export function AuthReducer(state: UserState, action: Action) {
  return authReducer(state, action);
}
