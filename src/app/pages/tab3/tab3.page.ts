import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Route } from 'src/app/shared/models/route';
import { Observable } from 'rxjs';

@Component({
  selector: 'powe-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  routesRef: AngularFirestoreCollection<Route>;
  routes$: Observable<Route[]>;
  photoURL: string;
  name: string;

  constructor(private db: AngularFirestore) {
    this.getUserData();
  }

  getUserData() {
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    const usersRef = this.db.collection('users').doc(uid);

    usersRef.get().subscribe((result) => {
      this.photoURL = result.data().photoURL;
      this.name = result.data().name;
    });

    // get routes
    this.routesRef = this.db.collection<Route>('routes', ref =>
      ref.where('uid', '==', uid).orderBy('datetimeStart', 'desc')
    );
    this.routes$ = this.routesRef.valueChanges();
  }
}
