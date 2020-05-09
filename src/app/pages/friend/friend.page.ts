import { Route } from './../../shared/models/route';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Circle } from 'src/app/shared/models/circle';

@Component({
  selector: 'powe-friend',
  templateUrl: './friend.page.html',
  styleUrls: ['./friend.page.scss'],
})
export class FriendPage {

  following = true;
  uid: string;
  name: string;
  photoURL: string;
  routesRef: AngularFirestoreCollection<Route>;
  routes$: Observable<Route[]>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.getData(this.uid);
    this.isFollowing();
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

  follow() {
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    const circlesRef = this.db.collection('circles/' + uid + '/following').doc(this.uid);

    const circle: Circle = {
      uid: this.uid
    };

    this.following = true;
    return circlesRef.set(circle);
  }

  isFollowing() {
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    const circlesRef = this.db.collection('circles/' + uid + '/following').doc(this.uid);

    circlesRef.get().subscribe((docSnapshot) => {
      this.following = docSnapshot.exists;
    });
  }
}
