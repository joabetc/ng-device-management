import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from 'src/app/user.service';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private userService: UserService,
    private messageService: MessagesService
    ) {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });
    }
    
    async signIn(email: string, password: string) {
      try {
        const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.userService.get(result.user.uid).subscribe((user: User) => {
          return this.setUserData(user);
        });
      } catch (error) {
        this.messageService.addError(`An unexpected error has ocurred while trying to sign in with e-mail: ${email}!`);
        console.error(error);
      }
    }
    
    async signUp(name: string, workerId: number, email: string, password: string) {
      try {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
        this.sendVerificationMail();
      this.afAuth.auth.currentUser.updateProfile({ displayName: name });
      const user: User = {
        uid: result.user.uid,
        displayName: name,
        workerid: workerId,
        email: result.user.email,
        emailVerified: result.user.emailVerified
      };
      this.setUserData(user);
      this.userService.insert(user);
    } catch (error) {
      this.messageService.addError(`An unexpected error has ocurred while trying to sign up!`);
      console.error(error);
    }
  }
  
  async sendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email']);
  }
  
  async forgotPassword(passwordResetEmail) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      this.messageService.addInfo('Password reset email sent, check your indbox!');
    } catch (error) {
      this.messageService.addError(`And unexpected error has ocurred!`);
      console.error(error);
    }
  }
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  
  setUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      workerid: user.workerid,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    };

    return userRef.set(userData);
  }

  getCurrentUser(): User {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  async isAdmin() {
    try {
      const idTokenResult = await this.afAuth.auth.currentUser.getIdTokenResult(true);
      if (!!idTokenResult.claims.isAdmin) {
        return true;
      }
      return false;
    } catch(error) {
      this.messageService.addError(`An unexpected error has ocurred!`);
      console.error(error);
    }
  }
}
