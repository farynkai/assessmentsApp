import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User } from '../../interfaces/user';
import { AdminService } from '../admin.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {
  editForm!: FormGroup;
  get EditFormControls(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private matDialog: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private adminService: AdminService,
    private validatorsService: ValidatorsService
  ) {
    this.initFilterForm();
  }

  private initFilterForm(): void {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [this.validatorsService.dateValidator, Validators.required]],
      education: ['', Validators.required],
      role: ['', Validators.required],
      position: ['', Validators.required]
    });

    this.editForm.setValue({
      name: this.data.name,
      lastName: this.data.lastName,
      dateOfBirth: this.data.dateOfBirth,
      education: this.data.education,
      role: this.data.role,
      position: this.data.position
    });
  }

  edit(userData: User): void {
    if (this.editForm.valid) {
      userData.id = this.data.id;
      this.adminService.updatedData.next(userData);
      this.matDialog.close();
    }
  }

  cancel(): void {
    this.matDialog.close();
  }
}
