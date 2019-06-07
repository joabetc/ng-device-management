import { Component, OnInit, HostListener } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ReservationService } from '../reservation.service';
import { ReservationTable } from '../model/reservation-table';

const DATA_TABLE_TITLE = ['Device', 'Name', 'From', 'To'];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public timelineChart: GoogleChartInterface = {
    chartType: 'Timeline',
    dataTable: [
      DATA_TABLE_TITLE,
      ['Loading...', 'Loading...', new Date(), new Date()]
    ]
  };

  reservations: ReservationTable[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.timelineChart.dataTable = [];
    this.timelineChart.dataTable.push(
      DATA_TABLE_TITLE
    );
    this.getReservations();
  }

  loadChartData(): void {
    this.reservations.map(reservation => {
      this.timelineChart.dataTable.push([
        reservation.deviceName,
        reservation.userName,
        reservation.startDate,
        reservation.endDate
      ]);
    });
  }

  getReservations() {
    this.reservationService.getAll().subscribe(res => {
      this.reservations = res as ReservationTable[];
      this.loadChartData();

      if (this.timelineChart.component.wrapper) {
        this.timelineChart.component.draw();
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.timelineChart.component.draw();
  }
}
