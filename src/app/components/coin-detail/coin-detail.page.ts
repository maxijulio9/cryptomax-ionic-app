import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  IonBadge, IonButton, IonIcon, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';

import { CommonModule, DecimalPipe, DatePipe, CurrencyPipe } from '@angular/common';
import { Cripto } from '../../models/cripto';
import { CriptoCoinGeckoApi } from '../../services/cripto-coin-gecko-api';

@Component({
  standalone: true,
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.page.html',
  styleUrls: ['./coin-detail.page.scss'],
  imports: [IonRefresherContent, IonRefresher, IonIcon, IonButton, 
    CommonModule, DecimalPipe, DatePipe, CurrencyPipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButtons, IonBackButton, IonImg,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonNote, IonList, IonText, IonBadge
  ],
})
export class CoinDetailPage implements OnInit, AfterViewInit {


  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private coinApi = inject(CriptoCoinGeckoApi);

  coin?: Cripto;
  private symbol: string = '';

  ngOnInit() {
    this.symbol = this.route.snapshot.paramMap.get('symbol') ?? '';
    if (!this.symbol) return;

    // this.coinApi.getCriptoBySymbol(this.symbol).subscribe({
    //   next: (data: Cripto | undefined) => {
    //     this.coin = data;
    //     // cuando llega la data, insertamos el widget
    //     setTimeout(() => this.loadWidget('tradingview-widget', this.tradingViewSymbol), 0);
    //   },
    //   error: (err: any) => {
    //     console.error('Error al obtener el detalle de la moneda', err);
    //   },
    // });
    this.loadCoinData();
  }

  loadCoinData(refresher?: any) {
        if (!this.symbol) {
            if (refresher) refresher.complete();
            return;
        }

        this.coinApi.getCriptoBySymbol(this.symbol).subscribe({
            next: (data: Cripto | undefined) => {
                this.coin = data;

                // 1. Recargar el widget
                if (this.coin) {
                    this.loadWidget('tradingview-widget', this.tradingViewSymbol);
                }

                // 2. Detener el spinner si es un evento de refresh
                if (refresher) {
                    refresher.complete();
                }
            },
            error: (err: any) => {
                console.error('Error al obtener el detalle de la moneda', err);
                // Asegurar que el spinner se detiene incluso si hay un error
                if (refresher) {
                    refresher.complete();
                }
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


 addTransaction() {
  if (!this.coin) return;
  this.router.navigate(['/add-crypto'], {
    queryParams: { symbol: this.coin.symbol }
  });
}

  refreshPage(refresher: any) {
    //recargar los datos de la pagina
    this.loadCoinData(refresher);
  }
}
