import { TestBed, async, inject } from '@angular/core/testing';

import { SecureInnerPagesGuard } from './secure-inner-pages.guard';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../services/auth.service';
import { AuthServiceMock } from 'src/test/AuthServiceMock';

const angularFirestoreStub = { doc: () => {} };
const angularFireAuthStub = {};
const angularFireDatabaseStub = {};

describe('SecureInnerPagesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SecureInnerPagesGuard,
        { provide: AngularFirestore, useValue: angularFirestoreStub },
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub },
        { provide: AuthService, useClass: AuthServiceMock }
      ],
      imports: [ RouterTestingModule ]
    });
  });

  it('should ...', inject([SecureInnerPagesGuard], (guard: SecureInnerPagesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
