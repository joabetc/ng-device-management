import { DomChangeDirective } from './dom-change.directive'
import { ElementRef } from '@angular/core';

describe('DomChangeDirectiveDirective', () => {
  it('should create an instance', () => {
    const directive = new DomChangeDirective(new ElementRef('teste'));
    expect(directive).toBeTruthy();
  });
});
