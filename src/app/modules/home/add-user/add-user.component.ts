import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../shared/interfaces/user';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserComponent {
  userForm!: FormGroup;
  public get UserFormControls(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validatorsService: ValidatorsService
  ) {
    this.initFilterForm();
  }

  public addUser(userData: User): void {
    this.userForm.reset();
    this.setNullToErrors();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.length > 0) {
      userData.id = users.slice(-1).pop().id + 1;
    } else {
      userData.id = 1;
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['home']);
  }

  public cancel(): void {
    this.setNullToErrors();
    this.router.navigate(['home']);
  }

  private initFilterForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [this.validatorsService.dateValidator, Validators.required]],
      education: ['', Validators.required],
      role: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  private setNullToErrors(): void {
    Object.values(this.UserFormControls).forEach(value => {
      value.setErrors(null);
    });
  }
}
