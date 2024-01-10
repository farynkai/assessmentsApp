import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../interfaces/user';
import { HomeService } from '../home.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm!: FormGroup;
  get UserFormControls(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private router: Router,
    private validatorsService: ValidatorsService
  ) {
    this.initFilterForm();
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

  addUser(userData: User): void {
    this.userForm.reset();
    this.setNullToErrors();
    this.homeService.newUser.next(userData);
    this.router.navigate(['home']);
  }

  cancel(): void {
    this.setNullToErrors();
    this.router.navigate(['home']);
  }

  setNullToErrors(): void {
    Object.values(this.UserFormControls).forEach(value => {
      value.setErrors(null);
    });
  }
}
