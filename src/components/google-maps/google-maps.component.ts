import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'powe-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements AfterViewInit, OnDestroy {

  constructor(private geolocation: Geolocation) {
  }


  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  title = 'angular-gmap';
  route: Array<{ lat: number, lng: number }> = [];
  locationWatch;
  map: google.maps.Map;
  lat = 0;
  lng = 0;

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
      draggable: false,
      scrollwheel: false,
      zoomControl: false,
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


  startRide() {
    this.locationWatch = this.geolocation.watchPosition()
      // .filter((p) => p.coords !== undefined)
      .subscribe(position => {
        console.log(position.coords.longitude + ' ' + position.coords.latitude);

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.route.push({ lat: this.lat, lng: this.lng });
      });
  }

  stopRide() {
    this.locationWatch.unsubscribe();
    console.log(this.route);
  }

  ngOnDestroy(): void {
    this.locationWatch.unsubscribe();
  }
}
