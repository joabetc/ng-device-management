import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationTable } from 'src/app/model/reservation-table';
import { ReservationDataService } from '../shared/reservation-data.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {

  @Input() disableButtons: boolean;

  @Input() reservations: ReservationTable[];

  showButtons = false;

  constructor(
    private reservationService: ReservationService,
    private reservatioDataService: ReservationDataService,
    private authService: AuthService
  ) {
    this.authService.isAdmin().then(result => this.showButtons = result);
  }

  ngOnInit() { }

  delete(key: string) {
    this.reservationService.delete(key);
  }

  edit(reservation: ReservationTable, key: string) {
    this.reservatioDataService.changeReservation(reservation, key);
  }

  canChange(uid: string) {
    return this.authService.getCurrentUser().uid === uid || this.showButtons;
  }
}
