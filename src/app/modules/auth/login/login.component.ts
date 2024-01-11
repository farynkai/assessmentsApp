import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UserCredential } from '../../../shared/interfaces/auth';
import { loginRequest } from '../../../store/auth/auth.actions'
import { setLoadingSpinner } from '../../../store/loading-spinner/loading-spinner.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginForm!: FormGroup;
  public get loginFormControls(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {
    localStorage.clear();
    this.initFilterForm();
  }

  public login (credential: UserCredential): void {
    this.loginForm.reset();
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(loginRequest(credential));
    this.setNullToErrors();
  }

  private initFilterForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  private setNullToErrors(): void {
    Object.values(this.loginFormControls).forEach(value => {
      value.setErrors(null);
    });
  }
}
