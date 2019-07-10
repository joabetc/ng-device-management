import { User } from 'src/app/shared/model/user';
import { of } from 'rxjs';

export class UserServiceMock {

  insert(user: User) { }

  update(user: UserServiceMock, key: string) { }

  getAll() {
    return of([]);
  }

  get(userId: string) {
    return of({});
  }

  delete(key: string) { }
}
