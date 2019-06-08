import { User } from 'src/app/shared/model/user';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceMock {
  constructor() { }

  async signIn(email: string, password: string) { }

  async signUp(name: string, workerId: number, email: string, password: string) { }

  async sendVerificationMail() { }

  async forgotPassword(passwordResetEmail) { }

  get isLoggedIn(): boolean {
    return true;
  }

  setUserData(user: User) { }

  getCurrentUser(): User {
    const user: User = {
      uid: 'XXXXXXXX',
      email: 'user@email.com',
      workerid: 12345,
      displayName: 'XXXXX',
      emailVerified: true
    }
    return user;
  }

  async signOut() { }
}