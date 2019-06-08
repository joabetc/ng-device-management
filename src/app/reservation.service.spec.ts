import { TestBed } from '@angular/core/testing';

import { ReservationService } from './reservation.service';
import { of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

const fixtureReservations = [];

const angularFireDatavaseStub = { list: () => {}};
const mockReservations$ = of(fixtureReservations);

describe('ReservationService', () => {
  beforeEach(() => {
    spyOn(angularFireDatavaseStub, 'list').and.returnValue(mockReservations$);
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireDatabase, useValue: angularFireDatavaseStub }
      ]
    });
  });

  it('should be created', () => {
    const service: ReservationService = TestBed.get(ReservationService);
    expect(service).toBeTruthy();
  });
});
