import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

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
