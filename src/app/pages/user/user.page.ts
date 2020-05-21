import { Route } from '../../shared/models/route';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Circle } from 'src/app/shared/models/circle';

@Component({
  selector: 'powe-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {

  following = true;
  cuid: string;
  uid: string;
  name: string;
  photoURL: string;
  routesRef: AngularFirestoreCollection<Route>;
  routes$: Observable<Route[]>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private router: Router) {
    this.cuid = JSON.parse(localStorage.getItem('user')).uid;
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
    this.routes$ = this.routesRef.valueChanges({ idField: 'id' });
  }

  follow() {
    const circlesRef = this.db.collection('circles/' + this.cuid + '/following').doc(this.uid);

    const circle: Circle = {
      uid: this.uid
    };

    this.following = true;
    return circlesRef.set(circle);
  }

  unfollow() {
    const circlesRef = this.db.collection('circles/' + this.cuid + '/following').doc(this.uid).delete();

    this.following = false;
  }

  isFollowing() {
    const circlesRef = this.db.collection('circles/' + this.cuid + '/following').doc(this.uid);

    circlesRef.get().subscribe((docSnapshot) => {
      this.following = docSnapshot.exists;
    });
  }

  gotoRoute(route) {
    const id = route.id;
    this.router.navigate(['route', id]);
  }
}
