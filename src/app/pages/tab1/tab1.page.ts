import { Route } from './../../shared/models/route';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'powe-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  routesCollectionRef: AngularFirestoreCollection<Route>;
  routes$: Observable<Route[]>;

  constructor(private db: AngularFirestore) {
    this.getRoutes();
  }

  getRoutes() {
    this.routesCollectionRef = this.db.collection<Route>('routes');
    this.routes$ = this.routesCollectionRef.valueChanges();
  }
}
