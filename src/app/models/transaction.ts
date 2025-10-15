export interface Transaction {
  id?: number;
  symbol: string;
  amount: number;
  priceUsd: number;
  exchange: string;
  date: string;
  notes?: string;
}