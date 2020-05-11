import { AuthGuardService } from '../../core/auth-guard.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    canActivate: [AuthGuardService],
    component: TabsPage,
    children: [
      {
        path: 'circle',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/circle/circle.module').then(m => m.CirclePageModule)
          }
        ]
      },
      {
        path: 'explore',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/explore/explore.module').then(m => m.ExplorePageModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../pages/tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/explore',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/explore',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
