import { AuthenticationService } from '../../core/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'powe-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

}
