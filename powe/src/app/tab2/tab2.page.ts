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
      console.log('Latitude: ', resp.coords.latitude);
      console.log('Longitude: ', resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // console.log('accuracy: ', data.coords.accuracy);
      // console.log('altitude: ', data.coords.altitude);
    });
  }

}
