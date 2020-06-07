import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userRef: AngularFirestoreDocument<User>;

  constructor(private db: AngularFirestore) {
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    this.userRef = this.db.collection('users').doc<User>(uid);
  }

  getAuthUserRef() {
    return this.userRef;
  }

  async getAuthUserData() {
    return (await this.userRef.get().toPromise()).data() as User;
  }

  update(options: Partial<User>) {
    this.userRef.update(options);
  }

}
