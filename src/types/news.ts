export type NewsCategory = 
  | 'All' 
  | 'Multiplatform' 
  | 'PC & Tech' 
  | 'Industry & Business' 
  | 'Culture & Reviews';

export interface NewsOutlet {
  id: string;
  name: string;
  url: string;
  domain: string;
  tagline: string;
  description: string;
  category: 'Multiplatform' | 'PC & Tech' | 'Industry & Business' | 'Culture & Reviews';
  themeColor: string;
  accentColor: string;
  icon: string;
  foundedYear: number;
  focusTags: string[];
  headlineBeats: string[];
}
