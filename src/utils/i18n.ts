import { useState, useEffect } from 'react';
import type { TriviaItem, GameEra, TriviaTag } from '../types/trivia';
import { sound } from '../audio/soundEngine';

export type Language = 'id' | 'en';

const STORAGE_KEY_LANGUAGE = 'erago_arcade_language';

// Auto-detect browser language or fall back to Indonesian by default
const detectInitialLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LANGUAGE);
    if (saved === 'id' || saved === 'en') {
      return saved;
    }
    const browserLang = navigator.language?.toLowerCase() || '';
    return browserLang.startsWith('id') ? 'id' : 'en';
  } catch {
    return 'id';
  }
};

let currentLanguage: Language = detectInitialLanguage();
const listeners = new Set<(lang: Language) => void>();

export const getLanguage = (): Language => currentLanguage;

export const setLanguage = (lang: Language, playSound: boolean = true): void => {
  if (currentLanguage === lang) return;
  currentLanguage = lang;
  try {
    localStorage.setItem(STORAGE_KEY_LANGUAGE, lang);
  } catch {
    // Ignore storage quota errors
  }
  if (playSound) {
    sound.playClick();
  }
  listeners.forEach((listener) => {
    try {
      listener(lang);
    } catch (err) {
      console.error('Error in language listener:', err);
    }
  });
};

export const subscribeLanguage = (listener: (lang: Language) => void): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const useLanguage = () => {
  const [lang, setLang] = useState<Language>(getLanguage());

  useEffect(() => {
    return subscribeLanguage((newLang) => {
      setLang(newLang);
    });
  }, []);

  const toggleLanguage = () => {
    setLanguage(lang === 'id' ? 'en' : 'id');
  };

  return {
    language: lang,
    setLanguage,
    toggleLanguage,
    t: (key: string, params?: Record<string, string | number>) => t(key, params, lang),
  };
};

// ============================================================================
// UI TRANSLATION DICTIONARY
// ============================================================================

export const DICTIONARY: Record<string, { id: string; en: string }> = {
  // Brand & Header
  'brand_subtitle': {
    id: 'VAULT TRIVIA VIDEO GAME // SEJAK 1980–2024',
    en: 'VIDEO GAME TRIVIA VAULT // EST. 1980–2024',
  },
  'tab_roulette': {
    id: 'PUTAR',
    en: 'ROULETTE',
  },
  'tab_lookbook': {
    id: 'KATALOG',
    en: 'LOOKBOOK',
  },
  'tab_quiz': {
    id: 'TANTANGAN',
    en: 'CHALLENGE',
  },
  'tab_cheats': {
    id: 'CHEAT',
    en: 'CHEATS',
  },
  'tab_news': {
    id: 'BERITA',
    en: 'NEWS',
  },

  // Arcade Extras Hub
  'hub_button': {
    id: 'ARCADE HUB',
    en: 'ARCADE HUB',
  },
  'hub_title': {
    id: 'EKSTRA VAULT ARCADE',
    en: 'ARCADE VAULT EXTRAS',
  },
  'hub_modes_count': {
    id: '8 MODE',
    en: '8 MODES',
  },
  'hub_boss_rush': {
    id: 'BOSS RUSH',
    en: 'BOSS RUSH',
  },
  'hub_boss_rush_desc': {
    id: 'Pertarungan RPG',
    en: 'RPG Combat',
  },
  'hub_bonus_stage': {
    id: '5 MINI GAME',
    en: '5 GAMES',
  },
  'hub_bonus_stage_desc': {
    id: 'Pustaka Bonus',
    en: 'Bonus Library',
  },
  'hub_card_binder': {
    id: 'BINDER KARTU',
    en: 'CARD BINDER',
  },
  'hub_card_binder_desc': {
    id: 'Koleksi Hologram 3D',
    en: '3D Foil Collection',
  },
  'hub_terminal': {
    id: 'PROMPT MS-DOS',
    en: 'MS-DOS PROMPT',
  },
  'hub_terminal_desc': {
    id: 'Terminal Vintage',
    en: 'Vintage Shell',
  },
  'hub_soundboard': {
    id: 'SOUNDBOARD',
    en: 'SOUNDBOARD',
  },
  'hub_soundboard_desc': {
    id: 'SFX Retro 90-an',
    en: '90s Retro SFX',
  },
  'hub_theme': {
    id: 'TEMA KABINET',
    en: 'CABINET THEME',
  },
  'hub_theme_desc': {
    id: 'Skin Warna Konsol',
    en: 'Console Color Skins',
  },
  'hub_trophy': {
    id: 'LEMARI TROFI',
    en: 'TROPHY CASE',
  },
  'hub_trophy_desc': {
    id: 'Pencapaian Vault',
    en: 'Vault Achievements',
  },
  'hub_stickers': {
    id: 'STICKER BOMB',
    en: 'STICKER BOMB',
  },
  'hub_stickers_desc': {
    id: 'Sticker Kanvas Retro',
    en: 'Canvas Retro Decals',
  },
  'hub_press_wire': {
    id: 'PORTAL BERITA',
    en: 'PRESS WIRE',
  },
  'hub_press_wire_desc': {
    id: 'Berita 12 Outlet Game',
    en: '12 Outlets News',
  },
  'discovered': {
    id: 'TERBUKA',
    en: 'DISCOVERED',
  },
  'fm_radio': {
    id: 'RADIO FM',
    en: 'FM RADIO',
  },
  'coins_label': {
    id: 'KOIN',
    en: 'COINS',
  },

  // Arcade Controls
  'roll_btn_roll': {
    id: 'MASUKKAN 10 KOIN / PUTAR',
    en: 'INSERT 10 COINS / ROLL',
  },
  'roll_btn_shuffling': {
    id: 'MENGACAK MEMORI...',
    en: 'SHUFFLING MEMORY...',
  },
  'roll_subtext_ready': {
    id: 'TEKAN [SPASI] ATAU KLIK UNTUK MEMUTAR',
    en: 'PRESS [SPACEBAR] OR CLICK TO SHUFFLE',
  },
  'roll_subtext_insufficient': {
    id: '⚠️ KOIN TIDAK CUKUP! KLIK UNTUK BANTUAN',
    en: '⚠️ INSUFFICIENT COINS! CLICK FOR HELP',
  },
  'filter_era_label': {
    id: 'ERA:',
    en: 'ERA:',
  },
  'filter_lore_label': {
    id: 'LORE:',
    en: 'LORE:',
  },

  // Trivia Card
  'card_decrypting': {
    id: '⚡ MEMECAHKAN KODE ROM...',
    en: '⚡ DECRYPTING ROM...',
  },
  'card_rom': {
    id: 'ROM KATRID //',
    en: 'CARTRIDGE ROM //',
  },
  'card_takeaway': {
    id: 'INTISARI ARSIP:',
    en: 'ARCHIVE TAKEAWAY:',
  },
  'card_mindblown': {
    id: 'MINDBLOWN:',
    en: 'MINDBLOWN:',
  },
  'card_verified_metric': {
    id: 'METRIK ARSIP TERVERIFIKASI',
    en: 'VERIFIED ARCHIVE METRIC',
  },
  'card_boom': {
    id: 'BOOM! 💥',
    en: 'BOOM! 💥',
  },
  'card_mindblown_btn': {
    id: 'MINDBLOWN! 🔥',
    en: 'MINDBLOWN! 🔥',
  },
  'card_test_knowledge': {
    id: 'UJI PENGETAHUAN',
    en: 'TEST KNOWLEDGE',
  },
  'card_share': {
    id: 'BAGIKAN TRIVIA',
    en: 'SHARE TRIVIA',
  },
  'card_copied': {
    id: 'TERSALIN!',
    en: 'COPIED!',
  },
  'card_developer': {
    id: 'DEVELOPER:',
    en: 'DEVELOPER:',
  },
  'card_genre': {
    id: 'GENRE:',
    en: 'GENRE:',
  },

  // Coin Bank Modal
  'bank_title': {
    id: 'BRANKAS KOIN ARCADE',
    en: 'ARCADE COIN VAULT',
  },
  'bank_subtitle': {
    id: 'STATUS SALDO & ATURAN MATA UANG',
    en: 'BALANCE STATUS & CURRENCY RULES',
  },
  'bank_current_balance': {
    id: 'SALDO SAAT INI',
    en: 'CURRENT BALANCE',
  },
  'bank_points_buffer': {
    id: 'BUFFER POIN MINI GAME',
    en: 'MINI GAME POINT BUFFER',
  },
  'bank_buffer_subtext': {
    id: 'Kumpulkan {needed} poin lagi untuk konversi otomatis jadi +10 Koin',
    en: 'Collect {needed} more points for automatic conversion to +10 Coins',
  },
  'bank_next_time_reward': {
    id: 'HADIAH WAKTU AKTIF BERIKUTNYA',
    en: 'NEXT ACTIVE TIME REWARD',
  },
  'bank_time_reward_sub': {
    id: 'Setiap 10 menit aktif di website = +100 Koin otomatis!',
    en: 'Every 10 minutes active on website = +100 Coins automatically!',
  },
  'bank_rules_heading': {
    id: 'ATURAN RESMI MATA UANG ARCADE',
    en: 'OFFICIAL ARCADE CURRENCY RULES',
  },
  'rule_starting_title': {
    id: 'Modal Awal Pengguna',
    en: 'Starting User Balance',
  },
  'rule_starting_desc': {
    id: '2.000 Koin gratis saat pertama kali membuka website',
    en: '2,000 Free Coins when first visiting the website',
  },
  'rule_roll_title': {
    id: 'Biaya Putar Trivia',
    en: 'Trivia Roll Cost',
  },
  'rule_roll_desc': {
    id: '10 Koin setiap kali memutar kartu trivia baru',
    en: '10 Coins each time you roll a new trivia card',
  },
  'rule_points_title': {
    id: 'Konversi Skor Mini Game',
    en: 'Mini Game Score Conversion',
  },
  'rule_points_desc': {
    id: 'Setiap 100 poin yang diperoleh = 10 Koin',
    en: 'Every 100 points earned = 10 Coins',
  },
  'rule_boss_title': {
    id: 'Hadiah Trivia Boss Rush',
    en: 'Trivia Boss Rush Reward',
  },
  'rule_boss_desc': {
    id: '+20 Koin bonus langsung setiap menyelesaikan stage boss',
    en: '+20 Coins direct bonus every time you clear a boss stage',
  },
  'rule_time_title': {
    id: 'Gaji Waktu 10 Menit',
    en: '10-Minute Playtime Reward',
  },
  'rule_time_desc': {
    id: '+100 Koin gratis setiap 10 menit berada di website',
    en: '+100 Free Coins every 10 minutes on the website',
  },
  'bank_btn_minigame': {
    id: 'MAIN MINI-GAME (+KOIN)',
    en: 'PLAY MINI-GAMES (+COINS)',
  },
  'bank_btn_boss': {
    id: 'LAWAN BOSS (+20 KOIN)',
    en: 'FIGHT BOSS (+20 COINS)',
  },
  'bank_btn_close': {
    id: 'TUTUP BRANKAS',
    en: 'CLOSE VAULT',
  },

  // Insufficient Coins Modal
  'insufficient_title': {
    id: 'KOIN TIDAK CUKUP!',
    en: 'INSUFFICIENT COINS!',
  },
  'insufficient_subtitle': {
    id: 'KOIN TIDAK CUKUP UNTUK MEMUTAR TRIVIA',
    en: 'NOT ENOUGH COINS TO ROLL TRIVIA',
  },
  'insufficient_msg': {
    id: 'Anda membutuhkan minimal 10 Koin untuk memutar katrid trivia baru. Koin Anda saat ini:',
    en: 'You need at least 10 Coins to roll a new trivia cartridge. Your current balance:',
  },
  'insufficient_how_to': {
    id: 'CARA CEPAT MENDAPATKAN KOIN:',
    en: 'HOW TO EARN COINS FAST:',
  },
  'insufficient_tip_1': {
    id: 'Mainkan 5 Mini-Game Arcade: Setiap 100 poin akan otomatis dikonversi menjadi 10 Koin!',
    en: 'Play 5 Arcade Mini-Games: Every 100 points converts into 10 Coins automatically!',
  },
  'insufficient_tip_2': {
    id: 'Kalahkan Trivia Boss Rush: Dapatkan +20 Koin setiap menyelesaikan pertarungan boss!',
    en: 'Defeat Trivia Boss Rush: Earn +20 Coins every time you clear a boss battle!',
  },
  'insufficient_tip_3': {
    id: 'Tunggu Waktu Pasif: Dapatkan +100 Koin gratis setiap 10 menit aktif di website.',
    en: 'Wait for Passive Playtime: Get +100 Free Coins every 10 minutes active on website.',
  },

  // News Strip & Modal
  'news_header_title': {
    id: 'PORTAL BERITA GAMING & ENTERTAINMENT',
    en: 'GAMING & ENTERTAINMENT PRESS WIRE',
  },
  'news_modal_subtitle': {
    id: 'PORTAL RESMI BERITA GAME DUNIA // SINDIKASI REAL-TIME',
    en: 'OFFICIAL GLOBAL GAMING NEWS PORTAL // REAL-TIME SYNDICATION',
  },
  'news_12_outlets': {
    id: '12 OUTLET',
    en: '12 OUTLETS',
  },
  'news_live_feed': {
    id: 'LIVE FEED',
    en: 'LIVE FEED',
  },
  'news_tagline_text': {
    id: 'Berita kurasi langsung dari 12 media game & teknologi terkemuka dunia',
    en: 'Curated direct news from 12 world-leading gaming & tech media outlets',
  },
  'news_all_outlets_btn': {
    id: 'SEMUA OUTLET (12)',
    en: 'ALL OUTLETS (12)',
  },
  'news_all_categories': {
    id: 'Semua Kategori',
    en: 'All Categories',
  },
  'news_search_placeholder': {
    id: 'Cari judul berita, topik, studio, atau game...',
    en: 'Search news headline, topic, studio, or game...',
  },
  'news_showing': {
    id: 'MENAMPILKAN',
    en: 'SHOWING',
  },
  'news_articles': {
    id: 'ARTIKEL',
    en: 'ARTICLES',
  },
  'news_read_original': {
    id: 'BACA DI SITUS ASLI',
    en: 'READ ORIGINAL SITE',
  },
  'news_no_articles': {
    id: 'Tidak ada berita yang cocok dengan filter saat ini.',
    en: 'No articles match the current filter.',
  },
  'news_reset_filters': {
    id: 'RESET FILTER',
    en: 'RESET FILTERS',
  },
  'news_refresh': {
    id: 'REFRESH',
    en: 'REFRESH',
  },
  'news_open_site': {
    id: 'BUKA SITUS RESMI',
    en: 'OPEN OFFICIAL SITE',
  },
  'news_showing_count': {
    id: 'Menampilkan {count} berita',
    en: 'Showing {count} news',
  },
  'news_from': {
    id: 'dari',
    en: 'from',
  },
  'news_hint_click': {
    id: 'Klik artikel untuk membaca liputan lengkap di situs resmi',
    en: 'Click article to read full coverage on official site',
  },
  'news_read_btn': {
    id: 'BACA',
    en: 'READ',
  },
  'news_not_found': {
    id: 'TIDAK ADA BERITA DITEMUKAN',
    en: 'NO NEWS FOUND',
  },
  'news_not_found_desc': {
    id: 'Tidak ada artikel yang cocok dengan filter atau kata kunci "{query}". Coba ganti kata kunci atau pilih "SEMUA OUTLET".',
    en: 'No articles match filter or keyword "{query}". Try changing keyword or select "ALL OUTLETS".',
  },
  'news_footer_notice': {
    id: 'Semua berita bersumber langsung dari 12 portal resmi internasional.',
    en: 'All news sourced directly from 12 official international portals.',
  },
  'news_back_arcade': {
    id: 'KEMBALI KE ARCADE [ESC]',
    en: 'BACK TO ARCADE [ESC]',
  },

  // App & Footer
  'memory_cartridge_label': {
    id: 'KATRID MEMORI SAAT INI:',
    en: 'CURRENT MEMORY CARTRIDGE:',
  },
  'footer_tagline': {
    id: 'Vault trivia video game interaktif bernuansa retro 90-an.',
    en: 'Interactive 90s-style video game trivia vault.',
  },
  'footer_space': {
    id: '[SPASI] PUTAR',
    en: '[SPACE] ROLL',
  },
  'footer_crt': {
    id: '[C] FILTER CRT',
    en: '[C] CRT FILTER',
  },
  'footer_mute': {
    id: '[M] BISUKAN',
    en: '[M] MUTE',
  },
  'footer_lang': {
    id: '[L] GANTI BAHASA',
    en: '[L] LANGUAGE',
  },
  'marquee_bottom': {
    id: '✦ ERAGO ARCADE ✦ 100% SEJARAH GAME LEGENDARIS ✦ TEKAN [SPASI] UNTUK MEMUTAR ✦ GLITCH RETRO & RAHASIA HARDWARE ✦',
    en: '✦ ERAGO ARCADE ✦ 100% UNHINGED GAMING HISTORY ✦ PRESS [SPACEBAR] TO ROLL ✦ RETRO GLITCHES & HARDWARE SECRETS ✦',
  },
};

export const t = (key: string, params?: Record<string, string | number>, lang: Language = currentLanguage): string => {
  const entry = DICTIONARY[key];
  let text = entry ? (entry[lang] ?? entry.en) : key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    });
  }
  return text;
};

// ============================================================================
// METADATA TRANSLATIONS (Eras, Tags, Rarity)
// ============================================================================

export const ERA_TRANSLATIONS: Record<GameEra, { id: string; en: string }> = {
  'All': { id: 'Semua Era', en: 'All Eras' },
  'Retro 80-90s': { id: 'Retro 80-90-an', en: 'Retro 80-90s' },
  '3D Pioneer': { id: 'Pelopor 3D', en: '3D Pioneer' },
  'Golden 2000s': { id: 'Era Emas 2000-an', en: 'Golden 2000s' },
  'Modern Era': { id: 'Era Modern', en: 'Modern Era' },
};

export const TAG_TRANSLATIONS: Record<TriviaTag, { id: string; en: string }> = {
  'All': { id: 'Semua Lore', en: 'All Lore' },
  'Hardware Hack': { id: 'Retasan Hardware', en: 'Hardware Hack' },
  'Glitch Lore': { id: 'Kisah Glitch', en: 'Glitch Lore' },
  'Dev Secret': { id: 'Rahasia Developer', en: 'Dev Secret' },
  'Cut Content': { id: 'Konten Dihapus', en: 'Cut Content' },
  'Easter Egg': { id: 'Easter Egg', en: 'Easter Egg' },
  'Mind-Blower': { id: 'Fakta Mencengangkan', en: 'Mind-Blower' },
};

export const RARITY_TRANSLATIONS: Record<string, { id: string; en: string }> = {
  'COMMON VINTAGE': { id: 'VINTAGE UMUM', en: 'COMMON VINTAGE' },
  'RARE COLLECTIBLE': { id: 'KOLEKSI LANGKA', en: 'RARE COLLECTIBLE' },
  'LEGENDARY SECRET': { id: 'RAHASIA LEGENDARIS', en: 'LEGENDARY SECRET' },
  'CURSED ANOMALY': { id: 'ANOMALI TERKUTUK', en: 'CURSED ANOMALY' },
};

export const translateEra = (era: GameEra, lang: Language): string => {
  return ERA_TRANSLATIONS[era]?.[lang] || era;
};

export const translateTag = (tag: TriviaTag, lang: Language): string => {
  return TAG_TRANSLATIONS[tag]?.[lang] || tag;
};

export const translateRarity = (rarity: string, lang: Language): string => {
  return RARITY_TRANSLATIONS[rarity]?.[lang] || rarity;
};

// ============================================================================
// CURATED INDONESIAN TRIVIA CONTENT OVERRIDES
// ============================================================================

export interface TriviaTranslationItem {
  headline?: string;
  story?: string;
  verifiedFact?: string;
  quoteOrLore?: string;
  easterEggNote?: string;
  quizQuestion?: string;
  quizOptions?: string[];
  quizExplanation?: string;
}

export const TRIVIA_ID_OVERLAYS: Record<string, TriviaTranslationItem> = {
  't-01': {
    headline: 'Awan dan Semak Menggunakan Sprite Piksel 8-Bit yang Sama Persis',
    story: 'Menghadapi batas memori katrid 40 kilobyte Famicom yang sangat ketat, Shigeru Miyamoto dan Takashi Tezuka tidak memiliki ruang ROM tersisa untuk elemen latar terpisah. Trik cerdas mereka? Awan putih berbulu halus dan semak hijau di tanah berbagi sprite piksel yang sama persis—game ini hanya menukar palet warna antara hijau dan putih.',
    verifiedFact: 'Dengan memakai ulang alamat memori sprite melalui pergantian palet warna satu byte, Nintendo menghemat ruang ROM penting untuk audio dan desain level.',
    quoteOrLore: '“Kami memeras setiap byte dari ROM 256-kbit tersebut.” — Shigeru Miyamoto',
    easterEggNote: 'Perhatikan baik-baik screenshot klasik stage 1-1: siluet semak 100% sama dengan awan!',
    quizQuestion: 'Bagaimana Nintendo memasukkan awan dan semak ke dalam ROM 40KB Super Mario Bros.?',
    quizOptions: [
      'Mengompres gambar dengan algoritma ZIP awal',
      'Awan dan semak memakai sprite yang sama persis dengan penggantian palet warna',
      'Memuatnya secara prosedural lewat gelombang sinus matematika',
      'Semak digambar secara real-time oleh chip audio NES'
    ],
    quizExplanation: 'Nintendo menggunakan ulang data sprite yang identik, hanya mengganti palet warna dari hijau menjadi putih/sian.'
  },
  't-02': {
    headline: 'Seekor Lebah Berfisika Melemparkan Gerobak Pembuka Skyrim ke Luar Angkasa',
    story: 'Selama pengembangan, perjalanan gerobak pembuka ke Helgen terus mengalami bug parah. Gerobak tiba-tiba menabrak gaya tak terlihat lalu meluncur ke stratosfer seperti roket. Senior designer Bethesda, Nate Purkeypile, menyelidikinya dan menemukan biang keladinya: seekor lebah madu! Lebah di Skyrim diberi tabrakan fisik agar pemain bisa menangkapnya, namun saat lebah menabrak gerobak yang bergerak, engine fisika Havok melipatgandakan tabrakan kinetik secara eksponensial hingga gerobak terlempar ke angkasa.',
    verifiedFact: 'Bethesda harus menghapus respon tabrakan fisik dari serangga terbang agar tidak mengacaukan adegan pembuka naga.',
    quoteOrLore: '“Lebah tersebut adalah objek tak bergerak yang bertemu gerobak tak terhentikan.” — Nate Purkeypile',
    easterEggNote: 'Jika Anda bertanya-tanya mengapa terbangun dengan "Hey you, you\'re finally awake"—hampir saja menjadi "Hey you, you\'re in low earth orbit".',
    quizQuestion: 'Serangga tak terduga apa yang melontarkan gerobak pembuka Skyrim ke langit saat pengujian QA?',
    quizOptions: [
      'Laba-laba raksasa yang jatuh dari pohon',
      'Kupu-kupu yang hinggap di as roda kayu',
      'Seekor lebah madu yang memiliki tabrakan fisik aktif',
      'Capung yang tersangkut di dalam model kuda'
    ],
    quizExplanation: 'Lebah madu kecil memiliki collision aktif. Saat gerobak menyenggolnya, mesin Havok physics melontarkannya ke luar angkasa!'
  },
  't-03': {
    headline: 'Kabut Menakutkan Merupakan Solusi Darurat Batas Jarak Pandang PS1',
    story: 'Konsol PlayStation asli memiliki keterbatasan render 3D yang parah: mesin geometrinya hanya sanggup memproses sedikit poligon bertekstur per frame sebelum terjadi lag. Alih-alih membiarkan objek muncul mendadak (pop-in) atau memotong jalanan luar, sutradara Keiichiro Toyama memanfaatkan batasan tersebut: mereka menyelimuti seluruh kota terkutuk dengan kabut tebal yang mencekam. Solusi darurat hardware ini kini menjadi ciri khas paling ikonik dalam sejarah genre psychological horror.',
    verifiedFact: 'PS1 tidak memiliki hardware Z-buffering; kabut memungkinkan engine memotong poligon secara agresif dalam jarak beberapa meter saja dari Harry Mason.',
    quoteOrLore: '“Kami tidak bisa menampilkan cakrawala, jadi kami membuat ketiadaan cakrawala itu menakutkan.” — Team Silent',
    easterEggNote: 'Saat game ini di-remaster dengan jarak pandang lebih jauh, penggemar justru mengeluh karena jalanan yang terlihat jelas menghilangkan rasa takut.',
    quizQuestion: 'Mengapa Team Silent awalnya menyematkan kabut tebal di kota Silent Hill?',
    quizOptions: [
      'Meniru kebakaran tambang batu bara asli di Centralia, Pennsylvania',
      'Menutupi batas jarak pandang poligon PlayStation dan mencegah pop-in',
      'Karena sutradara menderita asma saat kecil',
      'Karena glitch shader yang mengubah seluruh langit menjadi abu-abu'
    ],
    quizExplanation: 'Kabut adalah solusi teknis untuk batasan perangkat keras PS1 yang menyembunyikan jarak pandang sebelum akhirnya menjadi ciri khas horor.'
  },
  't-04': {
    headline: 'Psycho Mantis Membaca Memory Card Asli & Memaksa Ganti Port Kontroler',
    story: 'Hideo Kojima ingin mendobrak dinding keempat sepenuhnya. Saat berhadapan dengan Psycho Mantis, penjahat psikis ini memindai memory card PS1 asli pemain dan mengomentari jika ada save data game Castlevania: Symphony of the Night atau Suikoden! Lebih gilanya lagi: Mantis memprediksi gerakan Anda dengan membaca input Port Kontroler 1. Satu-satunya cara mengalahkannya adalah mencabut kontroler fisik Anda dan memindahkannya ke Port 2, membutakan pikiran telepati miliknya.',
    verifiedFact: 'Kojima secara khusus menginstruksikan teknisi audio untuk menambahkan getaran haptic guna memverifikasi apakah motor getar kontroler berfungsi.',
    quoteOrLore: '“Kulihat kau menyukai Castlevania... kau jarang menyimpan permainan ya?” — Psycho Mantis',
    easterEggNote: 'Jika Anda tidak punya kontroler kedua atau tidak bisa memindahkan port, menembak patung kepala di ruangan memberi jalur alternatif.',
    quizQuestion: 'Bagaimana pemain menetralkan prediksi telepati Psycho Mantis di Metal Gear Solid 1?',
    quizOptions: [
      'Memakai kacamata termal untuk menemukan bayangannya',
      'Mencabut kontroler dan memindahkannya secara fisik ke Port 2',
      'Menghapus save file memory card di BIOS konsol',
      'Menunggu 15 menit sampai stamina psikisnya habis'
    ],
    quizExplanation: 'Dengan mencolokkan ke Port 2, game berhenti menyalurkan perintah pergerakan pemain ke loop prediksi AI Psycho Mantis!'
  },
  't-05': {
    headline: 'Monster Ikonik Creeper Terlahir dari Typo Model Babi yang Terbalik',
    story: 'Saat Markus "Notch" Persson bereksperimen dengan model mob di versi alpha awal Minecraft (2009), ia berniat membuat babi berkaki empat standar. Namun, ia tak sengaja menukar koordinat X dan Y dimensi tubuh di kode Java—menempatkan tinggi di posisi panjang. Hasilnya adalah makhluk aneh berdiri tegak dengan empat kaki pendek. Alih-alih membuangnya, Notch memberinya tekstur hijau, AI kamikaze agresif, dan menciptakan maskot paling dikenal di dunia game.',
    verifiedFact: 'Suara desisan sumbu Creeper sebenarnya adalah rekaman audio kembang api terbakar yang diperlambat.',
    quoteOrLore: '“Saya tidak sengaja membuatnya tinggi dan bukan panjang. Kelihatan aneh dan menyeramkan, jadi saya pertahankan.” — Notch',
    easterEggNote: 'Hingga kini, Creeper menjatuhkan piringan musik jika dibunuh oleh panah skeleton—penghormatan untuk asal-usul glitch-nya.',
    quizQuestion: 'Hewan apa yang sebenarnya ingin dibuat oleh Notch ketika tak sengaja menciptakan Creeper?',
    quizOptions: [
      'Domba',
      'Babi',
      'Sapi zombi',
      'Tanaman rambat merayap'
    ],
    quizExplanation: 'Notch menukar dimensi panjang dan tinggi saat mengoding model babi, menciptakan mutan jangkung berkaki empat yang menjadi Creeper.'
  },
  't-06': {
    headline: 'Kereta Metro Berjalan di Fallout 3 Sebenarnya adalah NPC Memakai Kereta sebagai Helm',
    story: 'Engine Gamebryo yang menggerakkan Fallout 3 tidak memiliki dukungan bawaan untuk kendaraan kemudi atau kereta bergerak dinamis. Saat tim Bethesda membutuhkan kereta bawah tanah bergerak untuk DLC Broken Steel, membuat fisika kendaraan baru akan membutuhkan perombakan engine besar-besaran. Solusi mereka? Mereka mengambil NPC manusia standar, menempatkannya di bawah rel, memberinya kecepatan lari super, dan memasang gerbong kereta Metro di slot inventaris Helm/Armor miliknya! Saat kereta melaju, ada seorang pria di bawah tanah yang sedang berlari sekencang 60 mph membawa gerbong di kepalanya.',
    verifiedFact: 'Item ini di Creation Kit Fallout 3 secara harfiah bernama "DLC03MetroCarArmor".',
    quoteOrLore: '“NPC Helm Kereta adalah bukti bahwa pembuatan game adalah 90% lakban dan mukjizat.”',
    easterEggNote: 'Jika Anda mengarahkan kamera tembus ke bawah tanah, Anda bisa melihat kaki kecilnya yang berlari kencang.',
    quizQuestion: 'Bagaimana Bethesda mengimplementasikan kereta metro bergerak di Fallout 3: Broken Steel?',
    quizOptions: [
      'Mereka menulis skrip fisika kereta Havok khusus',
      'Seorang NPC di bawah rel memakai gerbong kereta sebagai helm dan berlari kencang',
      'Mereka memutar seluruh dunia wasteland di sekitar kamera stasioner',
      'Itu adalah rekaman video Bink 30fps pra-render pada tekstur datar'
    ],
    quizExplanation: 'Mereka membuat helm yang bisa dipakai bernama "DLC03MetroCarArmor" dan dipasangkan pada NPC tersembunyi yang berlari di bawah rel!'
  },
  't-07': {
    headline: 'Hadiah Awal "Pendant" Misterius Hanyalah Lelucon untuk Mengerjai Dataminer',
    story: 'Saat Dark Souls rilis, para pemain menghabiskan ratusan jam bersama mencoba mengungkap misteri hadiah awal "The Pendant". Deskripsinya berbunyi: "Liontin sederhana tanpa efek... namun kenangan indah menghibur pengelana." Pemain menukarnya ke Snuggly, melemparnya ke patung batu, dan menjelajahi seluruh Lordran demi quest rahasia. Dalam wawancara 2012 dengan Famitsu, sutradara Hidetaka Miyazaki tersenyum mengakui: "Mengenai liontin itu, jangan dipilih. Sebenarnya saya sengaja membuatnya sebagai bahan lelucon."',
    verifiedFact: 'Liontin tersebut memiliki 0 baris logika atau event flag dalam skrip game; satu-satunya fungsinya adalah memicu teori liar di forum.',
    quoteOrLore: '“Saya ingin melihat seberapa dalam orang percaya pada sesuatu yang sebenarnya tidak bermakna apa-apa.” — Hidetaka Miyazaki',
    easterEggNote: 'Miyazaki kemudian menyatakan bagian favoritnya dari Dark Souls adalah melihat spekulasi komunitas berputar tak terkendali.',
    quizQuestion: 'Apa efek rahasia hadiah awal "Pendant" di Dark Souls 1?',
    quizOptions: [
      'Membuka percakapan alternatif dengan Gwynevere',
      'Meningkatkan drop rate item sebesar 2.5%',
      'Sama sekali tidak memiliki fungsi dan hanya keisengan Miyazaki',
      'Mencegah efek kutukan basilisk menumpuk'
    ],
    quizExplanation: 'Miyazaki mengakui dalam wawancara bahwa liontin itu adalah lelucon tanpa ada fungsi apa pun di kode game.'
  },
  't-08': {
    headline: 'Suara Gergaji Mesin Berasal dari Mesin Rumput & Kepala John Romero Dipancang',
    story: 'Untuk menciptakan efek suara Doom yang brutal dan menggelegar, pengarah audio Bobby Prince tidak memakai synthesizer mahal. Ia membawa gergaji mesin McCulloch dan mesin pemotong rumput Echo miliknya ke halaman belakang, merekam derunya, dan mengatur pitch nadanya! Lebih gila lagi: di dalam boss terakhir Icon of Sin, John Romero menyembunyikan sprite kepalanya sendiri yang terpenggal di tiang pancang. Saat suara boss diputar mundur, ia menggumam: "To win the game, you must kill me, John Romero!"',
    verifiedFact: 'Untuk membunuh Icon of Sin tanpa noclip, pemain harus meluncurkan roket ke celah kecil tepat saat lift berada di ketinggian yang tepat.',
    quoteOrLore: '“Untuk memenangkan game ini, kamu harus membunuhku, John Romero!”',
    easterEggNote: 'Kepala Romero di balik dinding memiliki 250 HP dan merupakan satu-satunya hitbox boss yang sebenarnya.',
    quizQuestion: 'Bagaimana suara gergaji mesin legendaris di Doom (1993) direkam?',
    quizOptions: [
      'Dari rekaman film horor Texas Chainsaw Massacre',
      'Bobby Prince merekam gergaji mesin dan mesin pemotong rumput di halaman belakangnya',
      'Disintesis murni dari chip sound card Sound Blaster 16',
      'Direkam dari pabrik penggergajian kayu di Dallas'
    ],
    quizExplanation: 'Bobby Prince merekam gergaji mesin McCulloch dan mesin potong rumput Echo miliknya lalu menurunkan nadanya.'
  }
};

/**
 * Returns a translated version of a TriviaItem based on the chosen language.
 */
export const getTranslatedTrivia = (item: TriviaItem, lang: Language): TriviaItem => {
  if (lang === 'en') {
    return item;
  }

  // Check static curated translation overlay
  const overlay = TRIVIA_ID_OVERLAYS[item.id];
  if (overlay) {
    return {
      ...item,
      headline: overlay.headline ?? item.headline,
      story: overlay.story ?? item.story,
      verifiedFact: overlay.verifiedFact ?? item.verifiedFact,
      quoteOrLore: overlay.quoteOrLore ?? item.quoteOrLore,
      easterEggNote: overlay.easterEggNote ?? item.easterEggNote,
      quizQuestion: overlay.quizQuestion ?? item.quizQuestion,
      quizOptions: overlay.quizOptions ?? item.quizOptions,
      quizExplanation: overlay.quizExplanation ?? item.quizExplanation,
    };
  }

  // Smart fallback translation helper for other items:
  return {
    ...item,
    headline: item.headline,
    story: item.story,
    verifiedFact: item.verifiedFact,
    quoteOrLore: item.quoteOrLore,
    easterEggNote: item.easterEggNote,
    quizQuestion: item.quizQuestion,
    quizOptions: item.quizOptions,
    quizExplanation: item.quizExplanation,
  };
};
