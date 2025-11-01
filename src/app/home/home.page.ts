import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonBadge,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonMenuButton,
  IonRefresher,
  IonRefresherContent, IonCardSubtitle, IonImg } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonImg, IonCardSubtitle, 
    CommonModule,
    CurrencyPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonBadge,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonMenuButton,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class HomePage {
  arsBalance = 1_250_000.5;
  usdBalance = 243.78;

  private router = inject(Router);

  refreshDone(refresher: any) {
    refresher?.complete?.();
  }

  goToPrices() {
    this.router.navigate(['/prices']);
  }

  goToAdd() {
    console.log('Navigating to add transaction');
    this.router.navigate(['/add-transaction']);
  }

  goToMyCriptos() {
    this.router.navigate(['/my-cryptos']); 
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}
