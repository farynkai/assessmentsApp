import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { takeUntil, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { UnsubscriberComponent } from '../components/unsubscriber/unsubscriber.component';
import { User } from '../interfaces/user';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AdminService } from './admin.service';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends UnsubscriberComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['number', 'name', 'lastName', 'dateOfBirth', 'education', 'role', 'position', 'action'];
  dataSource!: MatTableDataSource<User[]>;
  users = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer,
    private matDialog: MatDialog,
    private adminService: AdminService
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      this.users = data['users'];
      this.users.map((el, index) => el['id'] = index + 1);
    });
    this.dataSource = new MatTableDataSource(this.users);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSourceUpdate();
  }

  dataSourceUpdate(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  addItem(): void {
    this.matDialog.open(AddUserComponent);
    this.adminService.newUser.pipe(
      take(1)
    ).subscribe((newUser: User) => {
      newUser.id = this.users.slice(-1).pop().id + 1;
      this.users.push(newUser);
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSourceUpdate();
    })
  }

  updateItem(item): void {
    this.matDialog.open(UpdateUserComponent, { data: item });
    this.adminService.updatedData.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((newData: User) => {
      const itemIndex = this.users.findIndex((item => item.id === newData['id']));
      this.users[itemIndex] = newData;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSourceUpdate();
    })
  }

  removeItem(item): void {
    this.users = this.users.filter( el => el.id !== item.id );
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSourceUpdate();
  }

}
