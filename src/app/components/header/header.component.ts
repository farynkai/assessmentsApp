import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { autoLogout } from '../../store/auth/auth.actions';
import { selectUserRole } from '../../store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userRole$ = this.store.select(selectUserRole);
  constructor( private store: Store ) {}
  onLogout() {
    this.store.dispatch(autoLogout());
  }
}
