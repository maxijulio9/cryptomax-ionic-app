export interface Cripto {
  id: string;
  symbol: string;
  name: string;
  image?: string;

  currentPrice: number;

  prices?: {
    usd: number;
    ars?: number;
    eur?: number;
  };

  marketCapitalization?: number;
  marketCapRank?: number;
  volume24h?: number;
  ath?: number;
  atl?: number;



  priceChangePercentage24h?: number;
  priceChangePercentage7d?: number;

  circulatingSupply?: number;
  totalSupply?: number;
  maxSupply?: number;
  lastUpdated?: string;

  genesisDate?: string;
  description?: string;
  homepage?: string;

  historicalPrices7d?: number[];
}
