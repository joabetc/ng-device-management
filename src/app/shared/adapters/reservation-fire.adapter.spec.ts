import { ReservationFireAdapter } from './reservation-fire.adapter';
import { TestBed } from '@angular/core/testing';
import { DateFireTimestampAdapter } from './date-fire-timestamp.adapter';

const dateFiretimestampAdapter = {};

describe('ReservationFireAdapter', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: DateFireTimestampAdapter, userValue: dateFiretimestampAdapter }
    ]
  }));

  it('should create an instance', () => {
    const reservationFireAdapter: ReservationFireAdapter = TestBed.get(ReservationFireAdapter);
    expect(reservationFireAdapter).toBeTruthy();
  });
});
