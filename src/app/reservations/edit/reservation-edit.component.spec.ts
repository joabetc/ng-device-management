import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationEditComponent } from './reservation-edit.component';
import { FormsModule } from '@angular/forms';
import { RangeDatepickerComponent } from 'src/app/shared/components/range-datepicker/range-datepicker.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DeviceService } from 'src/app/device.service';
import { DeviceServiceMock } from 'src/test/DeviceServiceMock';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationServiceMock } from 'src/test/ReservationServiceMock';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AuthServiceMock } from 'src/test/AuthServiceMock';

describe('ReservationEditComponent', () => {
  let component: ReservationEditComponent;
  let fixture: ComponentFixture<ReservationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationEditComponent, RangeDatepickerComponent ],
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
    fixture = TestBed.createComponent(ReservationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
