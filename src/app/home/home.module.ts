import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidemenuComponent } from './slidemenu/slidemenu.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: SlidemenuComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      // {
      //   path: 'ride_history',
      //   loadChildren: () =>
      //     import('../ride-history/ride-history.module').then(
      //       (m) => m.RideHistoryModule
      //     ),
      // },
      // {
      //   path: 'wallet',
      //   loadChildren: () =>
      //     import('../wallet/wallet.module').then((m) => m.WalletModule),
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('../profile/profile.module').then((m) => m.ProfileModule),
      // },
    ],
  },
];

@NgModule({
  declarations: [SlidemenuComponent, HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    IonicModule,

  ],
})
export class HomeModule { }
