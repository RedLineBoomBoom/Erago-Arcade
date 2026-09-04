export type GameEra = 'All' | 'Retro 80-90s' | '3D Pioneer' | 'Golden 2000s' | 'Modern Era';

export type TriviaTag = 
  | 'All'
  | 'Hardware Hack' 
  | 'Glitch Lore' 
  | 'Dev Secret' 
  | 'Cut Content' 
  | 'Easter Egg' 
  | 'Mind-Blower';

export interface TriviaColorTheme {
  primary: string;       // e.g. '#FF2A85'
  secondary: string;     // e.g. '#FFE600'
  accent: string;        // e.g. '#00F5D4'
  bgGradient: string;    // e.g. 'from-[#FF2A85]/20 via-[#14161F] to-[#0B0C10]'
  badgeColor: string;    // CSS class or hex
}

export interface TriviaItem {
  id: string;
  gameTitle: string;
  releaseYear: number;
  platform: string;
  developer: string;
  genre: string;
  era: 'Retro 80-90s' | '3D Pioneer' | 'Golden 2000s' | 'Modern Era';
  tag: 'Hardware Hack' | 'Glitch Lore' | 'Dev Secret' | 'Cut Content' | 'Easter Egg' | 'Mind-Blower';
  headline: string;
  story: string;
  mindblownScore: number; // 80 - 100
  rarityTier: 'COMMON VINTAGE' | 'RARE COLLECTIBLE' | 'LEGENDARY SECRET' | 'CURSED ANOMALY';
  quoteOrLore?: string;
  verifiedFact: string;
  easterEggNote?: string;
  theme: TriviaColorTheme;
  quizQuestion: string;
  quizOptions: string[];
  quizAnswerIndex: number;
  quizExplanation: string;
}

export type ViewMode = 'arcade' | 'lookbook' | 'quiz' | 'cheats';

