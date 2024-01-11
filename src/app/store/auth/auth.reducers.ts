import { Action, createReducer, on } from '@ngrx/store';

import { autoLogout, loginFailure, loginSuccess } from './auth.actions';
import { UserState } from '../../shared/interfaces/state';

export const initialState: UserState = {
  userData: null,
}

export const authFeatureKey = 'users';

const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      userData: loginSuccessResponse,
    }
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      userData: null,
      loginError: error.message
    }
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      userData: null,
      loginError: null
    }
  }),
);

export function AuthReducer(state: UserState, action: Action) {
  return authReducer(state, action);
}
