import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent, MatButtonModule],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AuthModule { }
