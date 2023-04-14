import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { ToastService } from '../../services/toast.service';
import * as AuthActions from './auth.actions'
import { setLoadingSpinner } from '../loading-spinner/loading-spinner.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private store: Store
  ) {}

  loginRequest$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      mergeMap((userData) => {
          return this.authService.login(userData).pipe(
              map((userInfo) => {
                this.store.dispatch(setLoadingSpinner({ status: false }));
                this.authService.setUserInLocalStorage(userInfo);
                return AuthActions.loginSuccess( { loginSuccessResponse: userInfo });
              }),
              catchError((error) => {
                this.toastService.showError(error);
                this.store.dispatch(setLoadingSpinner({ status: false }));
                return of(AuthActions.loginFailure({ error }));
              })
          )
      })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(({ loginSuccessResponse }) => {
        this.router.navigateByUrl('dashboard');
      })
    ),
    { dispatch: false }
  );

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
      this.router.navigateByUrl('login');
    })
  ), { dispatch: false });
}
