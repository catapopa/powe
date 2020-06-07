import { MapService } from '../../shared/services/map.service';
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';
import { google } from 'google-maps';
import { Router } from '@angular/router';

declare var google: google;

@Component({
  selector: 'powe-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements AfterViewInit, OnDestroy {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  isTracking: boolean;
  marker: google.maps.Marker;
  datetimeStart: Date;
  route: Array<{ lat: number, lng: number, alt: number }> = [];
  locationWatch;
  map: google.maps.Map;
  lat = 0;
  lng = 0;
  alt = 0;
  currentMapTrack: any;

  constructor(private geolocation: Geolocation, private router: Router, private mapService: MapService) { }

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

    this.marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
    });

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    this.marker.setMap(this.map);
  }

  moveMarker() {
    const coordinates = new google.maps.LatLng(this.lat, this.lng);

    this.marker.setPosition(coordinates);
    this.map.panTo(coordinates);
  }

  startTracking() {
    this.isTracking = true;
    this.route = [];
    this.datetimeStart = new Date();

    this.locationWatch = this.geolocation.watchPosition()
      .pipe(filter((p) => p.coords !== undefined))
      .subscribe(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.alt = position.coords.altitude;
        this.route.push({ lat: this.lat, lng: this.lng, alt: this.alt });
        this.redrawPath(this.route);
        this.moveMarker();
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

    if (this.route.length !== 2) { // device has moved
      this.mapService.create(this.route, this.datetimeStart)
        .then((docRef) => {
          this.router.navigate(['route-details', docRef.id]);
        })
        .catch((error) => {
          console.error('Error adding route: ', error);
        });
    }
  }

  ngOnDestroy(): void {
    this.locationWatch.unsubscribe();
  }
}
