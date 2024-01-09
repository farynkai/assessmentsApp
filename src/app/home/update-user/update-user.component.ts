import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { User } from '../../interfaces/user';
import { HomeService } from '../home.service';
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  editForm!: FormGroup;
  data: User;
  get EditFormControls(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private router: Router,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit() {
    this.homeService.userToEdit.pipe(
      take(1)
    ).subscribe((user: User) => {
      this.data = user
    })
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
      this.homeService.updatedData.next(userData);
      this.router.navigate(['home']);
    }
  }

  cancel(): void {
    this.router.navigate(['home']);
  }
}
