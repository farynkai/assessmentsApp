import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { exhaustMap, Observable, of } from 'rxjs';

import { isAuthenticated } from '../store/auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router
  ) {}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean> {
    return this.store.select(isAuthenticated).pipe(
      exhaustMap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('login');
        }
        return of(isAuthenticated);
      })
    )
  }
}
