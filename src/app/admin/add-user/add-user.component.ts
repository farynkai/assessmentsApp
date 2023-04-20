import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { User } from '../../interfaces/user';
import { AdminService } from '../admin.service';
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
    private matDialog: MatDialogRef<AddUserComponent>,
    private adminService: AdminService,
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
    if (this.userForm.valid) {
      this.userForm.reset();
      this.setNullToErrors();
      this.adminService.newUser.next(userData);
      this.matDialog.close();
    }
  }

  cancel(): void {
    this.matDialog.close();
  }

  setNullToErrors(): void {
    Object.values(this.UserFormControls).forEach(value => {
      value.setErrors(null);
    });
  }
}
