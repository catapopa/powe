import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/shared/models/user';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  userData: any;

  constructor(public db: AngularFirestore, public fireauth: AngularFireAuth, public router: Router) {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigate(['tabs']);
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  // Login in with email/password
  async SignIn(email, password) {
    const result = await this.fireauth.signInWithEmailAndPassword(email, password);
    this.SetUserData(result.user);
  }

  // Register user with email/password
  async RegisterUser(email, password) {
    const result = await this.fireauth.createUserWithEmailAndPassword(email, password);
    this.SetUserData(result.user);
  }

  // Email verification when new user register
  async SendVerificationMail() {
    await firebase.auth().currentUser.sendEmailVerification();
    this.router.navigate(['verify-email']);
  }

  // Recover password
  async PasswordRecover(passwordResetEmail) {
    try {
      await this.fireauth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email has been sent, please check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  // Returns true when user is logged in
  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false);
  }

  // Returns true when user's email is verified
  isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false);
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  async AuthLogin(provider: auth.AuthProvider) {
    try {
      const result = await this.fireauth.signInWithPopup(provider);
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  // Store user in localStorage
  async SetUserData(user) {
    const userRef = this.db.collection('users').doc<User>(user.uid);
    const userDetails =  (await this.db.collection('users').doc<User>(user.uid).get().toPromise()).data() as User;

    const userData: User = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      following: userDetails.following ? userDetails.following : [],
      bio: userDetails.bio ? userDetails.bio : '-',
      location: userDetails.location ? userDetails.location : '-'
    };

    return userRef.set(userData);
  }

  // Sign-out
  async SignOut() {
    await this.fireauth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
