import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { Ng2GoogleChartsModule, GoogleChartComponent } from 'ng2-google-charts';
import { ReservationService } from '../reservation.service';
import { ReservationServiceMock } from 'src/test/ReservationServiceMock';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../shared/services/auth.service';
import { AuthServiceMock } from 'src/test/AuthServiceMock';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

const fixtureUser = {};
const mockUser$ = of(fixtureUser);

const angularFirestoreStub = { doc: () => {} };
const angularFireAuthStub = { authState: mockUser$ };
const angularFireDatabaseStub = {};

const googleChartComponentStub = {
  data: null,
  chartReady: null,
  chartError: null,
  chartSelect: null,
  mouseOver: null,
  mouseOut: null,
  wrapper: { },
  draw: () => { }
};

const timelineChartStub: GoogleChartInterface = {
  chartType: 'Timeline',
    dataTable: [
      ['Device', 'Name', 'From', 'To'],
      ['Loading...', 'Loading...', new Date(), new Date()]
    ],
    component: googleChartComponentStub
  };

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ Ng2GoogleChartsModule, RouterTestingModule ],
      providers: [
        { provide: ReservationService, useClass: ReservationServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.timelineChart = timelineChartStub;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
