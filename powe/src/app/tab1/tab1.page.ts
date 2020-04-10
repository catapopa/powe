import { Component, OnInit } from '@angular/core';
import { registerWebPlugin } from '@capacitor/core';
import { OAuth2Client } from '@byteowls/capacitor-oauth2';
import { environment } from 'src/environments/environment';

import { Plugins } from '@capacitor/core';


@Component({
  selector: 'powe-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  ngOnInit() {
    console.log('Register custom capacitor plugins');
    registerWebPlugin(OAuth2Client);
    // other stuff
  }

  constructor() { }

  googleLogin() {
    Plugins.OAuth2Client.authenticate({
      appId: environment.web.client_id,
      authorizationBaseUrl: environment.web.auth_uri,
      accessTokenEndpoint: environment.web.accessTokenEndpoint,
      scope: environment.web.scope,
      resourceUrl: environment.web.resourceUrl,
      web: {
        redirectUrl: environment.web.javascript_origins[0],
        windowOptions: 'height=600,left=0,top=0'
      },
      // android: {
      //   appId: environment.oauthAppId.google.android,
      //   responseType: 'code', // if you configured a android app in google dev console the value must be "code"
      //   customScheme: 'com.companyname.appname:/' // package name from google dev console
      // },
      // ios: {
      //   appId: environment.oauthAppId.google.ios,
      //   responseType: 'code', // if you configured a ios app in google dev console the value must be "code"
      //   customScheme: 'com.companyname.appname:/' // Bundle ID from google dev console
      // }
    }).then(resourceUrlResponse => {
      console.log(resourceUrlResponse);
    }).catch(reason => {
      console.error('Google OAuth rejected', reason);
    });
  }
}
