import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { exhaustMap, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectToken } from '../store/auth/auth.selectors';
import { UserState } from '../interfaces/state';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor( private store: Store<UserState> ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectToken).pipe(
      exhaustMap((token) => {
        if (!token) {
          return next.handle(request);
        }
        let modifiedReq = request.clone({
          setHeaders: { 'X-Token': token }
        });
        return next.handle(modifiedReq);
      })
    )
  }
}
