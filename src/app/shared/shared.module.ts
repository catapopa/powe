import { HttpService } from './http.service';
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';

@Injectable()
@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    HttpService,
  ]
})
export class SharedModule { }
