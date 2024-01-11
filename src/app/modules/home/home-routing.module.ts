import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { authGuard } from '../../shared/guards/auth.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'edit/:id', component: UpdateUserComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'add', component: AddUserComponent, pathMatch: 'full', canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
