import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NavigatePageRoutingModule } from './navigate-routing.module';

import { NavigatePage } from './navigate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavigatePageRoutingModule
  ],
  declarations: [NavigatePage]
})
export class NavigatePageModule {}
