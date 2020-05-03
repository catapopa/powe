import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';
import { google } from 'google-maps';
import { AngularFirestore } from '@angular/fire/firestore';

declare var google: google;

@Component({
  selector: 'powe-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit, OnDestroy {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  isTracking: boolean;
  datetimeStart: Date;
  route: Array<{ lat: number, lng: number }> = [];
  locationWatch;
  map: google.maps.Map;
  lat = 0;
  lng = 0;
  currentMapTrack: any;

  constructor(private geolocation: Geolocation, private db: AngularFirestore) { }

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
    this.datetimeStart = new Date();

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

    // the user has moved
    if (this.route.length !== 1) {
      // user
      const uid = JSON.parse(localStorage.getItem('user')).uid;
      const name = JSON.parse(localStorage.getItem('user')).displayName;
      const photoURL = JSON.parse(localStorage.getItem('user')).photoURL;
      // time
      const datetimeStop = new Date();
      const minutes = this.calculateTimeMinutes(this.datetimeStart, datetimeStop);
      const duration = this.convertTimeHours(minutes);
      // distance
      const meters = this.calculateDistanceMeters();
      const distance = this.convertDistanceKilometers(meters);
      // speed
      const speed = this.calculateSpeed(meters, minutes);

      const routeDetails = {
        uid,
        name,
        photoURL,
        datetimeStart: this.datetimeStart,
        datetimeStop,
        route: this.route,

        duration,
        distance,
        speed
      };

      this.db.collection('routes').add(routeDetails);
    }
  }

  // calculate final distance
  calculateDistanceMeters() {
    let distance = 0;

    for (let i = 0; i < this.route.length - 1; i++) {
      const latlngA = new google.maps.LatLng(this.route[i].lat, this.route[i].lng);
      const latlngB = new google.maps.LatLng(this.route[i + 1].lat, this.route[i + 1].lng);
      const distanceAB = google.maps.geometry.spherical.computeDistanceBetween(latlngA, latlngB);
      distance += distanceAB;
    }

    const result = Math.round(distance);

    return result;
  }

  // convert meters to kilometer
  convertDistanceKilometers(meters: number) {
    const result = Math.abs(meters / 1000.0); // km

    return result;
  }

  // calculate activity minutes
  calculateTimeMinutes(dt1, dt2) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;

    const result = Math.abs(Math.round(diff));

    return result;
  }

  // convert minutes to hours, minutes
  convertTimeHours(minutes: number) {
    const num = minutes;
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const tminutes = (hours - rhours) * 60;
    const rminutes = Math.round(tminutes);

    return rhours + 'h, ' + rminutes + 'min';
  }

  // calculate speed and convert to km/h
  calculateSpeed(meters: number, minutes: number) {
    const speed = meters / minutes;
    const kmh = speed * 0.060; // 1 m / min = 0.060 km / h

    const result = Math.abs(Math.round(kmh));

    return result;
  }

  reverseGeocode() {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: this.route[0].lat, lng: this.route[0].lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          console.log(results[0].formatted_address);
        } else {
          window.alert('No results found');
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.locationWatch.unsubscribe();
  }
}
