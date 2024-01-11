import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { homeGuard } from '../../shared/guards/home.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [homeGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
