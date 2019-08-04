import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesComponent } from './devices.component';
import { DeviceEditComponent } from './edit/device-edit.component';
import { DeviceListComponent } from './list/device-list.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material';
import { DeviceService } from '../device.service';
import { DeviceServiceMock } from 'src/test/DeviceServiceMock';
import { AssetNumberAlreadyTakenValidator } from '../shared/validators/asset-number-already-taken.validator';
import { DeviceNameAlreadyTakenValidator } from '../shared/validators/device-name-already-taken.validator';
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

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DevicesComponent,
        DeviceEditComponent,
        DeviceListComponent,
        AssetNumberAlreadyTakenValidator,
        DeviceNameAlreadyTakenValidator ],
      imports: [
        FormsModule,
        NgbTypeaheadModule,
        HttpClientModule,
        MatIconModule,
        RouterTestingModule ],
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
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
