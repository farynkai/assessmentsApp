import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../services/toast.service';
import * as AuthActions from './auth.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  loginRequest$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      mergeMap((userData) => {
          return this.authService.login(userData).pipe(
              map((userInfo) => {
                this.toastService.successfulRegistration(userInfo.first_name);
                return AuthActions.loginSuccess( { accessToken: userInfo.token as string })
              }),
              catchError((error) => {
                this.toastService.showError(error);
                return of(AuthActions.loginFailure({ error }))
              })
          )
      })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(( { accessToken }) => {
        this.router.navigateByUrl('');
      })
    ),
    { dispatch: false }
  );
}
