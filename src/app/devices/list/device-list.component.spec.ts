import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';
import { DeviceService } from 'src/app/device.service';
import { DeviceServiceMock } from 'src/test/DeviceServiceMock';
import { MatIconModule } from '@angular/material';
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

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListComponent ],
      imports: [ MatIconModule, RouterTestingModule ],
      providers: [
        { provide: DeviceService, useClass: DeviceServiceMock },
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
