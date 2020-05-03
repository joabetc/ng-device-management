import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { RouterTestingModule } from '@angular/router/testing';

import { User } from './shared/model/user';
import { MessagesService } from './shared/services/messages.service';

class MessagesServiceStub {
  addSuccess(message: string): void { }
  addError(message: string): void { }
}

const fixtureUser = [];

const angularFireDatabaseStub = {
  list: () => { },
  object: () => { } };
const angularFireListStub = { snapshotChanges: () => { } };
const angularFireObjectStub = { set: (obj: any) => { } };
const mockUsers$ = of(fixtureUser);

let service: UserService;
let messagesService: MessagesServiceStub;

describe('UserService', () => {
  beforeEach(() => {
    spyOn(angularFireDatabaseStub, 'list').and.returnValue(angularFireListStub);
    spyOn(angularFireListStub, 'snapshotChanges').and.returnValue(mockUsers$);
    spyOn(angularFireDatabaseStub, 'object').and.returnValue(angularFireObjectStub);

    messagesService = new MessagesServiceStub();

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireDatabase, useValue: angularFireDatabaseStub },
        { provide: MessagesService, useValue: messagesService }
      ],
      imports: [ RouterTestingModule ]
    });

    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should insert a user', () => {
    spyOn(angularFireObjectStub, 'set').and.returnValue(Promise.resolve());
    spyOn(messagesService, 'addSuccess');

    const user: User = {
      displayName: 'Test',
      email: 'teste@teste.com.br',
      emailVerified: false,
      uid: '12345',
      workerid: 333333
    };

    service.insert(user);

    expect(messagesService.addSuccess).toHaveBeenCalled();
  });

  it('should return all users', () => {
    expect(service.getAll()).toBeDefined();
  });
});
