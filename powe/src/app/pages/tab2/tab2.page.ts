import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'powe-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private geolocation: Geolocation) { }

  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('current position: ', resp.coords);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log('watch data: ', data.coords);
    });
  }

}
