import { Route } from './../../shared/models/route';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'powe-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  routesRef: AngularFirestoreCollection<Route>;
  routes$: Observable<Route[]>;

  constructor(private db: AngularFirestore, private router: Router) {
    this.getRoutes();
  }

  getRoutes() {
    this.routesRef = this.db.collection<Route>('routes', ref => ref.orderBy('datetimeStart', 'desc'));
    this.routes$ = this.routesRef.valueChanges();
  }

  gotoProfile(route) {
    const uid = route.uid;
    this.router.navigate(['user', uid]);
  }
}
