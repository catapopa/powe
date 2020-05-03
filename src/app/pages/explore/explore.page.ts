import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'powe-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  users: any[];
  filteredUsers: any[];
  searchTerm = '';

  constructor(private db: AngularFirestore, private router: Router) { }

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

  getUser(user) {
    const uid = user.uid;
    this.router.navigate(['friend', uid]);
  }
}
