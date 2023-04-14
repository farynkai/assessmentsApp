import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { AdminService } from '../admin/admin.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminResolver implements Resolve<User[]> {
  constructor(private adminService: AdminService) {}
  resolve(): Observable<User[]> {
    return this.adminService.getUsers();
  }
}
