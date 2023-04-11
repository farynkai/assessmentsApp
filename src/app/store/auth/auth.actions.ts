import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[Auth] Login Request',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ accessToken: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
