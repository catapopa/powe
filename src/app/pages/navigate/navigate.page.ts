import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from 'src/app/shared/services/map.service';
import { google } from 'google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';


declare var google: google;

@Component({
  selector: 'powe-navigate',
  templateUrl: './navigate.page.html',
  styleUrls: ['./navigate.page.scss'],
})
export class NavigatePage implements AfterViewInit, OnDestroy {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  id: string;
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
  baseRoute: Array<{ lat: number, lng: number, alt: number }> = [];

  constructor(private activatedRoute: ActivatedRoute, private db: AngularFirestore, private router: Router,
    private mapService: MapService, private geolocation: Geolocation) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRouteData(this.id);
  }

  async ngAfterViewInit() {
    await this.getLocation();
  }

  getRouteData(id: string) {
    this.db.collection('routes').doc(id).get().subscribe((result) => {
      this.baseRoute = result.data().route;
      this.mapInitializer();
      this.redrawPath(this.baseRoute, '#0000FF');
    });
  }

  async getLocation() {
    try {
      const resp = await this.geolocation.getCurrentPosition();
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
    } catch (error) {
      console.log('Error getting location', error);
    }
  }

  mapInitializer() {
    const coordinates = new google.maps.LatLng(this.lat, this.lng);
    const baseRouteCoordinates = new google.maps.LatLng(this.baseRoute[0].lat, this.baseRoute[0].lng);
    const mapOptions: google.maps.MapOptions = {
      center: baseRouteCoordinates,
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

    this.locationWatch = this.geolocation.watchPosition().pipe(filter((p) => p.coords !== undefined))
      .subscribe(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.alt = position.coords.altitude;
        this.route.push({ lat: this.lat, lng: this.lng, alt: this.alt });
        this.redrawPath(this.route, '#FF5733');
        this.moveMarker();
      });
  }

  redrawPath(path, strokeColor: string) {
    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor,
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }

  stopTracking() {
    this.isTracking = false;
    this.locationWatch.unsubscribe();

    if (this.route.length !== 1) { // device has moved
      this.mapService.create(this.route, this.datetimeStart)
        .then((docRef) => {
          this.router.navigate(['route-details', docRef.id]);
        })
        .catch((error) => {
          console.error('Error adding route: ', error);
        });
    }
  }

  async cancelTracking() {
    this.isTracking = false;
    this.route = [];
    this.redrawPath(this.route, '#FF5733');
    this.getRouteData(this.id);
    await this.getLocation();
    this.locationWatch.unsubscribe();
  }

  ngOnDestroy() {
    this.locationWatch.unsubscribe();
  }
}
