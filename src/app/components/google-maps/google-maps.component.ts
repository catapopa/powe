import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';
import { google } from 'google-maps';
import { AngularFirestore } from '@angular/fire/firestore';

declare var google: google;

@Component({
  selector: 'powe-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  isTracking: boolean;
  title = 'angular-gmap';
  startTime;
  route: Array<{ lat: number, lng: number }> = [];
  locationWatch;
  map: google.maps.Map;
  lat = 0;
  lng = 0;
  currentMapTrack: any;

  constructor(private geolocation: Geolocation, private firestore: AngularFirestore) { }

  ngAfterViewInit() {
    this.getLocation();
  }

  async getLocation() {
    try {
      const resp = await this.geolocation.getCurrentPosition();
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.mapInitializer();
    } catch (error) {
      console.log('Error getting location', error);
    }
  }

  mapInitializer() {
    const coordinates = new google.maps.LatLng(this.lat, this.lng);
    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 14,
      scrollwheel: false,
      disableDoubleClickZoom: true,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    };

    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
    });

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    marker.setMap(this.map);
  }

  startTracking() {
    this.isTracking = true;
    this.route = [];
    this.startTime = new Date();

    this.locationWatch = this.geolocation.watchPosition().pipe(filter((p) => p.coords !== undefined))
      .subscribe(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.route.push({ lat: this.lat, lng: this.lng });
        this.redrawPath(this.route);
      });
  }

  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  stopTracking() {
    this.isTracking = false;
    this.locationWatch.unsubscribe();

    if (this.route.length !== 1) {

      // const geocoder = new google.maps.Geocoder();
      // const latlng = { lat: this.route[0].lat, lng: this.route[0].lng };
      // geocoder.geocode({ location: latlng }, (results, status) => {
      //   if (status === 'OK') {
      //     if (results[0]) {
      //       console.log(results[0].formatted_address);
      //     } else {
      //       window.alert('No results found');
      //     }
      //   }
      // });

      const uid = JSON.parse(localStorage.getItem('user')).uid;
      const distance = this.calculateDistance();
      const stopTime = new Date();
      const time = this.calculateTime(this.startTime, stopTime);

      const routeDetails = {
        uid,
        route: this.route,
        startTime: this.startTime,
        stopTime,
        time,
        distance
      };

      this.firestore.collection('routes').add(routeDetails);
    }
  }

  // calculate final distance
  calculateDistance() {
    let distance = 0;

    for (let i = 0; i < this.route.length - 1; i++) {
      const latlngA = new google.maps.LatLng(this.route[i].lat, this.route[i].lng);
      const latlngB = new google.maps.LatLng(this.route[i + 1].lat, this.route[i + 1].lng);
      const distanceAB = google.maps.geometry.spherical.computeDistanceBetween(latlngA, latlngB);
      distance += distanceAB;
    }

    return distance * 0.001; // km
  }

  calculateTime(dt1, dt2) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;

    const result = Math.abs(Math.round(diff));
    console.log(result);
    return result;
  }

  ngOnDestroy(): void {
    this.locationWatch.unsubscribe();
  }
}
