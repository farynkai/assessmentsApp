import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from "@angular/core";

export const homeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  if (localStorage.getItem('userData')) {
    return inject(Router).createUrlTree(['/home']);
  } else {
    localStorage.clear();
    return true;
  }
};
