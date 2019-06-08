import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsComponent } from './reservations.component';
import { ReservationEditComponent } from './edit/reservation-edit.component';
import { ReservationListComponent } from './list/reservation-list.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RangeDatepickerComponent } from '../shared/components/range-datepicker/range-datepicker.component';
import { DeviceService } from '../device.service';
import { DeviceServiceMock } from 'src/test/DeviceServiceMock';
import { ReservationService } from '../reservation.service';
import { ReservationServiceMock } from 'src/test/ReservationServiceMock';
import { AuthService } from '../shared/services/auth.service';
import { AuthServiceMock } from 'src/test/AuthServiceMock';

describe('ReservationsComponent', () => {
  let component: ReservationsComponent;
  let fixture: ComponentFixture<ReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ReservationsComponent,
        ReservationEditComponent,
        ReservationListComponent,
        RangeDatepickerComponent ],
      imports: [ FormsModule, NgbDatepickerModule ],
      providers: [
        { provide: DeviceService, useClass: DeviceServiceMock },
        { provide: ReservationService, useClass: ReservationServiceMock },
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
