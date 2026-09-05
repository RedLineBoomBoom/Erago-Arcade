export interface NewsArticle {
  id: string;
  outletId: string;
  outletName: string;
  outletIcon: string;
  outletThemeColor: string;
  outletDomain: string;
  title: string;
  summary: string;
  url: string;
  imageUrl: string;
  category: 'Multiplatform' | 'PC & Tech' | 'Industry & Business' | 'Culture & Reviews';
  tag: string;
  publishedAt: string;
  readTime: string;
  isHot?: boolean;
}
