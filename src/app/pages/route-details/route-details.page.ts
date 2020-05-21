import { Route } from './../../shared/models/route';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'powe-route-details',
  templateUrl: './route-details.page.html',
  styleUrls: ['./route-details.page.scss'],
})
export class RouteDetailsPage {
  id: string;
  route: Route;
  title: string;
  description: string;
  location: string;
  difficulty: string;

  constructor(private activatedRoute: ActivatedRoute, private db: AngularFirestore, private router: Router) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRouteData(this.id);
  }

  getRouteData(id: string) {
    // get routes
    const routeRef = this.db.collection('routes').doc(id);

    routeRef.get().subscribe((result) => {
      this.title = result.data().title;
      this.description = result.data().description;
      this.location = result.data().location;
      this.difficulty = result.data().difficulty;
      this.route = result.data() as Route;
    });
  }

  save() {
    this.db.collection('routes').doc(this.id).update({
      title: this.title,
      description: this.description,
      location: this.location,
      difficulty: this.difficulty
    })
      .then(() => {
        console.log('Route successfully saved!');
      });

    this.router.navigate(['route', this.id]);
  }
}
