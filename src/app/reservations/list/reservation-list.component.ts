import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Reservation } from 'src/app/model/reservation';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationTable } from 'src/app/model/reservation-table';

@Component({
  selector: 'reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  @Input() disableButtons: boolean;

  displayedColumns: string[] = ['deviceId'];
  dataSource = new MatTableDataSource<ReservationTable>();

  columnDefinitions = [
    { def: 'deviceId', showMobile: true },
    //{ def: 'userId', showMobile: true },
    //{ def: 'startDate', showMobile: true },
    //{ def: 'endDate', showMobile: true }
  ];

  @ViewChild(MatSort) sort: MatSort;

  innerWidth: any;

  constructor(
    private reservationService: ReservationService
  ) { }

  ngOnInit() {
    this.getAllReservations();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllReservations() {
    this.reservationService.getAll().subscribe(res => {
      this.dataSource.data = ReservationTable.fromReservationArray(res);
    })
  }

  getDisplayedColumns(): string[] {
    const isMobile = this.innerWidth < 425;
    return this.columnDefinitions
      .filter(cd => !isMobile || cd.showMobile)
      .map(cd => cd.def);
  }

  showColumn(column: string): boolean {
    return this.getDisplayedColumns().includes(column);
  }
}
