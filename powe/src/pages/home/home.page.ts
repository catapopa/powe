import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/core/authentication/authentication.service';

@Component({
  selector: 'powe-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

}
