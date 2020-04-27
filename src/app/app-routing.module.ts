import { AuthGuardService } from './core/auth-guard.service';
import { VerifyEmailPage } from './pages/verify-email/verify-email.page';
import { ForgotPasswordPage } from './pages/forgot-password/forgot-password.page';
import { RegistrationPage } from './pages/registration/registration.page';
import { LoginPage } from './pages/login/login.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from 'src/app/pages/home/home.page';

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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
