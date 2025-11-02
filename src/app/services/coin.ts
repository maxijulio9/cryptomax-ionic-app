import { inject, Injectable } from '@angular/core';
import { CriptoCoinGeckoApi } from './cripto-coin-gecko-api';

export interface Coin {
  symbol: string;       
  name: string;      
  image: string;       
  description: string;
}

@Injectable({ providedIn: 'root' })
export class CoinService {

  private criptoApi = inject(CriptoCoinGeckoApi);

  private readonly coins: Coin[] = [
    { symbol:'BTC', name:'Bitcoin',  image:'assets/coins/icon-bitcoin1.png',  description:'Primera cripto descentralizada.' },
    { symbol:'ETH', name:'Ethereum', image:'assets/coins/icon-ethereum.png',  description:'Plataforma de smart contracts.' },
    { symbol:'USDT',name:'Tether',   image:'assets/coins/icon-usdt.png', description:'Stablecoin vinculada al USD.' },
    { symbol:'BNB', name:'BNB',      image:'assets/coins/icon-bnb.png',  description:'Token nativo de BNB Chain.' },
    { symbol:'SOL', name:'Solana',   image:'assets/coins/icon-solana.png',  description:'Blockchain de alto rendimiento.' },
    { symbol:'XRP', name:'XRP',      image:'assets/coins/favicon.png',  description:'Pagos rápidos y de bajo costo.' },
        { symbol:'XRP', name:'XRP',      image:'assets/coins/favicon.png',  description:'Pagos rápidos y de bajo costo.' },
    { symbol:'XRP', name:'XRP',      image:'assets/coins/favicon.png',  description:'Pagos rápidos y de bajo costo.' },

  ];

  // getAll(): Coin[] {
  //   return this.coins;
  // }

  getAll() {
    return this.criptoApi.getAllCryptosCached();
  }

  getBySymbol(symbol: string): Coin | undefined {
    const s = symbol.trim().toUpperCase();
    return this.coins.find(c => c.symbol.toUpperCase() === s);
  }
}
