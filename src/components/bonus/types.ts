export type MiniGameId = 
  | 'memory-match' 
  | 'pixel-invaders' 
  | 'cyber-snake' 
  | 'brick-breaker' 
  | 'speed-reflex';

export interface MiniGameMeta {
  id: MiniGameId;
  title: string;
  subtitle: string;
  genre: string;
  difficulty: 'EASY' | 'NORMAL' | 'HARD' | 'REFLEX';
  icon: string;
  themeColor: string;
  description: string;
  controls: string;
  storageKey: string;
}

export const MINI_GAMES_CATALOG: MiniGameMeta[] = [
  {
    id: 'memory-match',
    title: 'CARTRIDGE MEMORY RUSH',
    subtitle: '30-SECOND RETRO SPEED MATCH',
    genre: 'Memory & Puzzle',
    difficulty: 'NORMAL',
    icon: '🧠',
    themeColor: '#00F5D4',
    description: 'Flip and match 6 pairs of iconic retro gaming cartridges and character symbols before the 30-second clock expires.',
    controls: 'Click / Tap to flip cards',
    storageKey: 'erago_bonus_highscore',
  },
  {
    id: 'pixel-invaders',
    title: 'PIXEL INVADERS: BUG BLASTER',
    subtitle: 'CLASSIC 8-BIT SHMUP DEFENDER',
    genre: 'Shoot \'Em Up',
    difficulty: 'HARD',
    icon: '👾',
    themeColor: '#FF2A85',
    description: 'Defend the retro memory arcade from descending waves of corrupted pixel bugs. Blast them with laser cannons!',
    controls: 'Arrow Keys / A-D to Move • [SPACE] or Click to Shoot',
    storageKey: 'erago_invaders_highscore',
  },
  {
    id: 'cyber-snake',
    title: 'CYBER SNAKE 90s',
    subtitle: 'NEO-RETRO GRID COLLECTOR',
    genre: 'Arcade Classic',
    difficulty: 'NORMAL',
    icon: '🐍',
    themeColor: '#00F566',
    description: 'Guide the pixel viper to devour floppy disks and cartridges. Grow longer without colliding into the cyber grid walls.',
    controls: 'Arrow Keys / WASD or On-Screen D-Pad',
    storageKey: 'erago_snake_highscore',
  },
  {
    id: 'brick-breaker',
    title: 'CARTRIDGE BRICK BREAKER',
    subtitle: 'ARKANOID WALL SMASHER',
    genre: 'Breakout Action',
    difficulty: 'NORMAL',
    icon: '🧱',
    themeColor: '#FFE600',
    description: 'Control the magnetic arcade paddle to bounce the pixel ball and smash rows of neon cartridge bricks.',
    controls: 'Mouse / Touch / Arrow Keys to move paddle',
    storageKey: 'erago_breaker_highscore',
  },
  {
    id: 'speed-reflex',
    title: 'SPEEDRUNNER REFLEX TEST',
    subtitle: 'MILLISECOND QUICK-DRAW',
    genre: 'Reaction Test',
    difficulty: 'REFLEX',
    icon: '⚡',
    themeColor: '#9D4EDD',
    description: 'Wait for the red signal to flash NEON GREEN, then click instantly to measure your reaction time in milliseconds.',
    controls: 'Click / Spacebar immediately on GREEN',
    storageKey: 'erago_reflex_best',
  },
];
