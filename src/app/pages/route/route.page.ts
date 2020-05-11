import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Route } from 'src/app/shared/models/route';

@Component({
  selector: 'powe-route',
  templateUrl: './route.page.html',
  styleUrls: ['./route.page.scss'],
})
export class RoutePage {

  id: string;
  route: Route;

  constructor(private activatedRoute: ActivatedRoute, private db: AngularFirestore) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getRouteData(this.id);
  }

  getRouteData(id: string) {
    // get routes
    const routeRef = this.db.collection('routes').doc(id);

    routeRef.get().subscribe((result) => {
      this.route = result.data() as Route;
    });
  }
}
