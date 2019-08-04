import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationListComponent } from './reservation-list.component';
import { ReservationService } from 'src/app/reservation.service';
import { ReservationServiceMock } from 'src/test/ReservationServiceMock';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabase } from '@angular/fire/database';

const fixtureUser = {};
const mockUser$ = of(fixtureUser);

const angularFirestoreStub = { doc: () => {} };
const angularFireAuthStub = { authState: mockUser$ };
const angularFireDatabaseStub = {};

describe('ReservationListComponent', () => {
  let component: ReservationListComponent;
  let fixture: ComponentFixture<ReservationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationListComponent ],
      providers: [
        { provide: ReservationService, useClass: ReservationServiceMock },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }
      ],
      imports: [ RouterTestingModule ]
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
