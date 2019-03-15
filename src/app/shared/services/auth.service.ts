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
    })
  }

  signIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.setUserData(result.user);
      }).catch(error => {
        this.messageService.addError(`An unexpected error has ocurred while trying to sign in with e-mail: ${email}!`);
        console.error(error);
      });
    }
    
    signUp(name, email, password) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.sendVerificationMail();
        this.setUserData(result.user);
        this.afAuth.auth.currentUser.updateProfile({ displayName: name});
        let user: User = {
          uid: result.user.uid,
          displayName: name,
          email: result.user.email,
          emailVerified: result.user.emailVerified
        }
        this.userService.insert(user);
      }).catch(error => {
        this.messageService.addError(`An unexpected error has ocurred while trying to sign up!`);
        console.error(error);
      })
  }

  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      })
  }

  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.messageService.addInfo('Password reset email sent, check your indbox!');
      }).catch(error => {
        this.messageService.addError(`And unexpected error has ocurred!`);
        console.error(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
    }

    return userRef.set(userData, {
      merge: true
    });
  }

  signOut() {
    return this.afAuth.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['sign-in']);
      })
  }
}
