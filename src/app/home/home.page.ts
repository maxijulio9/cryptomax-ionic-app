import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonSearchbar, IonRefresher, IonRefresherContent, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';

import { CoinCardComponent } from '../components/coin-card/coin-card.component';
import { Coin, CoinService } from '../services/coin';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonButtons,
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonGrid, IonRow, IonCol,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonSearchbar, IonRefresher, IonRefresherContent,
    CoinCardComponent, IonMenuButton],
})
export class HomePage {
  arsBalance = 1_250_000.50;
  usdBalance = 243.78;

  private coinSvc = inject(CoinService);
  private router = inject(Router);

  private search$ = new BehaviorSubject<string>('');

  coins$: Observable<Coin[]> = this.search$.pipe(
    startWith(''),
    map(q => (q ?? '').trim().toLowerCase()),
    map(q => {
      const all = this.coinSvc.getAll();
      if (!q) return all;
      return all.filter(c =>
        c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q)
      );
    })
  );

  onSearch(ev: CustomEvent) {
    const q = (ev.detail as any)?.value ?? '';
    this.search$.next(q);
  }

  refreshDone(refresher: any) {
    this.search$.next(this.search$.value);
    refresher?.complete?.();
  }

  goToDetail(symbol: string) {
    this.router.navigate(['/coin', symbol]);
  }
}
