import { UserService } from './../../shared/services/user.service';
import { Route } from '../../shared/models/route';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'powe-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  following = true;
  uid: string;
  user: User;
  routes$: Observable<Route[]>;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private router: Router, private userService: UserService) {
  }

  async ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('uid');
    this.user = (await this.db.collection('users').doc<User>(this.uid).get().toPromise()).data() as User;
    this.routes$ = this.db.collection<Route>('routes', ref =>
      ref.where('uid', '==', this.uid).orderBy('datetimeStart', 'desc')
    ).valueChanges({ idField: 'id' });
    this.isFollowing();
  }

  async follow() {
    const authUser = await this.userService.getAuthUserData();
    const following = authUser.following;
    following.push(this.uid);
    this.userService.update({ following });
    this.following = true;
  }

  async unfollow() {
    const authUser = await this.userService.getAuthUserData();
    const following = authUser.following.filter(id => id !== this.uid);
    this.userService.update({ following });
    this.following = false;
  }

  async isFollowing() {
    const authUser = await this.userService.getAuthUserData();
    this.following = authUser.following.includes(this.uid);
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
