import { Route } from './../../shared/models/route';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'powe-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage {

  name: string;
  photoURL: string;
  routesRef: AngularFirestoreCollection<Route>;
  routes$: Observable<Route[]>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    const uid = this.route.snapshot.paramMap.get('uid');
    this.getData(uid);
  }

  getData(uid: string) {
    const usersRef = this.db.collection('users').doc(uid);

    usersRef.get().subscribe((result) => {
      this.name = result.data().name;
      this.photoURL = result.data().photoURL;
    });

    // get routes
    this.routesRef = this.db.collection<Route>('routes', ref =>
      ref.where('uid', '==', uid).orderBy('datetimeStart', 'desc')
    );
    this.routes$ = this.routesRef.valueChanges();
  }
}
