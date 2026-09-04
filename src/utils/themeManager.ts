import type { ArcadeThemeId } from '../types/theme';

const THEME_STORAGE_KEY = 'erago_arcade_theme';

export function getActiveTheme(): ArcadeThemeId {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved && ['cyber-memphis', 'game-boy-1989', 'virtual-boy-1995', 'synthwave-2088'].includes(saved)) {
      return saved as ArcadeThemeId;
    }
  } catch {
    // Fallback
  }
  return 'cyber-memphis';
}

export function setActiveTheme(themeId: ArcadeThemeId): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
  } catch {
    // Ignore
  }

  // Remove existing theme classes
  document.documentElement.classList.remove(
    'theme-cyber-memphis',
    'theme-game-boy-1989',
    'theme-virtual-boy-1995',
    'theme-synthwave-2088'
  );

  document.documentElement.classList.add(`theme-${themeId}`);
}
