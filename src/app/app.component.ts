import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { UserState } from './shared/interfaces/state';
import { LoadingSpinnerService } from "./shared/services/loading-spinner.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'testApp';
  showHeader: boolean;
  showLoading: boolean;
  destroyed$ = new Subject<void>();
  constructor(
    private router: Router,
    private loadingSpinner: LoadingSpinnerService
  ) {
    this.router.events.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.showHeader = event.url !== '/login';
      }
    });
  }

  ngOnInit() {
    this.loadingSpinner.isLoading.subscribe((value) => {
      this.showLoading = value;
    })
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
