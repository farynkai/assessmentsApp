import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { take } from 'rxjs';
import { MatDialog } from "@angular/material/dialog";

import { User } from '../../shared/interfaces/user';
import { DeleteNotificationComponent } from '../../shared/components/delete-notification/delete-notification.component';

@Component({
  selector: 'app-home-section',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['number', 'name', 'lastName', 'dateOfBirth', 'education', 'role', 'position', 'action'];
  dataSource!: MatTableDataSource<User[]>;
  users = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('users')) || [];
    this.dataSource = new MatTableDataSource(this.users);
  }

  ngAfterViewInit(): void {
    this.dataSourceUpdate();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public openDialog(item: User): void {
    const dialogRef = this.dialog.open(DeleteNotificationComponent, {
      width: '300px',
      data: item
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(confirmed => {
        if (confirmed) {
          this.removeItem(item);
        }
      })
  }

  private dataSourceUpdate(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private removeItem(item): void {
    const users = JSON.parse(localStorage.getItem('users'));
    this.users = users.filter( el => el.id !== item.id );
    localStorage.setItem('users', JSON.stringify(this.users))
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSourceUpdate();
  }
}
