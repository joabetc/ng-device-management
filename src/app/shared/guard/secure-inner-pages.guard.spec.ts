import { TestBed, async, inject } from '@angular/core/testing';

import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

const angularFirestoreStub = { doc: () => {} };
const angularFireAuthStub = {};

describe('SecureInnerPagesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SecureInnerPagesGuard,
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireAuth, useValue: angularFireAuthStub }
      ]
    });
  });

  it('should ...', inject([SecureInnerPagesGuard], (guard: SecureInnerPagesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
