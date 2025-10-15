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
    path: 'add-crypto',
    loadComponent: () => import('./pages/add-crypto/add-crypto.page').then( m => m.AddCryptoPage)
  },
  {
    path: 'contact-support',
    loadComponent: () => import('./pages/contact-support/contact-support.page').then( m => m.ContactSupportPage)
  },
];
