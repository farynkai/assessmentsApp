import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminResolver } from './admin.resolver';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent, pathMatch: 'full', canActivate: [AuthGuard], resolve: { users: AdminResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
