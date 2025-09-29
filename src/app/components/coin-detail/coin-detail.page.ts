import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonImg,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonNote,
  IonList,
  IonText,
  IonBadge
} from '@ionic/angular/standalone';

import { CommonModule, DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { Cripto } from '../../models/cripto';
import { CriptoCoinGeckoApi } from '../../services/cripto-coin-gecko-api';

@Component({
  standalone: true,
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.page.html',
  styleUrls: ['./coin-detail.page.scss'],
  imports: [
    CommonModule, DecimalPipe, DatePipe, CurrencyPipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonImg,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonNote, IonList, IonText, IonBadge
  ],
})
export class CoinDetailPage implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private coinApi = inject(CriptoCoinGeckoApi);

  coin?: Cripto;

  ngOnInit() {
    const symbol = this.route.snapshot.paramMap.get('symbol') ?? '';
    if (!symbol) return;

    this.coinApi.getCriptoBySymbol(symbol).subscribe({
      next: (data: Cripto | undefined) => {
        this.coin = data;
        // cuando llega la data, insertamos el widget
        setTimeout(() => this.loadWidget('tradingview-widget', this.tradingViewSymbol), 0);
      },
      error: (err: any) => {
        console.error('Error al obtener el detalle de la moneda', err);
      },
    });
  }

  ngAfterViewInit() {
    if (this.coin) {
      this.loadWidget('tradingview-widget', this.tradingViewSymbol);
    }
  }

  get tradingViewSymbol(): string {
    if (!this.coin) return '';
    return `BINANCE:${this.coin.symbol.toUpperCase()}USDT`;
  }

  private loadWidget(containerId: string, symbol: string): void {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = ''; // limpiar widget anterior

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: '100%',
      height: 220,
      locale: 'en',
      dateRange: '12M',
      colorTheme: 'dark',
      isTransparent: false,
      autosize: true,
    });

    container.appendChild(script);
  }
}
