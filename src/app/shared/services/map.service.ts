import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private db: AngularFirestore) { }

  create(route: { lat: number; lng: number; alt: number; }[], datetimeStart: Date) {
    // user
    const uid = JSON.parse(localStorage.getItem('user')).uid;
    const name = JSON.parse(localStorage.getItem('user')).displayName;
    const photoURL = JSON.parse(localStorage.getItem('user')).photoURL;

    // time
    const datetimeStop = new Date();
    const minutes = this.calculateTimeMinutes(datetimeStart, datetimeStop);
    const duration = this.convertTimeHours(minutes);
    // distance
    const meters = this.calculateDistanceMeters(route);
    let distance: string;

    if (meters < 1000) {
      distance = meters + ' m';
    } else {
      distance = this.convertDistanceKilometers(meters);
    }
    // speed
    const speed = this.calculateSpeed(meters, minutes);
    // map preview
    const preview = this.urlPreview(route);

    const routeObj = {
      uid,
      name,
      photoURL,
      datetimeStart,
      datetimeStop,
      route,
      duration,
      distance,
      speed,
      preview
    };

    return this.db.collection('routes').add(routeObj);
  }

  update(id: string, title: string, description: string, location: string, type: string, difficulty: string) {
    return this.db.collection('routes').doc(id).update({
      title,
      description,
      location,
      type,
      difficulty
    });
  }

  // calculate final distance in meters
  calculateDistanceMeters(route) {
    let distance = 0;

    for (let i = 0; i < route.length - 1; i++) {
      const latlngA = new google.maps.LatLng(route[i].lat, route[i].lng);
      const latlngB = new google.maps.LatLng(route[i + 1].lat, route[i + 1].lng);
      const distanceAB = google.maps.geometry.spherical.computeDistanceBetween(latlngA, latlngB);
      distance += distanceAB;
    }
    const result = Math.round(distance);

    return result;
  }

  // convert meters to kilometer
  convertDistanceKilometers(meters: number) {
    const kilometers = meters / 1000;
    const result = Math.round(kilometers); // km

    return result + ' km';
  }

  // calculate activity duration in minutes
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
    if (minutes === 0) { return 'Speed of light'; }

    const speed = meters / minutes;
    const kmh = speed * 0.060; // 1 m / min = 0.060 km / h

    const result = Math.abs(Math.round(kmh));

    return result + ' km/h';
  }

  reverseGeocode(route) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: route[0].lat, lng: route[0].lng };

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

  urlPreview(route) {
    const url = 'https://maps.googleapis.com/maps/api/staticmap?';
    const center = 'center=' + route[0].lat + ',' + route[0].lng;
    const zoom = '&zoom=14';
    const size = '&size=400x200';
    const type = '&maptype=terrain';
    let path = '&path=color:0x0000ff|weight:5';
    const key = '&key=' + environment.map.apiKey;

    route.forEach(element => {
      const lat = element.lat;
      const lng = element.lng;
      const pathLocation = '|' + lat + ',' + lng;
      path += pathLocation;
    });

    const result = url + center + zoom + size + type + path + key;

    return result;
  }
}
