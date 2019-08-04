import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('MessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ RouterTestingModule ]
  }));

  it('should be created', () => {
    const service: MessagesService = TestBed.get(MessagesService);
    expect(service).toBeTruthy();
  });

  it('should add messages', () => {
    const service: MessagesService = TestBed.get(MessagesService);
    service.addError('Error');
    expect(service.messages.length).toBeGreaterThan(0);
  });
});
