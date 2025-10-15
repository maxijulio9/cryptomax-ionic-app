import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exchange } from '../models/exchange';



@Injectable({
  providedIn: 'root'
})
export class ExchangesService {
  private baseUrl = 'http://localhost:3000/exchanges';

  constructor(private http: HttpClient) {}

  getAllExchanges(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(this.baseUrl);
  }

  add(exchange: Exchange): Observable<Exchange> {
    return this.http.post<Exchange>(this.baseUrl, exchange);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
