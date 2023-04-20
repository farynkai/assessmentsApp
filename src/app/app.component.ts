import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { autoLogin } from './store/auth/auth.actions';
import { getLoading } from './store/loading-spinner/loading-spinner.selectors';
import { UserState } from './interfaces/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'assessmentsApp';
  showHeader: boolean;
  showLoading$ = this.store.select(getLoading);
  destroyed$ = new Subject<void>();
  constructor(
    private store: Store<UserState>,
    private router: Router
  ) {
    this.router.events.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if ( event.url === '/login' ||  event.url === '/') {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(autoLogin());
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
