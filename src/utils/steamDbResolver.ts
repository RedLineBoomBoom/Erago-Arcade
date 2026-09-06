// ============================================================================
// STEAMDB ASSET RESOLVER & MULTI-TIER FALLBACK ENGINE
// Source: https://steamdb.info/
// ============================================================================

export interface SteamDbEntry {
  appId: number;
  steamDbUrl: string;
  name: string;
}

/**
 * 100% Curated and Verified database of SteamDB App IDs for ERAGO ARCADE games.
 * SteamDB (https://steamdb.info/) uses Valve's high-speed, CORS-free Akamai & Cloudflare CDNs.
 * Non-Steam/retro-exclusive console games are intentionally excluded so they retain
 * their authentic retro assets without cross-game contamination.
 */
export const STEAM_DB_MAP: Record<string, { appId: number; name: string }> = {
  't-02': { appId: 489830, name: 'The Elder Scrolls V: Skyrim Special Edition' },
  't-04': { appId: 2131630, name: 'Metal Gear Solid - Master Collection Version' },
  't-06': { appId: 22300, name: 'Fallout 3: Game of the Year Edition' },
  't-07': { appId: 211420, name: 'Dark Souls: Prepare to Die Edition' },
  't-08': { appId: 2280, name: 'DOOM + DOOM II' },
  't-10': { appId: 220, name: 'Half-Life 2' },
  't-11': { appId: 12120, name: 'Grand Theft Auto: San Andreas' },
  't-14': { appId: 586200, name: 'Street Fighter 30th Anniversary Collection' },
  't-15': { appId: 731490, name: 'Crash Bandicoot N. Sane Trilogy' },
  't-16': { appId: 1245620, name: 'Elden Ring' },
  't-17': { appId: 1462040, name: 'FINAL FANTASY VII REMAKE INTERGRADE' },
  't-18': { appId: 400, name: 'Portal' },
  't-20': { appId: 976730, name: 'Halo: The Master Chief Collection' },
  't-21': { appId: 1174180, name: 'Red Dead Redemption 2' },
  't-23': { appId: 2131650, name: 'Metal Gear Solid 3: Snake Eater - Master Collection' },
  't-24': { appId: 289070, name: 'Sid Meier\'s Civilization VI' },
  't-25': { appId: 440, name: 'Team Fortress 2' },
  't-27': { appId: 1091500, name: 'Cyberpunk 2077' },
  't-29': { appId: 7670, name: 'BioShock' },
  't-30': { appId: 391540, name: 'Undertale' },
  't-31': { appId: 1593500, name: 'God of War' },
  't-33': { appId: 613830, name: 'CHRONO TRIGGER' },
  't-34': { appId: 2050650, name: 'Resident Evil 4' },
  't-36': { appId: 70, name: 'Half-Life' },
  't-39': { appId: 1018010, name: 'Castlevania Anniversary Collection' },
  't-40': { appId: 1794960, name: 'Sonic Origins' },
  't-41': { appId: 744050, name: 'Space Invaders Extreme' },
  't-46': { appId: 363440, name: 'Mega Man Legacy Collection' },
  't-54': { appId: 71164, name: 'Streets of Rage 2' },
  't-59': { appId: 1003590, name: 'Tetris Effect: Connected' },
  't-60': { appId: 1018020, name: 'Contra Anniversary Collection' },
  't-63': { appId: 976310, name: 'Mortal Kombat 11' },
  't-73': { appId: 396730, name: 'ARCADE GAME SERIES: DIG DUG' },
  't-81': { appId: 224960, name: 'Tomb Raider I' },
  't-82': { appId: 304240, name: 'Resident Evil HD REMASTER' },
  't-85': { appId: 996580, name: 'Spyro Reignited Trilogy' },
  't-86': { appId: 6910, name: 'Deus Ex: Game of the Year Edition' },
  't-87': { appId: 211600, name: 'Thief Gold' },
  't-88': { appId: 238210, name: 'System Shock 2' },
  't-89': { appId: 813780, name: 'Age of Empires II: Definitive Edition' },
  't-91': { appId: 228280, name: 'Baldur\'s Gate: Enhanced Edition' },
  't-92': { appId: 2395210, name: 'Tony Hawk\'s Pro Skater 1 + 2' },
  't-93': { appId: 316790, name: 'Grim Fandango Remastered' },
  't-95': { appId: 2124490, name: 'SILENT HILL 2' },
  't-96': { appId: 285310, name: 'RollerCoaster Tycoon: Deluxe' },
  't-97': { appId: 466300, name: 'Planescape: Torment: Enhanced Edition' },
  't-98': { appId: 1778820, name: 'TEKKEN 8' },
  't-99': { appId: 13250, name: 'Unreal Gold' },
  't-100': { appId: 1213210, name: 'Command & Conquer Remastered Collection' },
  't-106': { appId: 244160, name: 'Homeworld Remastered Collection' },
  't-107': { appId: 15700, name: 'Oddworld: Abe\'s Oddysee' },
  't-108': { appId: 242550, name: 'Rayman Legends' },
  't-110': { appId: 217200, name: 'Worms Armageddon' },
  't-114': { appId: 297000, name: 'Heroes of Might & Magic III - HD Edition' },
  't-115': { appId: 32360, name: 'The Secret of Monkey Island: Special Edition' },
  't-116': { appId: 434050, name: 'Duke Nukem 3D: 20th Anniversary World Tour' },
  't-117': { appId: 2320, name: 'Quake II' },
  't-118': { appId: 731490, name: 'Crash Bandicoot N. Sane Trilogy' },
  't-119': { appId: 38400, name: 'Fallout: A Post Nuclear Role Playing Game' },
  't-120': { appId: 883710, name: 'Resident Evil 2' },
  't-121': { appId: 12100, name: 'Grand Theft Auto III' },
  't-122': { appId: 976730, name: 'Halo: The Master Chief Collection' },
  't-123': { appId: 2552430, name: 'KINGDOM HEARTS -HD 1.5+2.5 ReMIX-' },
  't-124': { appId: 359870, name: 'FINAL FANTASY X/X-2 HD Remaster' },
  't-126': { appId: 17470, name: 'Dead Space (2008)' },
  't-127': { appId: 13600, name: 'Prince of Persia: The Sands of Time' },
  't-129': { appId: 631510, name: 'Devil May Cry HD Collection' },
  't-130': { appId: 848350, name: 'Katamari Damacy REROLL' },
  't-131': { appId: 32370, name: 'STAR WARS - Knights of the Old Republic' },
  't-132': { appId: 587620, name: 'OKAMI HD' },
  't-139': { appId: 7940, name: 'Call of Duty 4: Modern Warfare' },
  't-140': { appId: 400, name: 'Portal' },
  't-141': { appId: 17410, name: 'Mirror\'s Edge' },
  't-143': { appId: 2161700, name: 'Persona 3 Reload' },
  't-144': { appId: 500, name: 'Left 4 Dead' },
  't-146': { appId: 13560, name: 'Tom Clancy\'s Splinter Cell' },
  't-149': { appId: 15130, name: 'Beyond Good and Evil' },
  't-152': { appId: 9860, name: 'The Chronicles of Riddick: Assault on Dark Athena' },
  't-155': { appId: 440, name: 'Team Fortress 2' },
  't-158': { appId: 288470, name: 'Fable Anniversary' },
  't-159': { appId: 1328670, name: 'Mass Effect Legendary Edition' },
  't-160': { appId: 3830, name: 'Psychonauts' },
  't-161': { appId: 292030, name: 'The Witcher 3: Wild Hunt' },
  't-163': { appId: 814380, name: 'Sekiro: Shadows Die Twice' },
  't-164': { appId: 367520, name: 'Hollow Knight' },
  't-165': { appId: 504230, name: 'Celeste' },
  't-166': { appId: 620, name: 'Portal 2' },
  't-167': { appId: 1145360, name: 'Hades' },
  't-168': { appId: 632470, name: 'Disco Elysium - The Final Cut' },
  't-169': { appId: 753640, name: 'Outer Wilds' },
  't-170': { appId: 413150, name: 'Stardew Valley' },
  't-171': { appId: 268910, name: 'Cuphead' },
  't-172': { appId: 1086940, name: 'Baldur\'s Gate 3' },
  't-173': { appId: 524220, name: 'NieR:Automata' },
  't-174': { appId: 1850570, name: 'DEATH STRANDING DIRECTOR\'S CUT' },
  't-175': { appId: 2215430, name: 'Ghost of Tsushima DIRECTOR\'S CUT' },
  't-176': { appId: 870780, name: 'Control Ultimate Edition' },
  't-177': { appId: 1888930, name: 'The Last of Us Part I' },
  't-178': { appId: 1174180, name: 'Red Dead Redemption 2' },
  't-179': { appId: 264710, name: 'Subnautica' },
  't-180': { appId: 653530, name: 'Return of the Obra Dinn' },
  't-181': { appId: 304430, name: 'INSIDE' },
  't-182': { appId: 588650, name: 'Dead Cells' },
  't-183': { appId: 219150, name: 'Hotline Miami' },
  't-184': { appId: 250760, name: 'Shovel Knight: Treasure Trove' },
  't-185': { appId: 1237970, name: 'Titanfall 2' },
  't-186': { appId: 383870, name: 'Firewatch' },
  't-187': { appId: 501300, name: 'What Remains of Edith Finch' },
  't-188': { appId: 1817070, name: 'Marvel\'s Spider-Man Remastered' },
  't-189': { appId: 1151640, name: 'Horizon Zero Dawn Complete Edition' },
  't-190': { appId: 782330, name: 'DOOM Eternal' },
  't-191': { appId: 108710, name: 'Alan Wake' },
  't-192': { appId: 1817230, name: 'Hi-Fi RUSH' },
  't-193': { appId: 582010, name: 'Monster Hunter: World' },
  't-194': { appId: 646570, name: 'Slay the Spire' },
  't-195': { appId: 1887720, name: 'ARMORED CORE VI FIRES OF RUBICON' },
  't-196': { appId: 2138330, name: 'Cyberpunk 2077: Phantom Liberty' },
  't-197': { appId: 2379780, name: 'Balatro' },
  't-198': { appId: 231200, name: 'Kentucky Route Zero' },
  't-199': { appId: 1671210, name: 'DELTARUNE' },
};

/**
 * Returns the Steam App ID for a given trivia ID
 */
export function getSteamAppId(triviaId?: string): number | null {
  if (!triviaId) return null;
  const entry = STEAM_DB_MAP[triviaId];
  return entry ? entry.appId : null;
}

/**
 * Returns the SteamDB info page URL: https://steamdb.info/app/{appId}/
 */
export function getSteamDbPageUrl(triviaId?: string): string | null {
  const appId = getSteamAppId(triviaId);
  return appId ? `https://steamdb.info/app/${appId}/` : null;
}

/**
 * Returns the official Steam Akamai CDN vertical box art URL (600x900)
 */
export function getSteamDbBoxArtUrl(triviaId?: string): string | null {
  const appId = getSteamAppId(triviaId);
  if (!appId) return null;
  return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/library_600x900_2x.jpg`;
}

/**
 * Returns the Cloudflare CDN mirror for box art
 */
export function getSteamDbCloudflareBoxArtUrl(triviaId?: string): string | null {
  const appId = getSteamAppId(triviaId);
  if (!appId) return null;
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900_2x.jpg`;
}

/**
 * Returns the official Steam hero/character spotlight banner URL (1920x620)
 */
export function getSteamDbHeroUrl(triviaId?: string): string | null {
  const appId = getSteamAppId(triviaId);
  if (!appId) return null;
  return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${appId}/library_hero.jpg`;
}

/**
 * Returns the Cloudflare CDN mirror for hero banner
 */
export function getSteamDbCloudflareHeroUrl(triviaId?: string): string | null {
  const appId = getSteamAppId(triviaId);
  if (!appId) return null;
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_hero.jpg`;
}

/**
 * Builds an ordered cascade of candidate URLs for an image slot.
 * If the primary URL (e.g. Wikimedia or local) fails, the browser tries the SteamDB CDNs next.
 */
export function getCandidateImageUrls(
  primaryUrl: string,
  triviaId: string,
  type: 'boxart' | 'character'
): string[] {
  const candidates: string[] = [];
  if (primaryUrl) candidates.push(primaryUrl);

  if (type === 'boxart') {
    const steamBox = getSteamDbBoxArtUrl(triviaId);
    const cfBox = getSteamDbCloudflareBoxArtUrl(triviaId);
    if (steamBox && !candidates.includes(steamBox)) candidates.push(steamBox);
    if (cfBox && !candidates.includes(cfBox)) candidates.push(cfBox);
  } else {
    const steamHero = getSteamDbHeroUrl(triviaId);
    const cfHero = getSteamDbCloudflareHeroUrl(triviaId);
    if (steamHero && !candidates.includes(steamHero)) candidates.push(steamHero);
    if (cfHero && !candidates.includes(cfHero)) candidates.push(cfHero);
  }

  return candidates;
}
