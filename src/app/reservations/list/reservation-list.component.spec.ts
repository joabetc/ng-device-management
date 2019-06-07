import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationListComponent } from './reservation-list.component';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationServiceMock } from 'src/test/ReservationServiceMock';

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let fixture: ComponentFixture<ReservationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationListComponent ],
      providers: [
        { provide: ReservationService, useClass: ReservationServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
