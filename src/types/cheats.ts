export type CheatPlatform = 
  | 'All'
  | 'NES / SNES' 
  | 'Sega Genesis' 
  | 'PlayStation / PS2' 
  | 'PC / MS-DOS' 
  | 'Nintendo 64' 
  | 'Modern (2010s-2024)'
  | 'Multiplatform';


export type CheatCategory = 
  | 'All'
  | 'Invincibility'
  | 'Weapons & Ammo'
  | 'Vehicles & Spawns'
  | 'Level Skip & Warp'
  | 'Money & Economy'
  | 'Hilarious & Fun';

export interface CheatCodeItem {
  id: string;
  gameTitle: string;
  releaseYear: number;
  platform: 'NES / SNES' | 'Sega Genesis' | 'PlayStation / PS2' | 'PC / MS-DOS' | 'Nintendo 64' | 'Modern (2010s-2024)' | 'Multiplatform';

  category: 'Invincibility' | 'Weapons & Ammo' | 'Vehicles & Spawns' | 'Level Skip & Warp' | 'Money & Economy' | 'Hilarious & Fun';
  cheatName: string;
  code: string;
  inputTokens?: string[]; // e.g. ['UP', 'UP', 'DOWN', 'DOWN', 'LEFT', 'RIGHT', 'LEFT', 'RIGHT', 'B', 'A']
  inputType: 'Gamepad Sequence' | 'Keyboard Phrase' | 'Developer Console';
  effect: string;
  instructions: string;
  devLore: string;
  badgeColor: string;
  franchise?: string;
  isCustom?: boolean;
}

