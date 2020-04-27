import { User } from 'src/app/shared/models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

const GET_USERS = gql`
  {
    users {
      id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation ($email: String!, $fid: String!, $name: String!) {
    insert_users(objects: {email: $email, fid: $fid, name: $name}) {
      affected_rows
      returning {
        id
        fid
        email
      }
    }
  }
 `;

@Component({
  selector: 'powe-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  photoURL: string;
  name: string;

  constructor(private apollo: Apollo, private firstore: AngularFirestore) {
    // this.insertUser();
  }

  ngOnInit() {
    this.getUserData();

  }

  // insertUser() {
  //   this.apollo.mutate({
  //     mutation: ADD_USER,
  //     variables: {
  //       email: 'email',
  //       fid: 'fid',
  //       name: 'nume'
  //     },
  //   }).subscribe(({ data }) => {
  //     console.log(data);
  //   }, (error) => {
  //     console.log('there was an error sending the query', error);
  //   });
  // }

  getUserData() {
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    const docRef = this.firstore.collection('users').doc(uid);

    docRef.get().subscribe((result) => {


      this.photoURL = result.data().photoURL;
      this.name = result.data().name;

      console.log('Document data:', result.data());
    });

    // this.apollo.query<any>({ query: GET_USERS }).subscribe(({ data }) => {
    //   this.users = data.users;
    //   console.log(this.users);
    // });
  }
}
