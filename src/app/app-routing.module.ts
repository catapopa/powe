import { UserPage } from './pages/user/user.page';
import { VerifyEmailPage } from './pages/authentication/verify-email/verify-email.page';
import { ForgotPasswordPage } from './pages/authentication/forgot-password/forgot-password.page';
import { RegistrationPage } from './pages/authentication/registration/registration.page';
import { LoginPage } from './pages/authentication/login/login.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from 'src/app/pages/authentication/home/home.page';
import { RoutePage } from './pages/route/route.page';
import { RouteDetailsPage } from './pages/route-details/route-details.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: '',
    loadChildren: () => import('./shared/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'registration',
    component: RegistrationPage
  },
  {
    path: 'verify-email',
    component: VerifyEmailPage
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPage
  },
  {
    path: 'user/:uid',
    component: UserPage
  },
  {
    path: 'route/:id',
    component: RoutePage
  },
  {
    path: 'route-details/:id',
    component: RouteDetailsPage
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
