import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'powe-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  users: any[];
  filteredUsers: any[];
  searchTerm = '';
  routes$: Observable<unknown[]>;

  constructor(private db: AngularFirestore, private router: Router) {
    this.getRoutes();
  }

  ngOnInit() {
    this.db.collection(`users`).valueChanges()
      .subscribe(users => {
        this.users = users;
        this.filteredUsers = users;
      });
  }

  filterList(searchTerm: string) {
    this.searchTerm = searchTerm;

    this.users = this.filteredUsers;

    this.users = this.users.filter(user => {
      return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  gotoProfile(user) {
    const uid = user.uid;
    this.router.navigate(['user', uid]);
  }

  getRoutes() {
    this.routes$ = this.db.collection('routes', ref =>
      ref.orderBy('datetimeStart', 'desc')).valueChanges({ idField: 'id' });
  }

  gotoRoute(route) {
    const id = route.id;
    this.router.navigate(['route', id]);
  }
}
