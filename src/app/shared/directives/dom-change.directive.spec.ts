import { DomChangeDirective } from './dom-change.directive'
import { ElementRef, Component, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from "@angular/platform-browser";

@Component({
  template: '<input domChange>'
})
class TestCompoment {}

describe('DomChangeDirective', () => {

  let component: TestCompoment;
  let fixture: ComponentFixture<TestCompoment>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCompoment, DomChangeDirective ]
    });
    fixture = TestBed.createComponent(TestCompoment);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    const directive = new DomChangeDirective(new ElementRef(inputEl.nativeElement));
    expect(directive).toBeTruthy();
  });
});
