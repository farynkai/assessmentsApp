import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';

import { HomeService } from '../../modules/home/home.service';
import { User } from '../interfaces/user';

export const editGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  const injector = inject(Router);
  return inject(HomeService).userToEdit.pipe(
    take(1),
    switchMap((user: User): Observable<boolean | UrlTree> => {
      return Object.keys(user).length === 0 ? of(injector.createUrlTree(['/home'])) : of(true);
    })
  );
};
