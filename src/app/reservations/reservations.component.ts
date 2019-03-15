import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  disableButtons: boolean = false;

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
  }

  onDomChange($event: Event): void {
    let element = $event.target as HTMLElement;
    if (element.classList.contains("in") || element.classList.contains("collapsing")) {
      this.disableButtons = true;
    } else {
      this.disableButtons = false;
    }
    console.log($event.target);
  }
}
