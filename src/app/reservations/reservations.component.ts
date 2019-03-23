import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { ReservationDataService } from './shared/reservation-data.service';
import { ReservationTable } from '../model/reservation-table';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  disableButtons: boolean = false;

  constructor(
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService) { }

  ngOnInit() {
  }

  onDomChange($event: Event): void {
    let element = $event.target as HTMLElement;
    if (element.classList.contains("show") || element.classList.contains("collapsing")) {
      this.disableButtons = true;
    } else {
      this.disableButtons = false;
    }
    console.log($event.target);
  }

  newReservation() {
    this.reservationDataService.changeReservation(new ReservationTable(), '');
  }
}
