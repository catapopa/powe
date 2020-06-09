import { UserService } from './../../shared/services/user.service';
import { Route } from './../../shared/models/route';
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
  routes: Observable<Route[]> = null;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private db: AngularFirestore, private router: Router, private userService: UserService) {
    this.getRoutes();
  }

  async getRoutes() {
    const user = await this.userService.getAuthUserRef().get().toPromise();
    const following = user.get('following');

    if (following.length > 0) {
      this.routes = this.db.collection<Route>('routes', ref =>
        ref.where('uid', 'in', following).orderBy('datetimeStart', 'desc'))
        .valueChanges();
    }
  }

  gotoProfile(route) {
    const uid = route.uid;

    this.router.navigate(['user', uid]);
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
