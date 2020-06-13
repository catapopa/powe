import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Route } from 'src/app/shared/models/route';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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
  bio: string;
  location: string;
  lat; lng;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private db: AngularFirestore, private router: Router) {
    this.getUserData();
  }

  getUserData() {
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    const usersRef = this.db.collection('users').doc(uid);

    usersRef.get().subscribe((result) => {
      this.photoURL = result.data().photoURL;
      this.name = result.data().name;
      this.bio = result.data().bio;
      this.location = result.data().location;
    });

    // get routes
    this.routesRef = this.db.collection<Route>('routes', ref =>
      ref.where('uid', '==', uid).orderBy('datetimeStart', 'desc')
    );
    this.routes$ = this.routesRef.valueChanges({ idField: 'id' });
  }

  gotoRoute(route) {
    const id = route.id;
    this.router.navigate(['route', id]);
  }

  gotoNavigation(route) {
    const id = route.id;
    this.router.navigate(['navigate', id]);
  }
}
