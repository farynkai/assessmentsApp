import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from "../../modules/auth/auth.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): UrlTree | boolean => {
  const routerInjector = inject(Router);
  const authInjector = inject(AuthService);

  const token = authInjector.getUserFromLocalStorage().token;
  if (!token) {
    routerInjector.navigateByUrl('login');
  }
  return !!token;
};
