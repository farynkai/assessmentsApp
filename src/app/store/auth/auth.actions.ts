import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { UserInfo } from '../../shared/interfaces/auth';

export const loginRequest = createAction('[Auth] Login Request', props<{ email: string, password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ loginSuccessResponse: UserInfo }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: HttpErrorResponse }>());
export const autoLogin = createAction('[Auth] Auto Login');
export const autoLogout = createAction('[Auth] Auto Logout');
