import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';

@Component({
  selector: 'powe-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {

  photoURL: string;
  name: string;

  constructor(private firstore: AngularFirestore) {
    this.getUserData();
  }

  getUserData() {
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    const docRef = this.firstore.collection('users').doc(uid);

    docRef.get().subscribe((result) => {
      this.photoURL = result.data().photoURL;
      this.name = result.data().name;
    });
  }
}
