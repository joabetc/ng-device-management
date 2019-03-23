import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { ReservationDataService } from './shared/reservation-data.service';
import { ReservationTable } from '../model/reservation-table';
import { DateRange } from '../shared/model/date-range';
import { DateStructAdapter } from '../shared/date-struct.adapter';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  disableButtons: boolean = false;

  reservations: ReservationTable[];
  disabledDates: DateRange[] = [];

  constructor(
    private reservationService: ReservationService,
    private reservationDataService: ReservationDataService,
    private dateAdapter: DateStructAdapter) { }

  ngOnInit() {
    this.getReservations();
  }

  getReservations() {
    this.reservationService.getAll().subscribe(res => {
      this.reservations = res as ReservationTable[];
      this.disabledDates = this.getDisabledDates();
    });
  }

  onDomChange($event: Event): void {
    let element = $event.target as HTMLElement;
    if (element.classList.contains("show") || element.classList.contains("collapsing")) {
      this.disableButtons = true;
    } else {
      this.disableButtons = false;
    }
  }

  newReservation() {
    this.reservationDataService.changeReservation(new ReservationTable(), '');
  }

  getDisabledDates(): DateRange[] {
    return this.reservations.map(reservation => {
      return {
        from: this.dateAdapter.adaptFrom(reservation.startDate),
        to: this.dateAdapter.adaptFrom(reservation.endDate)
      }
    });
  }
}
