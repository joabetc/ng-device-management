import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceEditComponent } from './device-edit.component';
import { FormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { DeviceService } from 'src/app/device.service';
import { DeviceServiceMock } from 'src/test/DeviceServiceMock';
import { HttpClientModule } from '@angular/common/http';

describe('DeviceEditComponent', () => {
  let component: DeviceEditComponent;
  let fixture: ComponentFixture<DeviceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceEditComponent ],
      imports: [ FormsModule, NgbTypeaheadModule, HttpClientModule ],
      providers: [
        { provide: DeviceService, useClass: DeviceServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
