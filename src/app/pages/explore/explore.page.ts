import { User } from './../../shared/models/user';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MapService } from 'src/app/shared/services/map.service';
import { Route } from 'src/app/shared/models/route';

@Component({
  selector: 'powe-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  users: any[];
  filteredUsers: any[];
  searchTerm = '';
  location: string;
  type: string;
  difficulty: string;
  routes: Observable<Route[]>;

  constructor(private db: AngularFirestore, private router: Router, private mapService: MapService) {
  }

  ngOnInit() {
    this.db.collection('users').valueChanges()
      .subscribe(users => {
        this.users = users;
        this.filteredUsers = users;
      });

    this.difficulty = 'Medium';
  }

  searchUser(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.users = this.filteredUsers;
    this.users = this.users.filter(user => {
      return user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  searchRoute() {
    this.routes = this.mapService.search(this.location, this.type, this.difficulty);
    console.log(this.location);
    console.log(this.type);
    console.log(this.difficulty);
  }

  gotoProfile(user) {
    const uid = user.uid;
    this.router.navigate(['user', uid]);
  }

  gotoRoute(route) {
    const id = route.id;
    this.router.navigate(['route', id]);
  }
}
