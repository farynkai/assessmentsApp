import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { exhaustMap, Observable, of } from 'rxjs';

import { isAuthenticated } from '../../store/auth/auth.selectors';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  const routerInjector = inject(Router);
  const storeInjector = inject(Store);

  return storeInjector.select(isAuthenticated).pipe(
    exhaustMap((isAuthenticated) => {
      if (!isAuthenticated) {
        of(routerInjector.navigateByUrl('login'));
      }
      return of(isAuthenticated);
    })
  )
};
