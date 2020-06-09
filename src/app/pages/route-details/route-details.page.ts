import { AngularFirestore } from '@angular/fire/firestore';
import { Route } from './../../shared/models/route';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MapService } from 'src/app/shared/services/map.service';

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
  type: string;
  difficulty: string;

  constructor(private activatedRoute: ActivatedRoute, private db: AngularFirestore, private router: Router,
    private mapService: MapService) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.difficulty = 'Medium';
    this.getRouteData(this.id);
  }

  getRouteData(id: string) {
    this.db.collection('routes').doc(id).get().subscribe((result) => {
      this.title = result.data().title;
      this.description = result.data().description;
      this.location = result.data().location;
      this.type = result.data().type;
      this.difficulty = result.data().difficulty;
      this.route = result.data() as Route;
    });
  }

  save() {
    this.mapService.update(this.id, this.title, this.description, this.location, this.type, this.difficulty)
      .then(() => {
        console.log('Route successfully saved!');
        this.router.navigate(['tabs/profile']);
      })
      .catch((error) => {
        console.error('Error updating route: ', error);
      });
  }
}
