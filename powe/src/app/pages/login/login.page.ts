// import { Component, OnInit } from '@angular/core';
// import { User, UserInfo } from 'firebase/app';
// import { cfaSignIn, mapUserToUserInfo, cfaSignOut } from 'capacitor-firebase-auth';

// @Component({
//   selector: 'powe-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })

// export class LoginPage implements OnInit {

//   ngOnInit() { }

//   constructor() { }

//   signIn() {
//     cfaSignIn('google.com').pipe(
//       mapUserToUserInfo(),
//     ).subscribe(
//       (user: UserInfo) => console.log(user.displayName)
//     );
//   }

//   signOut() {
//     cfaSignOut().subscribe();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../core/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() { }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['tabs']);
        } else {
          window.alert('Email is not verified');
          return false;
        }
      }).catch((error) => {
        window.alert(error.message);
      });
  }

}
