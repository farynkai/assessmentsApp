import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserCredential } from '../../interfaces/auth';
import { loginRequest } from '../../store/auth/auth.actions'
import { UserInfo } from '../../interfaces/auth';
import { setLoadingSpinner } from '../../store/loading-spinner/loading-spinner.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  get loginFormControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<UserInfo>
  ) {
    this.initFilterForm();
  }

  private initFilterForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login (credential: UserCredential): void {
    if (this.loginForm.valid) {
      this.loginForm.reset();
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(loginRequest(credential));
      this.setNullToErrors();
    }
  }

  setNullToErrors(): void {
    Object.values(this.loginFormControls).forEach(value => {
      value.setErrors(null);
    });
  }
}
