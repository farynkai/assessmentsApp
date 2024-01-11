import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

import { User } from '../../../shared/interfaces/user';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateUserComponent implements OnInit {
  editForm!: FormGroup;
  data: User;
  users: User[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private validatorsService: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users'));
    this.activatedRoute.params.pipe(
      take(1)
    ).subscribe(params => {
      this.data = this.findUserById(+params['id']);
      if (this.data) {
        this.initFilterForm();
      }
    });
  }

  public edit(userData: User): void {
    userData.id = this.data.id;
    const itemIndex = this.users.findIndex((item => item.id === userData.id));
    this.users[itemIndex] = userData;
    localStorage.setItem('users', JSON.stringify(this.users));
    this.router.navigate(['home']);
  }

  public cancel(): void {
    this.router.navigate(['home']);
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

  private findUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
