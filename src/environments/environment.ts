// noinspection SpellCheckingInspection
export const environment = {
  production: false,
  serviceHost: 'http://localhost:8080/v1/graphql',
  whitelistedDomains: ['localhost:8100'],
  web: {
    client_id: '1068508048504-gg5q0s8e1urtvuh26ggalf69n54mhi5l.apps.googleusercontent.com',
    project_id: 'powe-273408',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'Wgl5YS1hPb1IyjBwb_3hYTMM',
    javascript_origins: ['http://localhost:8100'],
    scope: 'email profile',
    accessTokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
    resourceUrl: 'https://www.googleapis.com/userinfo/v2/me',
  },
  firebaseConfig: {
    apiKey: 'AIzaSyD50dfyLP68FDQrRDxuAYqFbCWU-Homi2g',
    authDomain: 'powe-273408.firebaseapp.com',
    databaseURL: 'https://powe-273408.firebaseio.com',
    projectId: 'powe-273408',
    storageBucket: 'powe-273408.appspot.com',
    messagingSenderId: '1068508048504',
    appId: '1:1068508048504:web:ff9e0699a089596b2c918d',
    measurementId: 'G-3B5XZ24G10'
  },
  map: {
    apiKey: 'AIzaSyDwRkBoyNJ41eN1CfQlGgfx2UQQjdaRRmQ'
  }
};
