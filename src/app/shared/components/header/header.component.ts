import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { autoLogout } from '../../../store/auth/auth.actions';
import { UserState } from '../../interfaces/state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor( private store: Store<UserState> ) {}
  onLogout(): void {
    this.store.dispatch(autoLogout());
  }
}
