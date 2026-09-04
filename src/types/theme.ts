export type ArcadeThemeId = 
  | 'cyber-memphis' 
  | 'game-boy-1989' 
  | 'virtual-boy-1995' 
  | 'synthwave-2088';

export interface ArcadeThemeMeta {
  id: ArcadeThemeId;
  name: string;
  era: string;
  badge: string;
  colors: [string, string, string, string];
  description: string;
}

export const ARCADE_THEMES: ArcadeThemeMeta[] = [
  {
    id: 'cyber-memphis',
    name: 'CYBER MEMPHIS (DEFAULT)',
    era: '1990s NEO-ARCADE',
    badge: 'DEFAULT 90s',
    colors: ['#00F5D4', '#FF2A85', '#FFE600', '#9D4EDD'],
    description: 'Electric neon cyan, hot pink, arcade yellow, and bold brutalist shadows inspired by 90s Memphis design.',
  },
  {
    id: 'game-boy-1989',
    name: 'GAME BOY CLASSIC DMG-01',
    era: '1989 MONOCHROME',
    badge: '4-SHADE LCD',
    colors: ['#9bbc0f', '#8bac0f', '#306230', '#0f380f'],
    description: 'Nostalgic 4-shade pea-soup monochromatic green LCD matrix with authentic dot-grid phosphor.',
  },
  {
    id: 'virtual-boy-1995',
    name: 'VIRTUAL BOY WIREFRAME',
    era: '1995 DUAL-SCREEN',
    badge: 'CRIMSON RED',
    colors: ['#FF0033', '#CC0029', '#80001A', '#1A0005'],
    description: 'High-contrast stark crimson red lasers and pitch black vacuum from Nintendo\'s legendary 1995 headset.',
  },
  {
    id: 'synthwave-2088',
    name: 'NEO TOKYO SYNTHWAVE',
    era: '2088 CYBERPUNK',
    badge: 'SUNSET NEON',
    colors: ['#00D4FF', '#FF007F', '#8A2BE2', '#FFE600'],
    description: 'Ultra-saturated twilight purple, sunset magenta, and neon cyan cyber grid aesthetic.',
  },
];
