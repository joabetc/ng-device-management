import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationTable } from 'src/app/model/reservation-table';
import { ReservationDataService } from '../shared/reservation-data.service';

@Component({
  selector: 'reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  @Input() disableButtons: boolean;

  reservations: ReservationTable[];

  constructor(
    private reservationService: ReservationService,
    private reservatioDataService: ReservationDataService
  ) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getAll().subscribe(res => {
      this.reservations = ReservationTable.fromReservationArray(res);
    })
  }
  
  delete(key: string) {
    this.reservationService.delete(key);
  }

  edit(reservation: ReservationTable, key: string) {
    this.reservatioDataService.changeReservation(reservation, key);
  }
}
