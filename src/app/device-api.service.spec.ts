import { TestBed } from '@angular/core/testing';

import { DeviceApiService } from './device-api.service';
import { HttpClientModule } from '@angular/common/http';

describe('DeviceApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: DeviceApiService = TestBed.get(DeviceApiService);
    expect(service).toBeTruthy();
  });
});
