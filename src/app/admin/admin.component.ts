import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { takeUntil } from 'rxjs';

import { UnsubscriberComponent } from '../components/unsubscriber/unsubscriber.component';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends UnsubscriberComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['name', 'lastName', 'dateOfBirth', 'education', 'role', 'position', 'action'];
  dataSource!: MatTableDataSource<User[]>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data['users']);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
