export interface TriviaVisualInfo {
  characterName: string;
  characterTitle: string;
  characterQuote: string;
  characterImageUrl: string;
  characterBadge: string;
  characterJapanese?: string;

  boxArtTitle: string;
  boxArtImageUrl: string;
  releaseDate: string;
  mediaFormat: string;
  developerStudio: string;
  salesOrLegacy: string;
  serialNumber: string;
  colorHex: string;
}

// Map indexed by BOTH item.id ('t-01' to 't-30') and item.gameTitle to guarantee 100% exact alignment
export const TRIVIA_VISUALS_MAP: Record<string, TriviaVisualInfo> = {
  // -------------------------------------------------------------
  // t-01: Super Mario Bros. (1985)
  // -------------------------------------------------------------
  't-01': {
    characterName: 'Mario & Luigi',
    characterTitle: 'Mushroom Kingdom Plumbers & Protectors',
    characterQuote: '“Clouds and bushes share the exact same 8-bit sprite with just a color palette swap.”',
    characterImageUrl: '/images/characters/mario.png',
    characterBadge: '8-BIT PALETTE HACK',
    characterJapanese: 'マリオ // NINTENDO EAD',
    boxArtTitle: 'Super Mario Bros. (Famicom / NES)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'September 13, 1985',
    mediaFormat: '40KB Mask-ROM Cartridge',
    developerStudio: 'Nintendo EAD (Shigeru Miyamoto)',
    salesOrLegacy: '58+ Million Copies Sold Worldwide',
    serialNumber: 'NES-SM-USA',
    colorHex: '#FF2A85'
  },
  'Super Mario Bros.': {
    characterName: 'Mario & Luigi',
    characterTitle: 'Mushroom Kingdom Plumbers & Protectors',
    characterQuote: '“Clouds and bushes share the exact same 8-bit sprite with just a color palette swap.”',
    characterImageUrl: '/images/characters/mario.png',
    characterBadge: '8-BIT PALETTE HACK',
    characterJapanese: 'マリオ // NINTENDO EAD',
    boxArtTitle: 'Super Mario Bros. (Famicom / NES)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'September 13, 1985',
    mediaFormat: '40KB Mask-ROM Cartridge',
    developerStudio: 'Nintendo EAD (Shigeru Miyamoto)',
    salesOrLegacy: '58+ Million Copies Sold Worldwide',
    serialNumber: 'NES-SM-USA',
    colorHex: '#FF2A85'
  },

  // -------------------------------------------------------------
  // t-02: The Elder Scrolls V: Skyrim (2011)
  // -------------------------------------------------------------
  't-02': {
    characterName: 'Dovahkiin (The Dragonborn)',
    characterTitle: 'Legendary Hero of Skyrim & Dragon Slayer',
    characterQuote: '“The bee was an immovable object meeting an unstoppable wagon into orbit.” — Nate Purkeypile',
    characterImageUrl: '/images/characters/dovahkiin_retro.jpg',
    characterBadge: 'PHYSICS BEE GLITCH',
    characterJapanese: 'ドラゴンボーン // BETHESDA',
    boxArtTitle: 'The Elder Scrolls V: Skyrim',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/library_600x900_2x.jpg',
    releaseDate: 'November 11, 2011',
    mediaFormat: 'Dual-Layer DVD / Steam Digital',
    developerStudio: 'Bethesda Game Studios',
    salesOrLegacy: '60+ Million Copies Sold (Over 200 GOTY)',
    serialNumber: 'BETH-TES5-2011',
    colorHex: '#00F5D4'
  },
  'The Elder Scrolls V: Skyrim': {
    characterName: 'Dovahkiin (The Dragonborn)',
    characterTitle: 'Legendary Hero of Skyrim & Dragon Slayer',
    characterQuote: '“The bee was an immovable object meeting an unstoppable wagon into orbit.” — Nate Purkeypile',
    characterImageUrl: '/images/characters/dovahkiin_retro.jpg',
    characterBadge: 'PHYSICS BEE GLITCH',
    characterJapanese: 'ドラゴンボーン // BETHESDA',
    boxArtTitle: 'The Elder Scrolls V: Skyrim',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/489830/library_600x900_2x.jpg',
    releaseDate: 'November 11, 2011',
    mediaFormat: 'Dual-Layer DVD / Steam Digital',
    developerStudio: 'Bethesda Game Studios',
    salesOrLegacy: '60+ Million Copies Sold (Over 200 GOTY)',
    serialNumber: 'BETH-TES5-2011',
    colorHex: '#00F5D4'
  },

  // -------------------------------------------------------------
  // t-03: Silent Hill (1999)
  // -------------------------------------------------------------
  't-03': {
    characterName: 'Harry Mason & Cheryl',
    characterTitle: 'Desperate Father in the Cursed Mist',
    characterQuote: '“We couldn\'t show the horizon, so we made the lack of a horizon terrifying.” — Team Silent',
    characterImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'PS1 DRAW-DISTANCE FOG',
    characterJapanese: 'サイレントヒル // TEAM SILENT',
    boxArtTitle: 'Silent Hill (PlayStation 1)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'January 31, 1999',
    mediaFormat: '1x PlayStation CD-ROM',
    developerStudio: 'Team Silent (Konami)',
    salesOrLegacy: 'Psychological Horror Landmark (2M+ Sold)',
    serialNumber: 'SLUS-00707',
    colorHex: '#9D4EDD'
  },
  'Silent Hill': {
    characterName: 'Harry Mason & Cheryl',
    characterTitle: 'Desperate Father in the Cursed Mist',
    characterQuote: '“We couldn\'t show the horizon, so we made the lack of a horizon terrifying.” — Team Silent',
    characterImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'PS1 DRAW-DISTANCE FOG',
    characterJapanese: 'サイレントヒル // TEAM SILENT',
    boxArtTitle: 'Silent Hill (PlayStation 1)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'January 31, 1999',
    mediaFormat: '1x PlayStation CD-ROM',
    developerStudio: 'Team Silent (Konami)',
    salesOrLegacy: 'Psychological Horror Landmark (2M+ Sold)',
    serialNumber: 'SLUS-00707',
    colorHex: '#9D4EDD'
  },

  // -------------------------------------------------------------
  // t-04: Metal Gear Solid (1998)
  // -------------------------------------------------------------
  't-04': {
    characterName: 'Solid Snake & Psycho Mantis',
    characterTitle: 'FOXHOUND Operative & Mind-Reading Psychic',
    characterQuote: '“You like Castlevania, don\'t you?! Put your controller on the floor and switch to Port 2!”',
    characterImageUrl: '/images/characters/snake_retro.jpg',
    characterBadge: 'MEMORY CARD HACK',
    characterJapanese: 'ソリッド・スネーク // コナミ',
    boxArtTitle: 'Metal Gear Solid (PlayStation)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131630/library_600x900_2x.jpg',
    releaseDate: 'September 3, 1998',
    mediaFormat: '2x PlayStation CD-ROM Discs',
    developerStudio: 'Konami Computer Entertainment Japan',
    salesOrLegacy: '7+ Million Copies Sold Worldwide',
    serialNumber: 'SLUS-00594',
    colorHex: '#FFE600'
  },
  'Metal Gear Solid': {
    characterName: 'Solid Snake & Psycho Mantis',
    characterTitle: 'FOXHOUND Operative & Mind-Reading Psychic',
    characterQuote: '“You like Castlevania, don\'t you?! Put your controller on the floor and switch to Port 2!”',
    characterImageUrl: '/images/characters/snake_retro.jpg',
    characterBadge: 'MEMORY CARD HACK',
    characterJapanese: 'ソリッド・スネーク // コナミ',
    boxArtTitle: 'Metal Gear Solid (PlayStation)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131630/library_600x900_2x.jpg',
    releaseDate: 'September 3, 1998',
    mediaFormat: '2x PlayStation CD-ROM Discs',
    developerStudio: 'Konami Computer Entertainment Japan',
    salesOrLegacy: '7+ Million Copies Sold Worldwide',
    serialNumber: 'SLUS-00594',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-05: Minecraft (2011)
  // -------------------------------------------------------------
  't-05': {
    characterName: 'The Creeper & Steve',
    characterTitle: 'Explosive Phenomenon from an Inverted Pig Model',
    characterQuote: '“The Creeper was a mistake. I accidentally swapped the height and length of the pig model.” — Notch',
    characterImageUrl: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'ACCIDENTAL PIG TYPO',
    characterJapanese: 'マインクラフト // MOJANG',
    boxArtTitle: 'Minecraft (Original Java Edition)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 18, 2011',
    mediaFormat: 'Digital Java / Bedrock Multiplatform',
    developerStudio: 'Mojang Studios (Markus Persson)',
    salesOrLegacy: '300+ Million Copies Sold (#1 Game in History)',
    serialNumber: 'MOJANG-MC-2011',
    colorHex: '#38B000'
  },
  'Minecraft': {
    characterName: 'The Creeper & Steve',
    characterTitle: 'Explosive Phenomenon from an Inverted Pig Model',
    characterQuote: '“The Creeper was a mistake. I accidentally swapped the height and length of the pig model.” — Notch',
    characterImageUrl: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'ACCIDENTAL PIG TYPO',
    characterJapanese: 'マインクラフト // MOJANG',
    boxArtTitle: 'Minecraft (Original Java Edition)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 18, 2011',
    mediaFormat: 'Digital Java / Bedrock Multiplatform',
    developerStudio: 'Mojang Studios (Markus Persson)',
    salesOrLegacy: '300+ Million Copies Sold (#1 Game in History)',
    serialNumber: 'MOJANG-MC-2011',
    colorHex: '#38B000'
  },

  // -------------------------------------------------------------
  // t-06: Fallout 3 & New Vegas (2008)
  // -------------------------------------------------------------
  't-06': {
    characterName: 'Vault Boy & Train NPC',
    characterTitle: 'Capital Wasteland Wanderer & Subway Hat NPC',
    characterQuote: '“The moving metro train in Broken Steel is literally an NPC wearing a train as a hat running underground.”',
    characterImageUrl: '/images/characters/vaultboy_retro.jpg',
    characterBadge: 'NPC TRAIN-HAT HACK',
    characterJapanese: 'フォールアウト3 // BETHESDA',
    boxArtTitle: 'Fallout 3 (Game of the Year Edition)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/22300/library_600x900_2x.jpg',
    releaseDate: 'October 28, 2008',
    mediaFormat: 'DVD-ROM / Games for Windows Live',
    developerStudio: 'Bethesda Game Studios',
    salesOrLegacy: '12.4+ Million Copies Sold Worldwide',
    serialNumber: 'BETH-FO3-08',
    colorHex: '#FFE600'
  },
  'Fallout 3 & New Vegas': {
    characterName: 'Vault Boy & Train NPC',
    characterTitle: 'Capital Wasteland Wanderer & Subway Hat NPC',
    characterQuote: '“The moving metro train in Broken Steel is literally an NPC wearing a train as a hat running underground.”',
    characterImageUrl: '/images/characters/vaultboy_retro.jpg',
    characterBadge: 'NPC TRAIN-HAT HACK',
    characterJapanese: 'フォールアウト3 // BETHESDA',
    boxArtTitle: 'Fallout 3 (Game of the Year Edition)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/22300/library_600x900_2x.jpg',
    releaseDate: 'October 28, 2008',
    mediaFormat: 'DVD-ROM / Games for Windows Live',
    developerStudio: 'Bethesda Game Studios',
    salesOrLegacy: '12.4+ Million Copies Sold Worldwide',
    serialNumber: 'BETH-FO3-08',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-07: Dark Souls (2011)
  // -------------------------------------------------------------
  't-07': {
    characterName: 'Solaire of Astora & Chosen Undead',
    characterTitle: 'Warrior of Sunlight & The Mystery Pendant',
    characterQuote: '“I actually had no intention of making the Pendant do anything. It was a complete prank.” — Hidetaka Miyazaki',
    characterImageUrl: '/images/characters/solaire_retro.jpg',
    characterBadge: 'MIYAZAKI PENDANT PRANK',
    characterJapanese: 'ダークソウル // FROMSOFTWARE',
    boxArtTitle: 'Dark Souls: Prepare to Die Edition',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570940/library_600x900_2x.jpg',
    releaseDate: 'September 22, 2011',
    mediaFormat: 'Blu-ray / DVD-ROM / Steam',
    developerStudio: 'FromSoftware (Hidetaka Miyazaki)',
    salesOrLegacy: 'Named Ultimate Game of All Time at Golden Joysticks',
    serialNumber: 'FROM-DS1-2011',
    colorHex: '#FF2A85'
  },
  'Dark Souls': {
    characterName: 'Solaire of Astora & Chosen Undead',
    characterTitle: 'Warrior of Sunlight & The Mystery Pendant',
    characterQuote: '“I actually had no intention of making the Pendant do anything. It was a complete prank.” — Hidetaka Miyazaki',
    characterImageUrl: '/images/characters/solaire_retro.jpg',
    characterBadge: 'MIYAZAKI PENDANT PRANK',
    characterJapanese: 'ダークソウル // FROMSOFTWARE',
    boxArtTitle: 'Dark Souls: Prepare to Die Edition',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570940/library_600x900_2x.jpg',
    releaseDate: 'September 22, 2011',
    mediaFormat: 'Blu-ray / DVD-ROM / Steam',
    developerStudio: 'FromSoftware (Hidetaka Miyazaki)',
    salesOrLegacy: 'Named Ultimate Game of All Time at Golden Joysticks',
    serialNumber: 'FROM-DS1-2011',
    colorHex: '#FF2A85'
  },

  // -------------------------------------------------------------
  // t-08: Doom (1993)
  // -------------------------------------------------------------
  't-08': {
    characterName: 'Doomguy & John Romero Head',
    characterTitle: 'Hell Marine & The Final Boss Decapitated Head',
    characterQuote: '“To win the game, you must kill me, John Romero! (Played in reverse inside the Icon of Sin)”',
    characterImageUrl: '/images/characters/doomguy_retro.jpg',
    characterBadge: 'LAWNMOWER CHAINSAW SFX',
    characterJapanese: 'ドゥーム // ID SOFTWARE',
    boxArtTitle: 'DOOM (Original 1993 id Software Release)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2280/library_600x900_2x.jpg',
    releaseDate: 'December 10, 1993',
    mediaFormat: '4x 3.5" High-Density Floppy Disks',
    developerStudio: 'id Software (Carmack & Romero)',
    salesOrLegacy: 'Estimated 20M+ Played on DOS via Shareware',
    serialNumber: 'ID-DOOM-1993',
    colorHex: '#FF2A85'
  },
  'Doom': {
    characterName: 'Doomguy & John Romero Head',
    characterTitle: 'Hell Marine & The Final Boss Decapitated Head',
    characterQuote: '“To win the game, you must kill me, John Romero! (Played in reverse inside the Icon of Sin)”',
    characterImageUrl: '/images/characters/doomguy_retro.jpg',
    characterBadge: 'LAWNMOWER CHAINSAW SFX',
    characterJapanese: 'ドゥーム // ID SOFTWARE',
    boxArtTitle: 'DOOM (Original 1993 id Software Release)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2280/library_600x900_2x.jpg',
    releaseDate: 'December 10, 1993',
    mediaFormat: '4x 3.5" High-Density Floppy Disks',
    developerStudio: 'id Software (Carmack & Romero)',
    salesOrLegacy: 'Estimated 20M+ Played on DOS via Shareware',
    serialNumber: 'ID-DOOM-1993',
    colorHex: '#FF2A85'
  },

  // -------------------------------------------------------------
  // t-09: Pokémon Red & Blue (1996)
  // -------------------------------------------------------------
  't-09': {
    characterName: 'Mew (#151) & Shigeki Morimoto',
    characterTitle: 'The Mythical 151st Secret Pocket Monster',
    characterQuote: '“We put Mew into the 300 free bytes after debug tools were stripped, without telling Nintendo executives.”',
    characterImageUrl: '/images/characters/mew.png',
    characterBadge: 'SECRET 300-BYTE INJECTION',
    characterJapanese: 'ミュウ // GAME FREAK',
    boxArtTitle: 'Pokémon Red and Blue Versions (Game Boy)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'February 27, 1996',
    mediaFormat: '4-Megabit Game Boy ROM Cartridge',
    developerStudio: 'Game Freak / Creatures / Nintendo',
    salesOrLegacy: '31.38 Million Copies Sold Worldwide',
    serialNumber: 'DMG-APAE-USA',
    colorHex: '#00F5D4'
  },
  'Pokémon Red & Blue': {
    characterName: 'Mew (#151) & Shigeki Morimoto',
    characterTitle: 'The Mythical 151st Secret Pocket Monster',
    characterQuote: '“We put Mew into the 300 free bytes after debug tools were stripped, without telling Nintendo executives.”',
    characterImageUrl: '/images/characters/mew.png',
    characterBadge: 'SECRET 300-BYTE INJECTION',
    characterJapanese: 'ミュウ // GAME FREAK',
    boxArtTitle: 'Pokémon Red and Blue Versions (Game Boy)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'February 27, 1996',
    mediaFormat: '4-Megabit Game Boy ROM Cartridge',
    developerStudio: 'Game Freak / Creatures / Nintendo',
    salesOrLegacy: '31.38 Million Copies Sold Worldwide',
    serialNumber: 'DMG-APAE-USA',
    colorHex: '#00F5D4'
  },

  // -------------------------------------------------------------
  // t-10: Half-Life 2 (2004)
  // -------------------------------------------------------------
  't-10': {
    characterName: 'Dr. Gordon Freeman & Fast Zombie',
    characterTitle: 'Crowbar-Wielding Physicist & Reversed Audio Host',
    characterQuote: '“Yabba, my icing! God help me! (Fast Zombie shrieks are reversed screams of agony)”',
    characterImageUrl: '/images/characters/freeman_retro.jpg',
    characterBadge: 'REVERSED SCREAM AUDIO',
    characterJapanese: 'ハーフライフ2 // VALVE',
    boxArtTitle: 'Half-Life 2 (Source Engine Debut)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/library_600x900_2x.jpg',
    releaseDate: 'November 16, 2004',
    mediaFormat: '5x CD-ROM / DVD / Steam Debut',
    developerStudio: 'Valve Corporation (Gabe Newell)',
    salesOrLegacy: 'Won 39 Game of the Year Awards',
    serialNumber: 'VALVE-HL2-2004',
    colorHex: '#FFE600'
  },
  'Half-Life 2': {
    characterName: 'Dr. Gordon Freeman & Fast Zombie',
    characterTitle: 'Crowbar-Wielding Physicist & Reversed Audio Host',
    characterQuote: '“Yabba, my icing! God help me! (Fast Zombie shrieks are reversed screams of agony)”',
    characterImageUrl: '/images/characters/freeman_retro.jpg',
    characterBadge: 'REVERSED SCREAM AUDIO',
    characterJapanese: 'ハーフライフ2 // VALVE',
    boxArtTitle: 'Half-Life 2 (Source Engine Debut)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/220/library_600x900_2x.jpg',
    releaseDate: 'November 16, 2004',
    mediaFormat: '5x CD-ROM / DVD / Steam Debut',
    developerStudio: 'Valve Corporation (Gabe Newell)',
    salesOrLegacy: 'Won 39 Game of the Year Awards',
    serialNumber: 'VALVE-HL2-2004',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-11: Grand Theft Auto: San Andreas (2004)
  // -------------------------------------------------------------
  't-11': {
    characterName: 'Carl "CJ" Johnson',
    characterTitle: 'Grove Street Families & The $20M Hot Coffee Scandal',
    characterQuote: '“Ah shit, here we go again. Cut content in the code triggered an FTC investigation.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1546990/header.jpg',
    characterBadge: 'HOT COFFEE CODE DISCOVERY',
    characterJapanese: 'グランド・セフト・オート // ROCKSTAR',
    boxArtTitle: 'Grand Theft Auto: San Andreas',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1546990/library_600x900_2x.jpg',
    releaseDate: 'October 26, 2004',
    mediaFormat: 'Dual-Layer PS2 DVD-ROM',
    developerStudio: 'Rockstar North (Sam Houser)',
    salesOrLegacy: 'Best-Selling PS2 Game of All Time (27.5M+)',
    serialNumber: 'SLUS-20946',
    colorHex: '#00F5D4'
  },
  'Grand Theft Auto: San Andreas': {
    characterName: 'Carl "CJ" Johnson',
    characterTitle: 'Grove Street Families & The $20M Hot Coffee Scandal',
    characterQuote: '“Ah shit, here we go again. Cut content in the code triggered an FTC investigation.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1546990/header.jpg',
    characterBadge: 'HOT COFFEE CODE DISCOVERY',
    characterJapanese: 'グランド・セフト・オート // ROCKSTAR',
    boxArtTitle: 'Grand Theft Auto: San Andreas',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1546990/library_600x900_2x.jpg',
    releaseDate: 'October 26, 2004',
    mediaFormat: 'Dual-Layer PS2 DVD-ROM',
    developerStudio: 'Rockstar North (Sam Houser)',
    salesOrLegacy: 'Best-Selling PS2 Game of All Time (27.5M+)',
    serialNumber: 'SLUS-20946',
    colorHex: '#00F5D4'
  },

  // -------------------------------------------------------------
  // t-12: World of Warcraft (2005)
  // -------------------------------------------------------------
  't-12': {
    characterName: 'Hakkar the Soulflayer & Zul\'Gurub Raiders',
    characterTitle: 'Blood God of Zul\'Gurub & The Corrupted Blood Outbreak',
    characterQuote: '“The Corrupted Blood epidemic was studied by epidemiologists and the CDC to model real-world plagues.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'CDC EPIDEMIC CASE STUDY',
    characterJapanese: 'ワールド オブ ウォークラフト // BLIZZARD',
    boxArtTitle: 'World of Warcraft (Patch 1.7 Zul\'Gurub)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 23, 2004',
    mediaFormat: '4x CD-ROM / DVD / Online MMORPG',
    developerStudio: 'Blizzard Entertainment',
    salesOrLegacy: 'Peak 12+ Million Active Subscribers',
    serialNumber: 'BLIZZ-WOW-2004',
    colorHex: '#9D4EDD'
  },
  'World of Warcraft': {
    characterName: 'Hakkar the Soulflayer & Zul\'Gurub Raiders',
    characterTitle: 'Blood God of Zul\'Gurub & The Corrupted Blood Outbreak',
    characterQuote: '“The Corrupted Blood epidemic was studied by epidemiologists and the CDC to model real-world plagues.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'CDC EPIDEMIC CASE STUDY',
    characterJapanese: 'ワールド オブ ウォークラフト // BLIZZARD',
    boxArtTitle: 'World of Warcraft (Patch 1.7 Zul\'Gurub)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 23, 2004',
    mediaFormat: '4x CD-ROM / DVD / Online MMORPG',
    developerStudio: 'Blizzard Entertainment',
    salesOrLegacy: 'Peak 12+ Million Active Subscribers',
    serialNumber: 'BLIZZ-WOW-2004',
    colorHex: '#9D4EDD'
  },

  // -------------------------------------------------------------
  // t-13: The Legend of Zelda: Ocarina of Time (1998)
  // -------------------------------------------------------------
  't-13': {
    characterName: 'Link & Epona the Steed',
    characterTitle: 'The Hero of Time & Real-Time Horse Kinematics',
    characterQuote: '“Programmers secretly developed Epona\'s auto-steering and obstacle avoidance algorithms on N64 hardware.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'EPONA HORSE KINEMATICS',
    characterJapanese: '時のオカリナ // 任天堂',
    boxArtTitle: 'The Legend of Zelda: Ocarina of Time (N64)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 21, 1998',
    mediaFormat: '256-Megabit (32MB) N64 Cartridge',
    developerStudio: 'Nintendo EAD (Shigeru Miyamoto)',
    salesOrLegacy: 'Highest Metacritic Score in History (99/100)',
    serialNumber: 'NUS-CZLE-USA',
    colorHex: '#38B000'
  },
  'The Legend of Zelda: Ocarina of Time': {
    characterName: 'Link & Epona the Steed',
    characterTitle: 'The Hero of Time & Real-Time Horse Kinematics',
    characterQuote: '“Programmers secretly developed Epona\'s auto-steering and obstacle avoidance algorithms on N64 hardware.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'EPONA HORSE KINEMATICS',
    characterJapanese: '時のオカリナ // 任天堂',
    boxArtTitle: 'The Legend of Zelda: Ocarina of Time (N64)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 21, 1998',
    mediaFormat: '256-Megabit (32MB) N64 Cartridge',
    developerStudio: 'Nintendo EAD (Shigeru Miyamoto)',
    salesOrLegacy: 'Highest Metacritic Score in History (99/100)',
    serialNumber: 'NUS-CZLE-USA',
    colorHex: '#38B000'
  },

  // -------------------------------------------------------------
  // t-14: Street Fighter II (1991)
  // -------------------------------------------------------------
  't-14': {
    characterName: 'Ryu & Akira Nishitani',
    characterTitle: 'The World Warrior & The Accidental Combo Inventor',
    characterQuote: '“I thought the timing was so demanding no player could ever use it in match play.” — Akira Nishitani',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1798010/header.jpg',
    characterBadge: 'ACCIDENTAL COMBO BUG',
    characterJapanese: 'ストリートファイターII // カプコン',
    boxArtTitle: 'Street Fighter II: The World Warrior',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1798010/library_600x900_2x.jpg',
    releaseDate: 'February 6, 1991',
    mediaFormat: 'CP System Arcade Board / SNES 16Mbit',
    developerStudio: 'Capcom (Yoshiki Okamoto)',
    salesOrLegacy: 'Birth of Modern Fighting Game Combos',
    serialNumber: 'CPS-SF2-1991',
    colorHex: '#FFE600'
  },
  'Street Fighter II': {
    characterName: 'Ryu & Akira Nishitani',
    characterTitle: 'The World Warrior & The Accidental Combo Inventor',
    characterQuote: '“I thought the timing was so demanding no player could ever use it in match play.” — Akira Nishitani',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1798010/header.jpg',
    characterBadge: 'ACCIDENTAL COMBO BUG',
    characterJapanese: 'ストリートファイターII // カプコン',
    boxArtTitle: 'Street Fighter II: The World Warrior',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1798010/library_600x900_2x.jpg',
    releaseDate: 'February 6, 1991',
    mediaFormat: 'CP System Arcade Board / SNES 16Mbit',
    developerStudio: 'Capcom (Yoshiki Okamoto)',
    salesOrLegacy: 'Birth of Modern Fighting Game Combos',
    serialNumber: 'CPS-SF2-1991',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-15: Crash Bandicoot (1996)
  // -------------------------------------------------------------
  't-15': {
    characterName: 'Crash Bandicoot & Andy Gavin',
    characterTitle: 'Genetically Mutated Marsupial & CD-ROM Hacker',
    characterQuote: '“Sony had strict libraries that limited RAM. Andy Gavin bypassed the OS to stream levels directly from the CD drive.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/731490/header.jpg',
    characterBadge: 'SONY PS1 RAM BYPASS',
    characterJapanese: 'クラッシュ・バンディクー // NAUGHTY DOG',
    boxArtTitle: 'Crash Bandicoot (PlayStation)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/731490/library_600x900_2x.jpg',
    releaseDate: 'September 9, 1996',
    mediaFormat: '1x PlayStation CD-ROM',
    developerStudio: 'Naughty Dog (Andy Gavin & Jason Rubin)',
    salesOrLegacy: '6.82 Million Copies Sold Worldwide',
    serialNumber: 'SCUS-94900',
    colorHex: '#FF2A85'
  },
  'Crash Bandicoot': {
    characterName: 'Crash Bandicoot & Andy Gavin',
    characterTitle: 'Genetically Mutated Marsupial & CD-ROM Hacker',
    characterQuote: '“Sony had strict libraries that limited RAM. Andy Gavin bypassed the OS to stream levels directly from the CD drive.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/731490/header.jpg',
    characterBadge: 'SONY PS1 RAM BYPASS',
    characterJapanese: 'クラッシュ・バンディクー // NAUGHTY DOG',
    boxArtTitle: 'Crash Bandicoot (PlayStation)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/731490/library_600x900_2x.jpg',
    releaseDate: 'September 9, 1996',
    mediaFormat: '1x PlayStation CD-ROM',
    developerStudio: 'Naughty Dog (Andy Gavin & Jason Rubin)',
    salesOrLegacy: '6.82 Million Copies Sold Worldwide',
    serialNumber: 'SCUS-94900',
    colorHex: '#FF2A85'
  },

  // -------------------------------------------------------------
  // t-16: Elden Ring (2022)
  // -------------------------------------------------------------
  't-16': {
    characterName: 'Malenia, Blade of Miquella',
    characterTitle: 'Goddess of Rot & The 9,999 HP Volcano Manor Wall',
    characterQuote: '“The illusory wall had 9,999 hit points and took 50 sword strikes to break before FromSoftware patched it.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    characterBadge: '9999 HP DEBUG WALL',
    characterJapanese: 'エルデンリング // FROMSOFTWARE',
    boxArtTitle: 'Elden Ring (Game of the Year 2022)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900_2x.jpg',
    releaseDate: 'February 25, 2022',
    mediaFormat: 'Ultra HD Blu-ray / Steam Digital',
    developerStudio: 'FromSoftware (Hidetaka Miyazaki)',
    salesOrLegacy: '25+ Million Copies Sold (GOTY 2022 Winner)',
    serialNumber: 'FROM-ER-2022',
    colorHex: '#FFE600'
  },
  'Elden Ring': {
    characterName: 'Malenia, Blade of Miquella',
    characterTitle: 'Goddess of Rot & The 9,999 HP Volcano Manor Wall',
    characterQuote: '“The illusory wall had 9,999 hit points and took 50 sword strikes to break before FromSoftware patched it.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg',
    characterBadge: '9999 HP DEBUG WALL',
    characterJapanese: 'エルデンリング // FROMSOFTWARE',
    boxArtTitle: 'Elden Ring (Game of the Year 2022)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900_2x.jpg',
    releaseDate: 'February 25, 2022',
    mediaFormat: 'Ultra HD Blu-ray / Steam Digital',
    developerStudio: 'FromSoftware (Hidetaka Miyazaki)',
    salesOrLegacy: '25+ Million Copies Sold (GOTY 2022 Winner)',
    serialNumber: 'FROM-ER-2022',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-17: Final Fantasy VII (1997)
  // -------------------------------------------------------------
  't-17': {
    characterName: 'Aerith Gainsborough & Cloud Strife',
    characterTitle: 'The Last Cetra & Midgar Flower Girl',
    characterQuote: '“I felt death should not be an event that rewards you or offers easy closure. It is sudden, hollow, and painful.” — Hironobu Sakaguchi',
    characterImageUrl: '/images/characters/aerith_retro.jpg',
    characterBadge: 'SAKAGUCHI DEV SECRET',
    characterJapanese: 'エアリス・ゲインズブール // スクウェア',
    boxArtTitle: 'Final Fantasy VII (Original 1997 Release)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/library_600x900_2x.jpg',
    releaseDate: 'January 31, 1997',
    mediaFormat: '3x PlayStation CD-ROM (NTSC-J)',
    developerStudio: 'Square Product Development Div 1',
    salesOrLegacy: '14.1 Million Copies Sold Worldwide',
    serialNumber: 'SLPS-00700',
    colorHex: '#00F5D4'
  },
  'Final Fantasy VII': {
    characterName: 'Aerith Gainsborough & Cloud Strife',
    characterTitle: 'The Last Cetra & Midgar Flower Girl',
    characterQuote: '“I felt death should not be an event that rewards you or offers easy closure. It is sudden, hollow, and painful.” — Hironobu Sakaguchi',
    characterImageUrl: '/images/characters/aerith_retro.jpg',
    characterBadge: 'SAKAGUCHI DEV SECRET',
    characterJapanese: 'エアリス・ゲインズブール // スクウェア',
    boxArtTitle: 'Final Fantasy VII (Original 1997 Release)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/39140/library_600x900_2x.jpg',
    releaseDate: 'January 31, 1997',
    mediaFormat: '3x PlayStation CD-ROM (NTSC-J)',
    developerStudio: 'Square Product Development Div 1',
    salesOrLegacy: '14.1 Million Copies Sold Worldwide',
    serialNumber: 'SLPS-00700',
    colorHex: '#00F5D4'
  },

  // -------------------------------------------------------------
  // t-18: Portal (2007)
  // -------------------------------------------------------------
  't-18': {
    characterName: 'Chell & GLaDOS',
    characterTitle: 'Aperture Science Test Subject with Spring Stilts',
    characterQuote: '“The spring boots were designed purely to avoid animating realistic fall damage.” — Kim Swift',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/header.jpg',
    characterBadge: 'SPRING STILTS ANIMATION',
    characterJapanese: 'ポータル // VALVE',
    boxArtTitle: 'Portal (The Orange Box Compilation)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/library_600x900_2x.jpg',
    releaseDate: 'October 10, 2007',
    mediaFormat: 'Digital / The Orange Box Compilation',
    developerStudio: 'Valve Corporation (Kim Swift)',
    salesOrLegacy: 'Over 70 Industry Game of the Year Awards',
    serialNumber: 'VALVE-PORTAL-07',
    colorHex: '#00F5D4'
  },
  'Portal': {
    characterName: 'Chell & GLaDOS',
    characterTitle: 'Aperture Science Test Subject with Spring Stilts',
    characterQuote: '“The spring boots were designed purely to avoid animating realistic fall damage.” — Kim Swift',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/header.jpg',
    characterBadge: 'SPRING STILTS ANIMATION',
    characterJapanese: 'ポータル // VALVE',
    boxArtTitle: 'Portal (The Orange Box Compilation)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/400/library_600x900_2x.jpg',
    releaseDate: 'October 10, 2007',
    mediaFormat: 'Digital / The Orange Box Compilation',
    developerStudio: 'Valve Corporation (Kim Swift)',
    salesOrLegacy: 'Over 70 Industry Game of the Year Awards',
    serialNumber: 'VALVE-PORTAL-07',
    colorHex: '#00F5D4'
  },

  // -------------------------------------------------------------
  // t-19: Pac-Man (1980)
  // -------------------------------------------------------------
  't-19': {
    characterName: 'Pac-Man & The Ghost Gang',
    characterTitle: 'First Video Game Mascot & Level 256 Kill Screen',
    characterQuote: '“Level 256 splits in half because the 8-bit register overflows drawing 256 fruit items into memory.”',
    characterImageUrl: '/images/characters/pacman.png',
    characterBadge: 'LEVEL 256 KILL SCREEN',
    characterJapanese: 'パックマン // ナムコ',
    boxArtTitle: 'Pac-Man (Original 1980 Arcade Cabinet)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1665130/library_600x900_2x.jpg',
    releaseDate: 'May 22, 1980',
    mediaFormat: 'Namco Pac-Man Arcade PCB Board',
    developerStudio: 'Namco (Toru Iwatani)',
    salesOrLegacy: 'Over $14 Billion in Lifetime Arcade Revenue',
    serialNumber: 'NAMCO-PAC-1980',
    colorHex: '#FFE600'
  },
  'Pac-Man': {
    characterName: 'Pac-Man & The Ghost Gang',
    characterTitle: 'First Video Game Mascot & Level 256 Kill Screen',
    characterQuote: '“Level 256 splits in half because the 8-bit register overflows drawing 256 fruit items into memory.”',
    characterImageUrl: '/images/characters/pacman.png',
    characterBadge: 'LEVEL 256 KILL SCREEN',
    characterJapanese: 'パックマン // ナムコ',
    boxArtTitle: 'Pac-Man (Original 1980 Arcade Cabinet)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1665130/library_600x900_2x.jpg',
    releaseDate: 'May 22, 1980',
    mediaFormat: 'Namco Pac-Man Arcade PCB Board',
    developerStudio: 'Namco (Toru Iwatani)',
    salesOrLegacy: 'Over $14 Billion in Lifetime Arcade Revenue',
    serialNumber: 'NAMCO-PAC-1980',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-20: Halo: Combat Evolved (2001)
  // -------------------------------------------------------------
  't-20': {
    characterName: 'Master Chief (John-117)',
    characterTitle: 'Spartan-II Commando & Steve Jobs Macworld Debut',
    characterQuote: '“Steve Jobs originally unveiled Halo on stage as a third-person Mac-exclusive strategy game in 1999.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/header.jpg',
    characterBadge: 'STEVE JOBS MAC ANNOUNCE',
    characterJapanese: 'マスターチーフ // BUNGIE',
    boxArtTitle: 'Halo: Combat Evolved (Xbox Launch Title)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/library_600x900_2x.jpg',
    releaseDate: 'November 15, 2001',
    mediaFormat: '1x Xbox DVD-ROM Disc',
    developerStudio: 'Bungie Studios (Jason Jones)',
    salesOrLegacy: 'Sold 6+ Million Copies & Launched Xbox',
    serialNumber: 'MS-HALO-2001',
    colorHex: '#38B000'
  },
  'Halo: Combat Evolved': {
    characterName: 'Master Chief (John-117)',
    characterTitle: 'Spartan-II Commando & Steve Jobs Macworld Debut',
    characterQuote: '“Steve Jobs originally unveiled Halo on stage as a third-person Mac-exclusive strategy game in 1999.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/header.jpg',
    characterBadge: 'STEVE JOBS MAC ANNOUNCE',
    characterJapanese: 'マスターチーフ // BUNGIE',
    boxArtTitle: 'Halo: Combat Evolved (Xbox Launch Title)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/976730/library_600x900_2x.jpg',
    releaseDate: 'November 15, 2001',
    mediaFormat: '1x Xbox DVD-ROM Disc',
    developerStudio: 'Bungie Studios (Jason Jones)',
    salesOrLegacy: 'Sold 6+ Million Copies & Launched Xbox',
    serialNumber: 'MS-HALO-2001',
    colorHex: '#38B000'
  },

  // -------------------------------------------------------------
  // t-21: Red Dead Redemption 2 (2018)
  // -------------------------------------------------------------
  't-21': {
    characterName: 'Arthur Morgan',
    characterTitle: 'Senior Enforcer of the Van der Linde Gang',
    characterQuote: '“Rockstar recorded over 500,000 lines of voice dialogue and simulated real horse physiology.”',
    characterImageUrl: '/images/characters/arthur_retro.jpg',
    characterBadge: '500,000 DIALOGUE LINES',
    characterJapanese: 'レッド・デッド・リデンプション2 // ROCKSTAR',
    boxArtTitle: 'Red Dead Redemption 2',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900_2x.jpg',
    releaseDate: 'October 26, 2018',
    mediaFormat: '2x Blu-ray Disc / 150GB Install',
    developerStudio: 'Rockstar Games (Rockstar Studios)',
    salesOrLegacy: '65+ Million Copies Sold (#7 All-Time)',
    serialNumber: 'RSTAR-RDR2-2018',
    colorHex: '#FF2A85'
  },
  'Red Dead Redemption 2': {
    characterName: 'Arthur Morgan',
    characterTitle: 'Senior Enforcer of the Van der Linde Gang',
    characterQuote: '“Rockstar recorded over 500,000 lines of voice dialogue and simulated real horse physiology.”',
    characterImageUrl: '/images/characters/arthur_retro.jpg',
    characterBadge: '500,000 DIALOGUE LINES',
    characterJapanese: 'レッド・デッド・リデンプション2 // ROCKSTAR',
    boxArtTitle: 'Red Dead Redemption 2',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/library_600x900_2x.jpg',
    releaseDate: 'October 26, 2018',
    mediaFormat: '2x Blu-ray Disc / 150GB Install',
    developerStudio: 'Rockstar Games (Rockstar Studios)',
    salesOrLegacy: '65+ Million Copies Sold (#7 All-Time)',
    serialNumber: 'RSTAR-RDR2-2018',
    colorHex: '#FF2A85'
  },

  // -------------------------------------------------------------
  // t-22: Super Smash Bros. Melee (2001)
  // -------------------------------------------------------------
  't-22': {
    characterName: 'Fox McCloud & Satoru Iwata',
    characterTitle: 'Corneria Arwing Ace & The Legendary Debugging President',
    characterQuote: '“HAL Laboratory president Satoru Iwata personally stepped in as code debugger to ensure Melee hit the GameCube launch.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'IWATA 3-WEEK DEBUG SAVE',
    characterJapanese: '大乱闘スマッシュブラザーズDX // HAL',
    boxArtTitle: 'Super Smash Bros. Melee (Nintendo GameCube)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 21, 2001',
    mediaFormat: '1.4GB GameCube Optical Disc',
    developerStudio: 'HAL Laboratory (Masahiro Sakurai)',
    salesOrLegacy: 'Best-Selling GameCube Game (7.4M+ Sold)',
    serialNumber: 'DOL-GALE-USA',
    colorHex: '#FFE600'
  },
  'Super Smash Bros. Melee': {
    characterName: 'Fox McCloud & Satoru Iwata',
    characterTitle: 'Corneria Arwing Ace & The Legendary Debugging President',
    characterQuote: '“HAL Laboratory president Satoru Iwata personally stepped in as code debugger to ensure Melee hit the GameCube launch.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'IWATA 3-WEEK DEBUG SAVE',
    characterJapanese: '大乱闘スマッシュブラザーズDX // HAL',
    boxArtTitle: 'Super Smash Bros. Melee (Nintendo GameCube)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 21, 2001',
    mediaFormat: '1.4GB GameCube Optical Disc',
    developerStudio: 'HAL Laboratory (Masahiro Sakurai)',
    salesOrLegacy: 'Best-Selling GameCube Game (7.4M+ Sold)',
    serialNumber: 'DOL-GALE-USA',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-23: Metal Gear Solid 3: Snake Eater (2004)
  // -------------------------------------------------------------
  't-23': {
    characterName: 'Naked Snake (Big Boss) & The End',
    characterTitle: 'FOX Operative & The 100-Year-Old Sniper',
    characterQuote: '“If you save during the boss fight against The End and set your PS2 clock 1 week forward, he dies of old age!”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131650/header.jpg',
    characterBadge: 'PS2 SYSTEM CLOCK DEATH',
    characterJapanese: 'スネークイーター // コナミ',
    boxArtTitle: 'Metal Gear Solid 3: Snake Eater (PS2)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131650/library_600x900_2x.jpg',
    releaseDate: 'November 17, 2004',
    mediaFormat: 'Dual-Layer PlayStation 2 DVD-ROM',
    developerStudio: 'Konami (Hideo Kojima)',
    salesOrLegacy: 'Over 4 Million Copies Sold Worldwide',
    serialNumber: 'SLUS-20915',
    colorHex: '#38B000'
  },
  'Metal Gear Solid 3: Snake Eater': {
    characterName: 'Naked Snake (Big Boss) & The End',
    characterTitle: 'FOX Operative & The 100-Year-Old Sniper',
    characterQuote: '“If you save during the boss fight against The End and set your PS2 clock 1 week forward, he dies of old age!”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131650/header.jpg',
    characterBadge: 'PS2 SYSTEM CLOCK DEATH',
    characterJapanese: 'スネークイーター // コナミ',
    boxArtTitle: 'Metal Gear Solid 3: Snake Eater (PS2)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2131650/library_600x900_2x.jpg',
    releaseDate: 'November 17, 2004',
    mediaFormat: 'Dual-Layer PlayStation 2 DVD-ROM',
    developerStudio: 'Konami (Hideo Kojima)',
    salesOrLegacy: 'Over 4 Million Copies Sold Worldwide',
    serialNumber: 'SLUS-20915',
    colorHex: '#38B000'
  },

  // -------------------------------------------------------------
  // t-24: Civilization (1991)
  // -------------------------------------------------------------
  't-24': {
    characterName: 'Mahatma Gandhi ("Nuclear Gandhi")',
    characterTitle: 'Peaceful Diplomat Turned Nuclear Supervillain Legend',
    characterQuote: '“The famous Nuclear Gandhi bug was an urban legend that was so beloved Sid Meier made it real in future sequels.”',
    characterImageUrl: '/images/characters/gandhi_retro.jpg',
    characterBadge: 'NUCLEAR GANDHI MYTH',
    characterJapanese: 'シヴィライゼーション // MICROPROSE',
    boxArtTitle: 'Sid Meier\'s Civilization (MS-DOS)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/library_600x900_2x.jpg',
    releaseDate: 'September 1, 1991',
    mediaFormat: '3.5" Floppy Disks / MS-DOS',
    developerStudio: 'MicroProse (Sid Meier & Bruce Shelley)',
    salesOrLegacy: 'Pioneered the 4X Strategy Genre',
    serialNumber: 'MP-CIV-1991',
    colorHex: '#FFE600'
  },
  'Civilization': {
    characterName: 'Mahatma Gandhi ("Nuclear Gandhi")',
    characterTitle: 'Peaceful Diplomat Turned Nuclear Supervillain Legend',
    characterQuote: '“The famous Nuclear Gandhi bug was an urban legend that was so beloved Sid Meier made it real in future sequels.”',
    characterImageUrl: '/images/characters/gandhi_retro.jpg',
    characterBadge: 'NUCLEAR GANDHI MYTH',
    characterJapanese: 'シヴィライゼーション // MICROPROSE',
    boxArtTitle: 'Sid Meier\'s Civilization (MS-DOS)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/289070/library_600x900_2x.jpg',
    releaseDate: 'September 1, 1991',
    mediaFormat: '3.5" Floppy Disks / MS-DOS',
    developerStudio: 'MicroProse (Sid Meier & Bruce Shelley)',
    salesOrLegacy: 'Pioneered the 4X Strategy Genre',
    serialNumber: 'MP-CIV-1991',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-25: Team Fortress 2 (2007)
  // -------------------------------------------------------------
  't-25': {
    characterName: 'Heavy Weapons Guy & The Coconut',
    characterTitle: 'Sasha Minigunner & The Load-Bearing coconut.jpg',
    characterQuote: '“The coconut.jpg meme was an unused coffee-beans texture that community modders believed held TF2 together.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/header.jpg',
    characterBadge: 'LOAD-BEARING COCONUT.JPG',
    characterJapanese: 'チームフォートレス2 // VALVE',
    boxArtTitle: 'Team Fortress 2 (The Orange Box)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/library_600x900_2x.jpg',
    releaseDate: 'October 10, 2007',
    mediaFormat: 'PC Digital / Steam Free-to-Play',
    developerStudio: 'Valve Corporation (Robin Walker)',
    salesOrLegacy: 'Over 15 Years of Active Top-Ten Steam Play',
    serialNumber: 'VALVE-TF2-2007',
    colorHex: '#FF2A85'
  },
  'Team Fortress 2': {
    characterName: 'Heavy Weapons Guy & The Coconut',
    characterTitle: 'Sasha Minigunner & The Load-Bearing coconut.jpg',
    characterQuote: '“The coconut.jpg meme was an unused coffee-beans texture that community modders believed held TF2 together.”',
    characterImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/header.jpg',
    characterBadge: 'LOAD-BEARING COCONUT.JPG',
    characterJapanese: 'チームフォートレス2 // VALVE',
    boxArtTitle: 'Team Fortress 2 (The Orange Box)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/440/library_600x900_2x.jpg',
    releaseDate: 'October 10, 2007',
    mediaFormat: 'PC Digital / Steam Free-to-Play',
    developerStudio: 'Valve Corporation (Robin Walker)',
    salesOrLegacy: 'Over 15 Years of Active Top-Ten Steam Play',
    serialNumber: 'VALVE-TF2-2007',
    colorHex: '#FF2A85'
  },

  // -------------------------------------------------------------
  // t-26: GoldenEye 007 (1997) -> THE USER'S SCREENSHOT GAME!
  // -------------------------------------------------------------
  't-26': {
    characterName: 'James Bond (007) & Oddjob',
    characterTitle: 'MI6 Secret Agent & The 1-Month Secret Multiplayer Code',
    characterQuote: '“Multiplayer was a complete afterthought made in the final month by one guy, Steve Ellis, without official approval!” — Martin Hollis',
    characterImageUrl: '/images/characters/james_bond_retro.jpg',
    characterBadge: 'SECRET 1-MONTH MULTIPLAYER',
    characterJapanese: 'ゴールデンアイ 007 // RAREWARE',
    boxArtTitle: 'GoldenEye 007 (Nintendo 64)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'August 25, 1997',
    mediaFormat: '96-Megabit (12MB) N64 Cartridge',
    developerStudio: 'Rare (Martin Hollis & Steve Ellis)',
    salesOrLegacy: '8.09 Million Copies Sold (#3 All-Time N64)',
    serialNumber: 'NUS-NGEE-USA',
    colorHex: '#FFE600'
  },
  'GoldenEye 007': {
    characterName: 'James Bond (007) & Oddjob',
    characterTitle: 'MI6 Secret Agent & The 1-Month Secret Multiplayer Code',
    characterQuote: '“Multiplayer was a complete afterthought made in the final month by one guy, Steve Ellis, without official approval!” — Martin Hollis',
    characterImageUrl: '/images/characters/james_bond_retro.jpg',
    characterBadge: 'SECRET 1-MONTH MULTIPLAYER',
    characterJapanese: 'ゴールデンアイ 007 // RAREWARE',
    boxArtTitle: 'GoldenEye 007 (Nintendo 64)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'August 25, 1997',
    mediaFormat: '96-Megabit (12MB) N64 Cartridge',
    developerStudio: 'Rare (Martin Hollis & Steve Ellis)',
    salesOrLegacy: '8.09 Million Copies Sold (#3 All-Time N64)',
    serialNumber: 'NUS-NGEE-USA',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-27: Cyberpunk 2077 (2020)
  // -------------------------------------------------------------
  't-27': {
    characterName: 'Johnny Silverhand (Keanu Reeves) & V',
    characterTitle: 'Samurai Rockerboy & Merc of Night City',
    characterQuote: '“Keanu loved playing Johnny so much he personally asked CD Projekt Red to double his voice dialogue lines!”',
    characterImageUrl: '/images/characters/silverhand_retro.jpg',
    characterBadge: 'KEANU DOUBLED DIALOGUE',
    characterJapanese: 'サイバーパンク2077 // CDPR',
    boxArtTitle: 'Cyberpunk 2077 (REDengine 4)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900_2x.jpg',
    releaseDate: 'December 10, 2020',
    mediaFormat: '2x Blu-ray / GOG / Steam',
    developerStudio: 'CD Projekt Red',
    salesOrLegacy: '30+ Million Copies Sold Worldwide',
    serialNumber: 'CDPR-CP77-2020',
    colorHex: '#FFE600'
  },
  'Cyberpunk 2077': {
    characterName: 'Johnny Silverhand (Keanu Reeves) & V',
    characterTitle: 'Samurai Rockerboy & Merc of Night City',
    characterQuote: '“Keanu loved playing Johnny so much he personally asked CD Projekt Red to double his voice dialogue lines!”',
    characterImageUrl: '/images/characters/silverhand_retro.jpg',
    characterBadge: 'KEANU DOUBLED DIALOGUE',
    characterJapanese: 'サイバーパンク2077 // CDPR',
    boxArtTitle: 'Cyberpunk 2077 (REDengine 4)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900_2x.jpg',
    releaseDate: 'December 10, 2020',
    mediaFormat: '2x Blu-ray / GOG / Steam',
    developerStudio: 'CD Projekt Red',
    salesOrLegacy: '30+ Million Copies Sold Worldwide',
    serialNumber: 'CDPR-CP77-2020',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-28: Super Mario 64 (1996)
  // -------------------------------------------------------------
  't-28': {
    characterName: 'Mario & Bowser ("King Koopa")',
    characterTitle: '3D Platforming Pioneer & Charles Martinet Voicework',
    characterQuote: '“So long, King Bowser! (Often misheard by players worldwide as \'So long, Gay Bowser!\')”',
    characterImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'SO LONG KING BOWSER',
    characterJapanese: 'スーパーマリオ64 // 任天堂',
    boxArtTitle: 'Super Mario 64 (N64 Launch Title)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'June 23, 1996',
    mediaFormat: '64-Megabit (8MB) N64 Cartridge',
    developerStudio: 'Nintendo EAD (Shigeru Miyamoto)',
    salesOrLegacy: '11.91 Million Copies Sold (Best-Selling N64 Game)',
    serialNumber: 'NUS-NSME-USA',
    colorHex: '#FF2A85'
  },
  'Super Mario 64': {
    characterName: 'Mario & Bowser ("King Koopa")',
    characterTitle: '3D Platforming Pioneer & Charles Martinet Voicework',
    characterQuote: '“So long, King Bowser! (Often misheard by players worldwide as \'So long, Gay Bowser!\')”',
    characterImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'SO LONG KING BOWSER',
    characterJapanese: 'スーパーマリオ64 // 任天堂',
    boxArtTitle: 'Super Mario 64 (N64 Launch Title)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'June 23, 1996',
    mediaFormat: '64-Megabit (8MB) N64 Cartridge',
    developerStudio: 'Nintendo EAD (Shigeru Miyamoto)',
    salesOrLegacy: '11.91 Million Copies Sold (Best-Selling N64 Game)',
    serialNumber: 'NUS-NSME-USA',
    colorHex: '#FF2A85'
  },

  // -------------------------------------------------------------
  // t-29: BioShock (2007)
  // -------------------------------------------------------------
  't-29': {
    characterName: 'Big Daddy (Bouncer) & Little Sister',
    characterTitle: 'Heavy Metal Protector & ADAM Harvesting Orphan',
    characterQuote: '“The horrifying groan of the Big Daddy was synthesized from dying marine mammals, leopard purrs, and bowling balls.”',
    characterImageUrl: '/images/characters/bigdaddy_retro.jpg',
    characterBadge: 'BOWLING BALL SFX',
    characterJapanese: 'バイオショック // 2K BOSTON',
    boxArtTitle: 'BioShock (Original 2007 Master)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/7670/library_600x900_2x.jpg',
    releaseDate: 'August 21, 2007',
    mediaFormat: 'DVD-ROM / Steam / Blu-ray',
    developerStudio: 'Irrational Games / 2K Boston (Ken Levine)',
    salesOrLegacy: 'BAFTA Best Game Winner 2007',
    serialNumber: '2K-BIO-2007',
    colorHex: '#00F5D4'
  },
  'BioShock': {
    characterName: 'Big Daddy (Bouncer) & Little Sister',
    characterTitle: 'Heavy Metal Protector & ADAM Harvesting Orphan',
    characterQuote: '“The horrifying groan of the Big Daddy was synthesized from dying marine mammals, leopard purrs, and bowling balls.”',
    characterImageUrl: '/images/characters/bigdaddy_retro.jpg',
    characterBadge: 'BOWLING BALL SFX',
    characterJapanese: 'バイオショック // 2K BOSTON',
    boxArtTitle: 'BioShock (Original 2007 Master)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/7670/library_600x900_2x.jpg',
    releaseDate: 'August 21, 2007',
    mediaFormat: 'DVD-ROM / Steam / Blu-ray',
    developerStudio: 'Irrational Games / 2K Boston (Ken Levine)',
    salesOrLegacy: 'BAFTA Best Game Winner 2007',
    serialNumber: '2K-BIO-2007',
    colorHex: '#00F5D4'
  },

  // -------------------------------------------------------------
  // t-30: Undertale (2015)
  // -------------------------------------------------------------
  't-30': {
    characterName: 'Sans the Skeleton & Frisk',
    characterTitle: 'Comedic Sentry & The Determined Human Child',
    characterQuote: '“Toby Fox coded the entire game and composed its 101-track masterpiece OST living in Andrew Hussie’s basement.”',
    characterImageUrl: '/images/characters/sans_retro.jpg',
    characterBadge: 'HUSSIE BASEMENT DEV',
    characterJapanese: 'アンダーテール // TOBY FOX',
    boxArtTitle: 'Undertale (GameMaker Studio)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/391540/library_600x900_2x.jpg',
    releaseDate: 'September 15, 2015',
    mediaFormat: 'Digital PC / Switch / PlayStation',
    developerStudio: 'tobyfox (Toby Fox)',
    salesOrLegacy: 'Over 5 Million Copies Sold & Global Cultural Sensation',
    serialNumber: 'TOBY-UT-2015',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-31: God of War (2005)
  // -------------------------------------------------------------
  't-31': {
    characterName: 'Kratos (Ghost of Sparta)',
    characterTitle: 'Vengeful Spartan Warrior & Slayer of Ares',
    characterQuote: '“Kratos originally had blue tattoos until literally days before the press reveal.” — David Jaffe',
    characterImageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'RED WARPAINT SHIFT',
    characterJapanese: 'クレイトス // SANTA MONICA',
    boxArtTitle: 'God of War (PlayStation 2)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900_2x.jpg',
    releaseDate: 'March 22, 2005',
    mediaFormat: 'Dual-Layer DVD-ROM',
    developerStudio: 'Santa Monica Studio (David Jaffe)',
    salesOrLegacy: 'Over 4.6 Million Copies & Action Classic',
    serialNumber: 'SCUS-97399',
    colorHex: '#FF2A85'
  },
  'God of War': {
    characterName: 'Kratos (Ghost of Sparta)',
    characterTitle: 'Vengeful Spartan Warrior & Slayer of Ares',
    characterQuote: '“Kratos originally had blue tattoos until literally days before the press reveal.” — David Jaffe',
    characterImageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'RED WARPAINT SHIFT',
    characterJapanese: 'クレイトス // SANTA MONICA',
    boxArtTitle: 'God of War (PlayStation 2)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/library_600x900_2x.jpg',
    releaseDate: 'March 22, 2005',
    mediaFormat: 'Dual-Layer DVD-ROM',
    developerStudio: 'Santa Monica Studio (David Jaffe)',
    salesOrLegacy: 'Over 4.6 Million Copies & Action Classic',
    serialNumber: 'SCUS-97399',
    colorHex: '#FF2A85'
  },

  // -------------------------------------------------------------
  // t-32: Donkey Kong Country (1994)
  // -------------------------------------------------------------
  't-32': {
    characterName: 'Donkey Kong & Diddy Kong',
    characterTitle: 'Banana Hoard Defenders & SGI 3D Pioneers',
    characterQuote: '“Rare purchased SGI supercomputers so power-hungry they blew electrical fuses across the village.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'SGI POWER OVERFLOW',
    characterJapanese: 'スーパードンキーコング // RARE',
    boxArtTitle: 'Donkey Kong Country (SNES 32-Meg)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 21, 1994',
    mediaFormat: '32-Megabit (4MB) SNES Cartridge',
    developerStudio: 'Rare Ltd. (Tim & Chris Stamper)',
    salesOrLegacy: '9.3+ Million Copies Sold (Second Best SNES Game)',
    serialNumber: 'SNS-8X-USA',
    colorHex: '#FFE600'
  },
  'Donkey Kong Country': {
    characterName: 'Donkey Kong & Diddy Kong',
    characterTitle: 'Banana Hoard Defenders & SGI 3D Pioneers',
    characterQuote: '“Rare purchased SGI supercomputers so power-hungry they blew electrical fuses across the village.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'SGI POWER OVERFLOW',
    characterJapanese: 'スーパードンキーコング // RARE',
    boxArtTitle: 'Donkey Kong Country (SNES 32-Meg)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 21, 1994',
    mediaFormat: '32-Megabit (4MB) SNES Cartridge',
    developerStudio: 'Rare Ltd. (Tim & Chris Stamper)',
    salesOrLegacy: '9.3+ Million Copies Sold (Second Best SNES Game)',
    serialNumber: 'SNS-8X-USA',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-33: Chrono Trigger (1995)
  // -------------------------------------------------------------
  't-33': {
    characterName: 'Crono & Frog (Glenn)',
    characterTitle: 'Time-Traveling Swordmasters & Masamune Bearers',
    characterQuote: '“The Dream Team coined New Game+ to let players carry max gear into past eras and find 13 endings.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'NEW GAME+ CREATORS',
    characterJapanese: 'クロノ・トリガー // SQUARE',
    boxArtTitle: 'Chrono Trigger (Super Famicom / SNES)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/613830/library_600x900_2x.jpg',
    releaseDate: 'March 11, 1995',
    mediaFormat: '32-Megabit Super Famicom Cartridge',
    developerStudio: 'Square Dream Team (Sakaguchi, Horii, Toriyama)',
    salesOrLegacy: 'Ranked Among Top 5 Video Games of All Time',
    serialNumber: 'SNS-ACTE-USA',
    colorHex: '#00F5D4'
  },
  'Chrono Trigger': {
    characterName: 'Crono & Frog (Glenn)',
    characterTitle: 'Time-Traveling Swordmasters & Masamune Bearers',
    characterQuote: '“The Dream Team coined New Game+ to let players carry max gear into past eras and find 13 endings.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'NEW GAME+ CREATORS',
    characterJapanese: 'クロノ・トリガー // SQUARE',
    boxArtTitle: 'Chrono Trigger (Super Famicom / SNES)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/613830/library_600x900_2x.jpg',
    releaseDate: 'March 11, 1995',
    mediaFormat: '32-Megabit Super Famicom Cartridge',
    developerStudio: 'Square Dream Team (Sakaguchi, Horii, Toriyama)',
    salesOrLegacy: 'Ranked Among Top 5 Video Games of All Time',
    serialNumber: 'SNS-ACTE-USA',
    colorHex: '#00F5D4'
  },

  // -------------------------------------------------------------
  // t-34: Resident Evil 4 (2005)
  // -------------------------------------------------------------
  't-34': {
    characterName: 'Leon S. Kennedy & Dante',
    characterTitle: 'Special Agent & Stylish Devil Hunter Prototype',
    characterQuote: '“A scrapped, hyper-acrobatic early build of Resident Evil 4 became the founding code of Devil May Cry.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'ACCIDENTAL DMC ORIGIN',
    characterJapanese: 'バイオハザード4 // CAPCOM',
    boxArtTitle: 'Resident Evil 4 (GameCube Exclusive)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/library_600x900_2x.jpg',
    releaseDate: 'January 11, 2005',
    mediaFormat: '2x 1.5GB GameCube Optical Discs',
    developerStudio: 'Capcom Production Studio 4 (Shinji Mikami)',
    salesOrLegacy: 'Pioneered Over-The-Shoulder Third-Person Camera',
    serialNumber: 'DOL-G4BE-USA',
    colorHex: '#FF2A85'
  },
  'Resident Evil 4': {
    characterName: 'Leon S. Kennedy & Dante',
    characterTitle: 'Special Agent & Stylish Devil Hunter Prototype',
    characterQuote: '“A scrapped, hyper-acrobatic early build of Resident Evil 4 became the founding code of Devil May Cry.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'ACCIDENTAL DMC ORIGIN',
    characterJapanese: 'バイオハザード4 // CAPCOM',
    boxArtTitle: 'Resident Evil 4 (GameCube Exclusive)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2050650/library_600x900_2x.jpg',
    releaseDate: 'January 11, 2005',
    mediaFormat: '2x 1.5GB GameCube Optical Discs',
    developerStudio: 'Capcom Production Studio 4 (Shinji Mikami)',
    salesOrLegacy: 'Pioneered Over-The-Shoulder Third-Person Camera',
    serialNumber: 'DOL-G4BE-USA',
    colorHex: '#FF2A85'
  },

  // -------------------------------------------------------------
  // t-35: The Legend of Zelda: Breath of the Wild (2017)
  // -------------------------------------------------------------
  't-35': {
    characterName: 'Link & Princess Zelda',
    characterTitle: 'Hero of the Wild & Hyrule Chem-Physics Pioneer',
    characterQuote: '“Nintendo verified every elemental chemistry and physics mechanic in an 8-bit NES prototype first.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    characterBadge: '8-BIT 2D PROTOTYPE',
    characterJapanese: 'ゼルダの伝説 ブレス オブ ザ ワイルド',
    boxArtTitle: 'The Legend of Zelda: Breath of the Wild',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'March 3, 2017',
    mediaFormat: '16GB Nintendo Switch Game Card',
    developerStudio: 'Nintendo EPD (Hidemaro Fujibayashi)',
    salesOrLegacy: 'Game of the Year 2017 & 32+ Million Copies Sold',
    serialNumber: 'HAC-AAAAA-USA',
    colorHex: '#00F5D4'
  },
  'The Legend of Zelda: Breath of the Wild': {
    characterName: 'Link & Princess Zelda',
    characterTitle: 'Hero of the Wild & Hyrule Chem-Physics Pioneer',
    characterQuote: '“Nintendo verified every elemental chemistry and physics mechanic in an 8-bit NES prototype first.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    characterBadge: '8-BIT 2D PROTOTYPE',
    characterJapanese: 'ゼルダの伝説 ブレス オブ ザ ワイルド',
    boxArtTitle: 'The Legend of Zelda: Breath of the Wild',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'March 3, 2017',
    mediaFormat: '16GB Nintendo Switch Game Card',
    developerStudio: 'Nintendo EPD (Hidemaro Fujibayashi)',
    salesOrLegacy: 'Game of the Year 2017 & 32+ Million Copies Sold',
    serialNumber: 'HAC-AAAAA-USA',
    colorHex: '#00F5D4'
  },

  // -------------------------------------------------------------
  // t-36: Half-Life (1998)
  // -------------------------------------------------------------
  't-36': {
    characterName: 'Dr. Gordon Freeman & G-Man',
    characterTitle: 'Theoretical Physicist & HEV Mark IV Suit Pilot',
    characterQuote: '“Valve scrapped 80% of the game in late 1997 because, despite amazing tech, it wasn\'t fun.” — Gabe Newell',
    characterImageUrl: '/images/characters/freeman_retro.jpg',
    characterBadge: 'COMPLETE REBOOT 1997',
    characterJapanese: 'ハーフライフ // VALVE',
    boxArtTitle: 'Half-Life (Original Sierra 1998 Release)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/library_600x900_2x.jpg',
    releaseDate: 'November 19, 1998',
    mediaFormat: 'CD-ROM 650MB',
    developerStudio: 'Valve Corporation (Gabe Newell)',
    salesOrLegacy: '50+ Game of the Year Awards & FPS Revolution',
    serialNumber: 'VALVE-HL-1998',
    colorHex: '#FFE600'
  },
  'Half-Life': {
    characterName: 'Dr. Gordon Freeman & G-Man',
    characterTitle: 'Theoretical Physicist & HEV Mark IV Suit Pilot',
    characterQuote: '“Valve scrapped 80% of the game in late 1997 because, despite amazing tech, it wasn\'t fun.” — Gabe Newell',
    characterImageUrl: '/images/characters/freeman_retro.jpg',
    characterBadge: 'COMPLETE REBOOT 1997',
    characterJapanese: 'ハーフライフ // VALVE',
    boxArtTitle: 'Half-Life (Original Sierra 1998 Release)',
    boxArtImageUrl: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/70/library_600x900_2x.jpg',
    releaseDate: 'November 19, 1998',
    mediaFormat: 'CD-ROM 650MB',
    developerStudio: 'Valve Corporation (Gabe Newell)',
    salesOrLegacy: '50+ Game of the Year Awards & FPS Revolution',
    serialNumber: 'VALVE-HL-1998',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-37: Shadow of the Colossus (2005)
  // -------------------------------------------------------------
  't-37': {
    characterName: 'Wander & Agro',
    characterTitle: 'Forbidden Land Trespasser & Faithful Steed',
    characterQuote: '“Team Ico extruded concentric polygon shells in real-time to simulate climbing fur on 32MB RAM.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'SHELL FUR GEOMETRY',
    characterJapanese: 'ワンダと巨像 // TEAM ICO',
    boxArtTitle: 'Shadow of the Colossus (PlayStation 2)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'October 18, 2005',
    mediaFormat: 'Single-Layer DVD-ROM',
    developerStudio: 'Team Ico / SCE Japan Studio (Fumito Ueda)',
    salesOrLegacy: 'Widely Cited as Definitive Proof Games Are Art',
    serialNumber: 'SCUS-97472',
    colorHex: '#9D4EDD'
  },
  'Shadow of the Colossus': {
    characterName: 'Wander & Agro',
    characterTitle: 'Forbidden Land Trespasser & Faithful Steed',
    characterQuote: '“Team Ico extruded concentric polygon shells in real-time to simulate climbing fur on 32MB RAM.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'SHELL FUR GEOMETRY',
    characterJapanese: 'ワンダと巨像 // TEAM ICO',
    boxArtTitle: 'Shadow of the Colossus (PlayStation 2)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'October 18, 2005',
    mediaFormat: 'Single-Layer DVD-ROM',
    developerStudio: 'Team Ico / SCE Japan Studio (Fumito Ueda)',
    salesOrLegacy: 'Widely Cited as Definitive Proof Games Are Art',
    serialNumber: 'SCUS-97472',
    colorHex: '#9D4EDD'
  },

  // -------------------------------------------------------------
  // t-38: Metroid Prime (2002)
  // -------------------------------------------------------------
  't-38': {
    characterName: 'Samus Aran (Power Suit)',
    characterTitle: 'Galactic Bounty Hunter & First-Person Explorer',
    characterQuote: '“Shigeru Miyamoto saved Retro Studios’ troubled development by commanding a first-person visor view.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'MIYAMOTO VISOR MANDATE',
    characterJapanese: 'メトロイドプライム // 任天堂',
    boxArtTitle: 'Metroid Prime (Nintendo GameCube)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 18, 2002',
    mediaFormat: '1.5GB GameCube Optical Disc',
    developerStudio: 'Retro Studios / Nintendo (Mark Pacini)',
    salesOrLegacy: '97/100 Metacritic Score & FPS Masterpiece',
    serialNumber: 'DOL-GM8E-USA',
    colorHex: '#FFE600'
  },
  'Metroid Prime': {
    characterName: 'Samus Aran (Power Suit)',
    characterTitle: 'Galactic Bounty Hunter & First-Person Explorer',
    characterQuote: '“Shigeru Miyamoto saved Retro Studios’ troubled development by commanding a first-person visor view.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'MIYAMOTO VISOR MANDATE',
    characterJapanese: 'メトロイドプライム // 任天堂',
    boxArtTitle: 'Metroid Prime (Nintendo GameCube)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'November 18, 2002',
    mediaFormat: '1.5GB GameCube Optical Disc',
    developerStudio: 'Retro Studios / Nintendo (Mark Pacini)',
    salesOrLegacy: '97/100 Metacritic Score & FPS Masterpiece',
    serialNumber: 'DOL-GM8E-USA',
    colorHex: '#FFE600'
  },

  // -------------------------------------------------------------
  // t-39: Castlevania: Symphony of the Night (1997)
  // -------------------------------------------------------------
  't-39': {
    characterName: 'Alucard (Adrian Fahrenheit Ţepeş)',
    characterTitle: 'Dhampir Son of Dracula & Metroidvania Pioneer',
    characterQuote: '“Koji Igarashi flipped the entire castle upside-down to double game length with zero extra budget.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'INVERTED CASTLE REVERSAL',
    characterJapanese: '悪魔城ドラキュラX 月下の夜想曲',
    boxArtTitle: 'Castlevania: Symphony of the Night (PS1)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'March 20, 1997',
    mediaFormat: 'CD-ROM (Black Backing PlayStation)',
    developerStudio: 'Konami Computer Entertainment Tokyo (Koji Igarashi)',
    salesOrLegacy: 'Created the "Metroidvania" Genre Name & Blueprint',
    serialNumber: 'SLUS-00067',
    colorHex: '#9D4EDD'
  },
  'Castlevania: Symphony of the Night': {
    characterName: 'Alucard (Adrian Fahrenheit Ţepeş)',
    characterTitle: 'Dhampir Son of Dracula & Metroidvania Pioneer',
    characterQuote: '“Koji Igarashi flipped the entire castle upside-down to double game length with zero extra budget.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'INVERTED CASTLE REVERSAL',
    characterJapanese: '悪魔城ドラキュラX 月下の夜想曲',
    boxArtTitle: 'Castlevania: Symphony of the Night (PS1)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'March 20, 1997',
    mediaFormat: 'CD-ROM (Black Backing PlayStation)',
    developerStudio: 'Konami Computer Entertainment Tokyo (Koji Igarashi)',
    salesOrLegacy: 'Created the "Metroidvania" Genre Name & Blueprint',
    serialNumber: 'SLUS-00067',
    colorHex: '#9D4EDD'
  },

  // -------------------------------------------------------------
  // t-40: Sonic the Hedgehog (1991)
  // -------------------------------------------------------------
  't-40': {
    characterName: 'Sonic the Hedgehog & Dr. Eggman',
    characterTitle: 'Blue Blur Speedster & 16-Bit Momentum Pioneer',
    characterQuote: '“Yuji Naka developed the 360-degree loop algorithm by studying rollercoaster tracks.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'ROLLERCOASTER LOOPS',
    characterJapanese: 'ソニック・ザ・ヘッジホッグ // SEGA',
    boxArtTitle: 'Sonic the Hedgehog (Sega Genesis 4-Meg)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'June 23, 1991',
    mediaFormat: '4-Megabit (512KB) Mega Drive Cartridge',
    developerStudio: 'Sonic Team / Sega (Yuji Naka & Naoto Ohshima)',
    salesOrLegacy: '15+ Million Copies & Propelled Sega to 55% US Market Share',
    serialNumber: 'SEGA-01009',
    colorHex: '#00F5D4'
  },
  'Sonic the Hedgehog': {
    characterName: 'Sonic the Hedgehog & Dr. Eggman',
    characterTitle: 'Blue Blur Speedster & 16-Bit Momentum Pioneer',
    characterQuote: '“Yuji Naka developed the 360-degree loop algorithm by studying rollercoaster tracks.”',
    characterImageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    characterBadge: 'ROLLERCOASTER LOOPS',
    characterJapanese: 'ソニック・ザ・ヘッジホッグ // SEGA',
    boxArtTitle: 'Sonic the Hedgehog (Sega Genesis 4-Meg)',
    boxArtImageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
    releaseDate: 'June 23, 1991',
    mediaFormat: '4-Megabit (512KB) Mega Drive Cartridge',
    developerStudio: 'Sonic Team / Sega (Yuji Naka & Naoto Ohshima)',
    salesOrLegacy: '15+ Million Copies & Propelled Sega to 55% US Market Share',
    serialNumber: 'SEGA-01009',
    colorHex: '#00F5D4'
  }
};
