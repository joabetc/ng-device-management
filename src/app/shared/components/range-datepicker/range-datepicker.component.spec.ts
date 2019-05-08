import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDatepickerComponent } from './range-datepicker.component';
import { NgbDatepickerModule, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DateStructAdapter } from '../../adapters/date-struct.adapter';

const dateStructAdapterStub = {
  adaptFrom: () => {},
  adaptTo: () => {}
};

describe('RangeDatepickerComponent', () => {
  let component: RangeDatepickerComponent;
  let fixture: ComponentFixture<RangeDatepickerComponent>;

  beforeEach(async(() => {
    spyOn(dateStructAdapterStub, 'adaptFrom').and.returnValue(null);
    spyOn(dateStructAdapterStub, 'adaptTo').and.returnValue(null);
    TestBed.configureTestingModule({
      declarations: [ RangeDatepickerComponent ],
      imports: [ NgbDatepickerModule ],
      providers: [
        { provide: DateStructAdapter, useValue: dateStructAdapterStub }
      ]
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
