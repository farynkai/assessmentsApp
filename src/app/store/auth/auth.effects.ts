import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, take, tap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../services/toast.service';
import * as AuthActions from './auth.actions'
import { setLoadingSpinner } from '../loading-spinner/loading-spinner.actions';
import { LoadingSpinnerState } from '../../interfaces/state';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private store: Store<LoadingSpinnerState>
  ) {}

  loginRequest$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      mergeMap((userData) => this.authService.login(userData).pipe(
          take(1),
          map((userInfo) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.authService.setUserInLocalStorage(userInfo);
            this.authService.navigateTo('dashboard');
            return AuthActions.loginSuccess( { loginSuccessResponse: userInfo });
          }),
          catchError((error) => {
            this.toastService.showError(error);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(AuthActions.loginFailure({ error }));
          })
      ))
  ));

  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.autoLogin),
    mergeMap((action) => {
      const user = this.authService.getUserFromLocalStorage();
      return of(AuthActions.loginSuccess({ loginSuccessResponse: user }))
    })
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.autoLogout),
    map((action) => {
      this.authService.deleteUserFromLocalStorage();
      this.authService.navigateTo('login');
    })
  ), { dispatch: false });
}
