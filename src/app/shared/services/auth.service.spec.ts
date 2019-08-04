import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/user.service';
import { UserServiceMock } from 'src/test/UserServiceMock';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

const fixtureUser = {};
const mockUser$ = of(fixtureUser);

const angularFirestoreStub = { doc: () => {} };
const angularFireAuthStub = { authState: mockUser$ };

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: UserService, useClass: UserServiceMock }
      ],
      imports: [ RouterTestingModule ]
    }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
