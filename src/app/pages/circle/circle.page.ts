import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'powe-circle',
  templateUrl: 'circle.page.html',
  styleUrls: ['circle.page.scss']
})
export class CirclePage {

  circlesRef: AngularFirestoreCollection<any>;
  routes$: Observable<unknown[]>;

  constructor(private db: AngularFirestore, private router: Router) {
    const uid = JSON.parse(localStorage.getItem('user')).uid;

    this.circlesRef = this.db.collection('circles/' + uid + '/following');
    this.getRoutes();
  }

  // getRoutes() {
  //   this.circlesRef.get().subscribe(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       const ruid = doc.id;

  //       this.routesRef = this.db.collection<Route>('routes/' + ruid + '/userRoutes', ref =>
  //         ref.orderBy('datetimeStart', 'desc')
  //       );
  //       this.routes$ = this.routesRef.valueChanges({ idField: 'id' });
  //     });
  //   });
  // }

  getRoutes() {
    this.routes$ = this.db.collection('routes', ref =>
      ref.orderBy('datetimeStart', 'desc')).valueChanges({ idField: 'id' });
  }

  gotoProfile(route) {
    const uid = route.uid;

    this.router.navigate(['user', uid]);
  }

  gotoRoute(route) {
    const id = route.id;
    this.router.navigate(['route', id]);
  }
}
