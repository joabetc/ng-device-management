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

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesComponent, DeviceEditComponent, DeviceListComponent ],
      imports: [ FormsModule, NgbTypeaheadModule, HttpClientModule, MatIconModule ],
      providers: [
        { provide: DeviceService, useClass: DeviceServiceMock }
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
