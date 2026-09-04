import { sound } from '../audio/soundEngine';
import { triggerArcadeConfetti } from './arcadeConfetti';

export interface Achievement {
  id: string;
  title: string;
  badge: string;
  description: string;
  unlockedAt?: number;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: 'FIRST_COIN',
    title: 'First Quarter',
    badge: '🪙',
    description: 'Rolled your first random game trivia cartridge.',
  },
  {
    id: 'KONAMI_CODE',
    title: 'Konami Disciple',
    badge: '🕹️',
    description: 'Entered the legendary Konami Code (↑ ↑ ↓ ↓ ← → ← → B A).',
  },
  {
    id: 'ARCHIVE_INSPECTOR',
    title: 'Archival Detective',
    badge: '🔍',
    description: 'Inspected archival character dossiers or game artifacts.',
  },
  {
    id: 'QUIZ_MASTER',
    title: 'Galaxy Brain',
    badge: '🧠',
    description: 'Answered a trivia quiz question correctly.',
  },
  {
    id: 'BGM_LISTENER',
    title: 'Chiptune Connoisseur',
    badge: '📻',
    description: 'Activated the procedural 8-bit ambient chiptune audio.',
  },
  {
    id: 'CRT_PURIST',
    title: 'Retro Purist',
    badge: '📺',
    description: 'Activated the CRT phosphors and scanlines display filter.',
  },
  {
    id: 'CHEAT_COLLECTOR',
    title: 'Code Hunter',
    badge: '💾',
    description: 'Copied an authentic cheat code to your clipboard.',
  },
  {
    id: 'STICKER_BOMBER',
    title: 'Rad Tagger',
    badge: '🎨',
    description: 'Slapped a 90s retro sticker on the arcade canvas.',
  },
  {
    id: 'BONUS_CHAMPION',

    title: 'Bonus Stage Hero',
    badge: '🏆',
    description: 'Cleared a retro arcade bonus mini-game.',
  },
  {
    id: 'BOSS_CHAMPION',
    title: 'Boss Slayer',
    badge: '⚔️',
    description: 'Defeated a legendary retro boss in the Trivia Boss Rush.',
  },
  {
    id: 'CHIPTUNE_DJ',
    title: 'FM Radio DJ',
    badge: '📻',
    description: 'Tuned into a synthetic track on Chiptune FM Jukebox.',
  },
  {
    id: 'DOS_HACKER',
    title: 'MS-DOS Hacker',
    badge: '📟',
    description: 'Executed an interactive command in the C:\\ERAGO> Terminal.',
  },
  {
    id: 'CARD_COLLECTOR',
    title: 'Card Binder Collector',
    badge: '🃏',
    description: 'Inspected and flipped a holographic trivia trading card.',
  },
];


const STORAGE_KEY = 'erago_achievements';

type AchievementListener = (achievement: Achievement) => void;
const listeners: AchievementListener[] = [];

export function getUnlockedAchievements(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function subscribeToAchievements(cb: AchievementListener) {
  listeners.push(cb);
  return () => {
    const idx = listeners.indexOf(cb);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export function unlockAchievement(id: string): boolean {
  if (typeof window === 'undefined') return false;

  const current = getUnlockedAchievements();
  if (current[id]) return false; // Already unlocked

  const def = ACHIEVEMENTS_LIST.find((a) => a.id === id);
  if (!def) return false;

  const updated = { ...current, [id]: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage issues
  }

  // Play fanfare and trigger celebratory confetti!
  sound.play1Up();
  triggerArcadeConfetti(window.innerWidth / 2, 80, 50);

  const unlockedAchievement = { ...def, unlockedAt: updated[id] };
  listeners.forEach((cb) => cb(unlockedAchievement));

  return true;
}
