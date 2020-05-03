import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { MessagesService } from './shared/services/messages.service';
import { User } from './shared/model/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFireDatabase,
    protected messageService: MessagesService
  ) { }

  insert(user: User) {
    this.db.object(`user/${user.uid}`).set(user)
    .then((result: any) => {
      this.messageService.addSuccess(`The user "${user.displayName}" was successfully saved!`);
    })
    .catch((error: any) => {
        this.messageService.addError(`An eunexpected rror has ocurred while saving ${user.displayName}!`);
        console.error(error);
      });
  }

  update(user: User, key: string) {
    this.db.list('user')
      .update(key, user)
      .then(() => {
        this.messageService.addSuccess(`The user "${user.displayName} was succesfully updated!`);
      })
      .catch((error: any) => {
        this.messageService.addError(`An unexpected error has ocurred while updating ${user.displayName}!`);
        console.log(error);
      });
  }

  getAll() {
    return this.db.list('user')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as object }));
        })
      );
  }

  get(userId: string) {
    return this.db.object(`user/${userId}`)
      .snapshotChanges()
      .pipe(
        map(user => ({...user.payload.val() as object}))
      );
  }

  delete(key: string) {
    this.db.object(`user/${key}`)
      .remove()
      .then(() => this.messageService.addSuccess('User successfully removed!'))
      .catch((error) => {
        this.messageService.addError('An unexpected error has ocurred while deleting user!');
        console.error(error);
      });
  }
}
