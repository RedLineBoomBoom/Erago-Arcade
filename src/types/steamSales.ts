export interface SteamSaleItem {
  id: string;
  appId: string;
  title: string;
  normalPrice: number;
  salePrice: number;
  discountPercent: number;
  savings: number;
  steamRatingPercent?: number;
  steamRatingText?: string;
  steamRatingCount?: number;
  dealRating?: number;
  bannerUrl: string;
  steamUrl: string;
  steamDbUrl: string;
  releaseDate?: number | string;
  endsAt?: number;
  isHistoricalLow?: boolean;
  tags?: string[];
  category?: 'AAA' | 'Indie' | 'Retro' | 'Classic' | 'Multiplayer' | 'Top Rated';
}

export type DiscountTierFilter = 'all' | '75plus' | '50plus' | 'under5' | 'under10' | 'topRated';
export type SalesSortOption = 'discount' | 'rating' | 'priceAsc' | 'dealRating' | 'title';
export type CurrencyMode = 'USD' | 'IDR';

export interface SteamSalesState {
  items: SteamSaleItem[];
  lastUpdated: number;
  isLoading: boolean;
  error?: string | null;
}
