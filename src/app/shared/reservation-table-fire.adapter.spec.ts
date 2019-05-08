import { TestBed } from "@angular/core/testing";
import { DateFireTimestampAdapter } from './date-fire-timestamp.adapter';
import { ReservationTableFireAdapter } from './reservation-table-fire.adapter';

const dateFireTimestampAdapter = {};

describe('ReservationTableFireAdapter', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: DateFireTimestampAdapter, useValeu: dateFireTimestampAdapter }
    ]
  }));

  it('should create an instance', () => {
    const reservationTableFireAdapter: ReservationTableFireAdapter = TestBed.get(ReservationTableFireAdapter);
    expect(reservationTableFireAdapter).toBeTruthy();
  });
});
