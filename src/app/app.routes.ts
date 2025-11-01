import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
   { 
    path: 'coin/:symbol', loadComponent: () => import('./components/coin-detail/coin-detail.page').then(m => m.CoinDetailPage) 
  },
  {
    path: 'coin-detail',
    loadComponent: () => import('./components/coin-detail/coin-detail.page').then( m => m.CoinDetailPage)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.page').then( m => m.AboutPage)
  },
  {
    path: 'prices',
    loadComponent: () => import('./pages/prices/prices.page').then( m => m.PricesPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'add-transaction',
    loadComponent: () => import('./pages/add-transaction/add-transaction.page').then( m => m.AddTransactionPage)
  },
  {
    path: 'contact-support',
    loadComponent: () => import('./pages/contact-support/contact-support.page').then( m => m.ContactSupportPage)
  },
  {
    path: 'my-cryptos',
    loadComponent: () => import('./pages/my-cryptos/my-cryptos.page').then( m => m.MyCryptosPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
];
