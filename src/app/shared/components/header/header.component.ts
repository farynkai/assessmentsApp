import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from "../../../modules/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  public onLogout(): void {
    this.authService.deleteUserFromLocalStorage();
    this.router.navigate(['login']);
  }
}
