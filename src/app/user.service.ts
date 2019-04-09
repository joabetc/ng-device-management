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
    private messageService: MessagesService
  ) { }

  insert(user: User) {
    this.db.object(`user/${user.uid}`).set(user)
      .then((result: any) => {
        this.messageService.addSuccess(`User "${user.displayName}" successfully saved!`);
      })
      .catch((error: any) => {
        this.messageService.addError(`An error has ocurred while saving ${user.displayName}!`);
        console.error(error);
      })
  }

  update(user: User, key: string) {
    this.db.list('user')
      .update(key, user)
      .catch((error: any) => {
        this.messageService.addError(`An error has ocurred while updating ${user.displayName}!`);
        console.log(error);
      });
  }

  getAll() {
    return this.db.list('user')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        })
      );
  }

  get(userId: string) {
    return this.db.object(`user/${userId}`)
      .snapshotChanges()
      .pipe(
        map(user => ({...user.payload.val()}))
      );
  }

  delete(key: string) {
    this.db.object(`user/${key}`).remove();
  }
}
