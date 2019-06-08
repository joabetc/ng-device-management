import { TestBed } from '@angular/core/testing';

import { DeviceService } from './device.service';
import { of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

const fixtureDevices = [];

const angularFireDatavaseStub = { list: () => {}};
const mockDevices$ = of(fixtureDevices);

describe('DeviceService', () => {
  beforeEach(() => {
    spyOn(angularFireDatavaseStub, 'list').and.returnValue(mockDevices$);
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireDatabase, useValue: angularFireDatavaseStub }
      ]
    });
  });

  it('should be created', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    expect(service).toBeTruthy();
  });

});
