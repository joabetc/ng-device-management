import { Component, OnInit, HostListener } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ReservationService } from '../reservation.service';
import { ReservationTable } from '../model/reservation-table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public timelineChart: GoogleChartInterface = {
    chartType: 'Timeline',
    dataTable: [
      ['Device', 'Name', 'From', 'To']
    ]
  };
  
  reservations: ReservationTable[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.getReservations();
  }

  loadChartData(): void {
    const dataTable = this.timelineChart.dataTable;
    this.reservations.map(reservation => {
      dataTable.push([
        reservation.deviceName,
        reservation.userName,
        reservation.startDate,
        reservation.endDate
      ]);
    });
    this.timelineChart.component.draw();
  }

  getReservations() {
    this.reservationService.getAll().subscribe(res => {
      this.reservations = res as ReservationTable[];
      this.loadChartData();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.timelineChart.component.draw();
  }
}
