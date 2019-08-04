import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { RouterTestingModule } from '@angular/router/testing';

const fixtureUser = [];

const angularFireDatavaseStub = { list: () => {}};
const mockUsers$ = of(fixtureUser);

describe('UserService', () => {
  beforeEach(() => {
    spyOn(angularFireDatavaseStub, 'list').and.returnValue(mockUsers$);
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireDatabase, useValue: angularFireDatavaseStub }
      ],
      imports: [ RouterTestingModule ]
    });
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
