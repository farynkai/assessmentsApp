import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { User } from '../../../shared/interfaces/user';
import { HomeService } from '../home.service';
import { ValidatorsService } from '../../../shared/services/validators.service';

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

  ngOnInit(): void {
    this.homeService.userToEdit.pipe(
      take(1)
    ).subscribe((user: User) => {
      this.data = user;
    })
    this.initFilterForm();
  }

  private initFilterForm(): void {
    this.editForm = this.fb.group({
      name: [this.data.name, Validators.required],
      lastName: [this.data.lastName, Validators.required],
      dateOfBirth: [this.data.dateOfBirth, [this.validatorsService.dateValidator, Validators.required]],
      education: [this.data.education, Validators.required],
      role: [this.data.role, Validators.required],
      position: [this.data.position, Validators.required]
    });
  }

  edit(userData: User): void {
    userData.id = this.data.id;
    this.homeService.updatedData.next(userData);
    this.router.navigate(['home']);
  }

  cancel(): void {
    this.router.navigate(['home']);
  }
}
