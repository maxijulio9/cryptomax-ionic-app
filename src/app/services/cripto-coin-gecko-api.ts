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

  getCriptoBySymbol(symbol: string, vsCurrency: string = 'usd'): Observable<Cripto | undefined> {
    const q = symbol.toLowerCase();

    return this.http.get<any>(`${this.apiUrl}/search?query=${q}`).pipe(
      map(res => (res.coins ?? []).filter((c: any) => c.symbol.toLowerCase() === q)),
      map(coins => coins.sort((a: any, b: any) => (a.market_cap_rank ?? 9999) - (b.market_cap_rank ?? 9999))),
      map(coins => coins[0]),

      switchMap(coin => {
        if (!coin) return of(undefined);

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


  //trae tokens deprecados an 
  // getAllCryptos(limit: number = 200): Observable<{ id: string; symbol: string; name: string }[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/coins/list`).pipe(
  //     map((list) => list.slice(0, limit)) 
  //   );
  // }
  getAllCryptos(limit: number = 200): Observable<{ id: string; symbol: string; name: string }[]> {
    return this.http.get<any[]>(`${this.apiUrl}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit.toString(),
        page: '1',
        sparkline: 'false'
      }
    }).pipe(
      map((list) =>
        list.map((coin) => ({
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name
        }))
      )
    );
  }

  getAllCryptosCached(limit: number = 200): Observable<{ id: string; symbol: string; name: string; image: string; rank: number }[]> {
    const cacheKey = 'all_cryptos';
    const cacheTimeKey = 'all_cryptos_time';

    const cachedData = localStorage.getItem(cacheKey);
    const cachedTime = localStorage.getItem(cacheTimeKey);

    if (cachedData && cachedTime && Date.now() - +cachedTime < 60 * 60 * 1000) {
      return of(JSON.parse(cachedData));
    }

    return this.http.get<any[]>(`${this.apiUrl}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit.toString(),
        page: '1',
        sparkline: 'false'
      }
    }).pipe(
      map(list =>
        list.map(coin => ({
          id: coin.id,
          symbol: coin.symbol.toUpperCase(),
          name: coin.name,
          image: coin.image,
          rank: coin.market_cap_rank
        }))
      ),
      map(result => {
        localStorage.setItem(cacheKey, JSON.stringify(result));
        localStorage.setItem(cacheTimeKey, Date.now().toString());
        return result;
      })
    );
  }



}
