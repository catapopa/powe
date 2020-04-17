import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/core/authentication/authentication.service';

@Component({
  selector: 'powe-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

}
