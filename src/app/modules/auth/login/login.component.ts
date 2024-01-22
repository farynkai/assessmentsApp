import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take} from "rxjs";
import { Router } from "@angular/router";

import { UserCredential, UserInfo } from '../../../shared/interfaces/auth';
import { LoadingSpinnerService } from "../../../shared/services/loading-spinner.service";
import { AuthService } from "../auth.service";
import { ToastService } from "../../../shared/services/toast.service";

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
    private router: Router,
    private loadingSpinner: LoadingSpinnerService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    localStorage.clear();
    this.initFilterForm();
  }

  public login (credential: UserCredential): void {
    this.loginForm.reset();
    this.loadingSpinner.isLoading.next(true);

    this.authService.login(credential).pipe(
      take(1)
    ).subscribe((userInfo: UserInfo) => {
        this.authService.setUserInLocalStorage(userInfo);
        this.loadingSpinner.isLoading.next(false);
        this.router.navigate(['home']);
      },
      error => {
        this.loadingSpinner.isLoading.next(false);
        this.toastService.showError(error);
      })

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
