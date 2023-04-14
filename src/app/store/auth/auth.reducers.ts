import { Action, createReducer, on } from '@ngrx/store';

import { autoLogout, loginFailure, loginSuccess } from './auth.actions';
import { UserState } from '../../interfaces/state';

export const initialState: UserState = {
  userData: {},
  isLogged: false
}

export const authFeatureKey = 'users';

const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { loginSuccessResponse }) => {
    return {
      ...state,
      userData: loginSuccessResponse,
      isLogged: true,
    }
  }),
  on(loginFailure, (state, { error }) => {
    return {
      ...state,
      userData: {},
      isLogged: false,
      loginError: error.message
    }
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      userData: {},
      isLogged: false,
      loginError: ''
    }
  }),
);

export function AuthReducer(state: UserState, action: Action) {
  return authReducer(state, action);
}
