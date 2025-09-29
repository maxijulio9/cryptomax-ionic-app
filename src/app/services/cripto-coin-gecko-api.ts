import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, switchMap } from 'rxjs';
import { Cripto } from '../models/cripto';

@Injectable({
  providedIn: 'root'
})
export class CriptoCoinGeckoApi {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  // Buscar por symbol y traer el coin correcto
  getCriptoBySymbol(symbol: string, vsCurrency: string = 'usd'): Observable<Cripto | undefined> {
    const q = symbol.toLowerCase();

    return this.http.get<any>(`${this.apiUrl}/search?query=${q}`).pipe(
      // 1) quedarnos solo con las coincidencias exactas de symbol
      map(res => (res.coins ?? []).filter((c: any) => c.symbol.toLowerCase() === q)),
      // 2) ordenar por market_cap_rank para elegir el más relevante
      map(coins => coins.sort((a: any, b: any) => (a.market_cap_rank ?? 9999) - (b.market_cap_rank ?? 9999))),
      map(coins => coins[0]),

      switchMap(coin => {
        if (!coin) return of(undefined);

        // 3) pedir datos de mercado de esa id
        return this.http.get<any[]>(`${this.apiUrl}/coins/markets`, {
          params: {
            vs_currency: vsCurrency,
            ids: coin.id,
            price_change_percentage: '24h,7d,30d'
          }
        }).pipe(
          map(list => list[0]),
          map(data => {
            if (!data) return undefined;

            return {
              id: data.id,
              symbol: data.symbol,
              name: data.name,
              image: data.image,
              currentPrice: data.current_price,
              marketCapitalization: data.market_cap,
              marketCapRank: data.market_cap_rank,
              priceChangePercentage24h: data.price_change_percentage_24h,
              circulatingSupply: data.circulating_supply,
              totalSupply: data.total_supply,
              maxSupply: data.max_supply,
              ath: data.ath,
              athChangePercentage: data.ath_change_percentage,
              atl: data.atl,
              atlChangePercentage: data.atl_change_percentage,
              lastUpdated: data.last_updated
            } as Cripto;
          })
        );
      })
    );
  }
}
