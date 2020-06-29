import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExplorePage } from './explore.page';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GooglePlaceModule,
    RouterModule.forChild([{ path: '', component: ExplorePage }])
  ],
  declarations: [ExplorePage]
})
export class ExplorePageModule {}
