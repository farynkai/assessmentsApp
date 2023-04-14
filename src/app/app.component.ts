import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { autoLogin } from './store/auth/auth.actions';
import { isAuthenticated } from './store/auth/auth.selectors';
import { getLoading } from './store/loading-spinner/loading-spinner.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'assessmentsApp';
  authenticated$ = this.store.select(isAuthenticated);
  showLoading$ = this.store.select(getLoading);

  constructor( private store: Store ) {}

  ngOnInit(): void {
    this.store.dispatch(autoLogin());
  }
}
