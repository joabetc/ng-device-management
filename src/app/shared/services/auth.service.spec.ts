import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

const angularFirestoreStub = { doc: () => {} };
const angularFireAuthStub = {};

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: angularFirestoreStub },
      { provide: AngularFireAuth, useValue: angularFireAuthStub }
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
