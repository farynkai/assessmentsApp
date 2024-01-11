import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { authGuard } from '../../shared/guards/auth.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { editGuard } from '../../shared/guards/edit.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'edit', component: UpdateUserComponent, pathMatch: 'full', canActivate: [authGuard, editGuard] },
  { path: 'add', component: AddUserComponent, pathMatch: 'full', canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
