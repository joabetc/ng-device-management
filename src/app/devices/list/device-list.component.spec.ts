import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';
import { DeviceService } from 'src/app/device.service';
import { DeviceServiceMock } from 'src/test/DeviceServiceMock';
import { MatIconModule } from '@angular/material';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListComponent ],
      imports: [ MatIconModule ],
      providers: [
        { provide: DeviceService, useClass: DeviceServiceMock }
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
