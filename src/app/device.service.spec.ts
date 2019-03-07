import { TestBed } from '@angular/core/testing';

import { DeviceService } from './device.service';
import { Device } from './model/device';

describe('DeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceService = TestBed.get(DeviceService);
    expect(service).toBeTruthy();
  });

  it('should return device list', (done: DoneFn) => {
    const service: DeviceService = TestBed.get(DeviceService);
    service.getDevices().subscribe({
      next: (devices: Device[]) => {
        expect(devices).toBeTruthy();
        done();
      }
    })
  })
});
