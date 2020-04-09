import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'powe-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private googlePlus: GooglePlus) { }

  getData() {
    this.googlePlus.login({
      webClientId: '1068508048504-gg5q0s8e1urtvuh26ggalf69n54mhi5l.apps.googleusercontent.com',
      offline: true
    })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

}
