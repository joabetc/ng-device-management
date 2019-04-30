import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDatepickerComponent } from './range-datepicker.component';
import { NgbDatepickerModule, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateStructAdapter } from '../../date-struct.adapter';

describe('RangeDatepickerComponent', () => {
  let component: RangeDatepickerComponent;
  let fixture: ComponentFixture<RangeDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeDatepickerComponent ],
      imports: [ NgbDatepickerModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
