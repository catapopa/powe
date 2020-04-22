import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'powe-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit {

  map: any;

  constructor() { }

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.664 },
      zoom: 8
    });
  }

}
