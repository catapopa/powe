import { environment } from 'src/environments/environment';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions,
  CameraPosition, MarkerOptions, Marker, Environment
} from '@ionic-native/google-maps';
import { Platform, NavController } from '@ionic/angular';


@Component({
  selector: 'powe-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  map: GoogleMap;

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
