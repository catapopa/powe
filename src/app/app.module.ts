import { RouteDetailsPage } from './pages/route-details/route-details.page';
import { RoutePage } from './pages/route/route.page';
import { UserPage } from './pages/user/user.page';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HomePage } from 'src/app/pages/authentication/home/home.page';
import { ForgotPasswordPage } from './pages/authentication/forgot-password/forgot-password.page';
import { RegistrationPage } from './pages/authentication/registration/registration.page';
import { VerifyEmailPage } from './pages/authentication/verify-email/verify-email.page';
import { LoginPage } from './pages/authentication/login/login.page';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { google } from 'google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AuthenticationService } from './core/authentication.service';

declare var google: google;

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    VerifyEmailPage,
    RegistrationPage,
    ForgotPasswordPage,
    LoginPage,
    UserPage,
    RoutePage,
    RouteDetailsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
  ],
  providers: [
    AuthenticationService,
    SharedModule,
    StatusBar,
    SplashScreen,
    GooglePlus,
    Geolocation,
    GoogleMaps,
    AndroidPermissions,
    AngularFirestoreModule,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
