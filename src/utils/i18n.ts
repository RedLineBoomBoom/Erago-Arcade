import { useState, useEffect } from 'react';
import type { TriviaItem, GameEra, TriviaTag } from '../types/trivia';
import { sound } from '../audio/soundEngine';
import { ALL_TRIVIA_ID_OVERLAYS, type TriviaTranslationItem } from '../data/translations';

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
  'tab_home': {
    id: 'MENU',
    en: 'MENU',
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
  'menu_home_badge': {
    id: 'SISTEM SIAP // SILAKAN PILIH MODE',
    en: 'SYSTEM READY // SELECT GAME MODE',
  },
  'menu_home_title': {
    id: 'MENU UTAMA ERAGO ARCADE',
    en: 'ERAGO ARCADE MAIN MENU',
  },
  'menu_home_subtitle': {
    id: 'Semua fitur & section arcade siap dimainkan. Pilih mode dengan tombol panah [↑/↓] atau klik mouse.',
    en: 'All arcade sections & features ready to play. Select a mode with [↑/↓] arrow keys or mouse click.',
  },
  'menu_preview_badge': {
    id: 'PRATINJAU MODE // MONITOR HUD',
    en: 'MODE PREVIEW // HUD MONITOR',
  },
  'menu_insert_coin_blink': {
    id: 'TEKAN MULAI ATAU ENTER',
    en: 'PRESS START OR ENTER',
  },
  'menu_launch_mode': {
    id: 'MULAI PETUALANGAN',
    en: 'LAUNCH MISSION',
  },
  'menu_back_to_menu': {
    id: 'MENU UTAMA',
    en: 'MAIN MENU',
  },
  'menu_hotkey_guide': {
    id: '[↑/↓] NAVIGASI • [ENTER] PILIH • [ESC] MENU • [C] CRT SCANLINES • [M] MUTE AUDIO',
    en: '[↑/↓] NAVIGATE • [ENTER] SELECT • [ESC] MENU • [C] CRT SCANLINES • [M] MUTE AUDIO',
  },
  'menu_category_core': {
    id: 'MODE UTAMA // CORE STAGES',
    en: 'CORE MODES // MAIN STAGES',
  },
  'menu_category_special': {
    id: 'BONUS & FITUR SPESIAL // CABINET TOYS',
    en: 'BONUS & SPECIAL FEATURES // CABINET TOYS',
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
  'hub_sales': {
    id: 'DISKON STEAM',
    en: 'STEAM SALES',
  },
  'hub_sales_desc': {
    id: 'Diskon Real-Time & SteamDB',
    en: 'Live Deals & SteamDB',
  },
  'tab_sales': {
    id: 'DISKON',
    en: 'SALES',
  },
  'hub_reboot': {
    id: 'REBOOT KONSOL',
    en: 'REBOOT CONSOLE',
  },
  'hub_reboot_desc': {
    id: 'Mulai Ulang Boot Layar',
    en: 'Replay Boot Sequence',
  },
  'boot_power_on': {
    id: 'NYALAKAN KONSOL',
    en: 'POWER ON CONSOLE',
  },
  'boot_click_to_start': {
    id: 'KLIK / TEKAN UNTUK MENGAKTIFKAN AUDIO & BOOT',
    en: 'CLICK / PRESS ANY KEY TO INITIALIZE AUDIO & BOOT',
  },
  'boot_skip': {
    id: 'LEWATI [ESC]',
    en: 'SKIP [ESC]',
  },
  'boot_fast_forward': {
    id: 'PERCEPAT 2X',
    en: 'FAST FORWARD 2X',
  },
  'boot_click_sound': {
    id: 'KLIK DI MANA SAJA UNTUK MENGAKTIFKAN SUARA',
    en: 'CLICK ANYWHERE TO UNMUTE AUDIO',
  },
  'boot_insert_coin': {
    id: 'WELCOME / TEKAN TOMBOL APA SAJA UNTUK MASUK',
    en: 'WELCOME / PRESS ANY KEY TO ENTER',
  },
  'boot_welcome': {
    id: 'WELCOME / TEKAN TOMBOL APA SAJA UNTUK MASUK',
    en: 'WELCOME / PRESS ANY KEY TO ENTER',
  },
  'boot_system_ready': {
    id: 'SISTEM SIAP // MEMULAI...',
    en: 'SYSTEM READY // LAUNCHING...',
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
  'news_reader_back': {
    id: 'KEMBALI KE FEED',
    en: 'BACK TO FEED',
  },
  'news_reader_summary_title': {
    id: 'RANGKUMAN ISI ARTIKEL',
    en: 'ARTICLE CONTENT SUMMARY',
  },
  'news_reader_briefing_badge': {
    id: 'RINGKASAN RESMI',
    en: 'OFFICIAL SUMMARY',
  },
  'news_reader_lead_quote': {
    id: 'KUTIPAN REDAKSI',
    en: 'EDITORIAL LEAD',
  },
  'news_reader_overview_title': {
    id: 'INTISARI LAPORAN',
    en: 'STORY OVERVIEW',
  },
  'news_reader_takeaways_title': {
    id: 'POIN UTAMA LIPUTAN',
    en: 'KEY TAKEAWAYS',
  },
  'news_reader_topic_label': {
    id: 'Topik Utama',
    en: 'Core Topic',
  },
  'news_reader_publisher_label': {
    id: 'Penerbit Resmi',
    en: 'Official Publisher',
  },
  'news_reader_category_label': {
    id: 'Kategori & Tag',
    en: 'Category & Tags',
  },
  'news_reader_full_article_cta': {
    id: 'BACA FULL ARTIKEL DI {outlet}',
    en: 'READ FULL ARTICLE ON {outlet}',
  },
  'news_reader_full_article_desc': {
    id: 'Ingin membaca ulasan lengkap, wawancara mendalam, dan galeri visual resolusi tinggi? Buka liputan penuh langsung di situs resmi {outlet}.',
    en: 'Want to read the complete review, in-depth interviews, and high-res galleries? Open full coverage directly on the official {outlet} website.',
  },
  'news_reader_full_btn': {
    id: 'BUKA ARTIKEL ASLI DI {outlet} ↗',
    en: 'OPEN ORIGINAL ARTICLE ON {outlet} ↗',
  },
  'news_reader_external_hint': {
    id: 'Membuka langsung website resmi {outlet} di tab baru',
    en: 'Directly opens official {outlet} website in a new tab',
  },
  'news_reader_author_by': {
    id: 'Ditulis oleh',
    en: 'Written by',
  },
  'news_reader_open_original': {
    id: 'Buka Artikel di {outlet}',
    en: 'Open Article at {outlet}',
  },
  'news_reader_search_google': {
    id: 'Cari di Google',
    en: 'Search on Google',
  },
  'news_reader_copy_link': {
    id: 'Salin Tautan',
    en: 'Copy Link',
  },
  'news_reader_link_copied': {
    id: 'Tautan Berhasil Disalin!',
    en: 'Link Copied!',
  },
  'news_reader_original_source_note': {
    id: 'Artikel ini diterbitkan secara resmi oleh {outlet}. Hak cipta dan materi orisinal milik penerbit terkait.',
    en: 'This article was officially published by {outlet}. All copyrights and original materials belong to their respective publisher.',
  },
  'news_live_status': {
    id: 'LIVE RSS AKTIF',
    en: 'LIVE RSS ACTIVE',
  },
  'news_last_updated': {
    id: 'Diperbarui: {time}',
    en: 'Updated: {time}',
  },
  'news_refresh_success': {
    id: 'Berhasil memperbarui artikel live dari 12 website gaming!',
    en: 'Successfully refreshed live articles from 12 gaming websites!',
  },
  'news_refreshing': {
    id: 'Mengambil artikel terbaru dari 12 website...',
    en: 'Fetching latest articles from 12 websites...',
  },

  // Cryptographic Vault Security Ledger & Anti-Tamper
  'vault_security_title': {
    id: 'AUDIT KEAMANAN BRANKAS KRIPTOGRAFIS',
    en: 'CRYPTOGRAPHIC VAULT SECURITY AUDIT',
  },
  'vault_security_badge': {
    id: 'BRANKAS TERENKRIPSI // HMAC-SHA256 & DEVICE LOCK',
    en: 'ENCRYPTED VAULT // HMAC-SHA256 & DEVICE LOCK',
  },
  'vault_status_secured': {
    id: 'TERVERIFIKASI & AMAN',
    en: 'VERIFIED & SECURED',
  },
  'vault_status_tampered': {
    id: 'PERINGATAN: MANIPULASI TERDETEKSI',
    en: 'WARNING: TAMPERING DETECTED',
  },
  'vault_device_id_label': {
    id: 'ID PERANGKAT UNIK',
    en: 'UNIQUE DEVICE ID',
  },
  'vault_anti_tamper_desc': {
    id: 'Koin dilindungi segel digital HMAC-SHA256 & limit kecepatan (maks 50.000 koin/<1 jam). Lonjakan koin instan abnormal akan otomatis dikarantina ke 2.000 koin aman.',
    en: 'Coins are secured with HMAC-SHA256 digital seals & velocity guards (max 50,000 coins/<1 hr). Abnormal instant balance spikes are automatically quarantined to 2,000 baseline coins.',
  },
  'tamper_alert_title': {
    id: '⚠️ DETEKSI MANIPULASI BRANKAS',
    en: '⚠️ VAULT TAMPERING DETECTED',
  },
  'tamper_alert_desc': {
    id: 'Perubahan saldo tidak sah atau lonjakan koin instan > 50.000 koin dalam kurun waktu kurang dari 1 jam terdeteksi! Saldo koin telah dikembalikan ke 2.000 koin.',
    en: 'Unauthorized balance alteration or instant spike > 50,000 coins in under 1 hour detected! Coin balance has been restored to 2,000 coins.',
  },
  'tamper_alert_dismiss': {
    id: 'MENGERTI',
    en: 'ACKNOWLEDGE',
  },

  // Steam Sales & SteamDB Integration Modal
  'sales_modal_title': {
    id: 'RADAR DISKON STEAM // STEAMDB SALES',
    en: 'LIVE STEAM DISCOUNTS // STEAMDB TRACKER',
  },
  'sales_modal_subtitle': {
    id: 'Diskon game Steam real-time terhubung langsung ke basis data SteamDB & toko resmi Steam.',
    en: 'Real-time Steam game discounts synced directly with SteamDB database and official Steam store.',
  },
  'sales_live_badge': {
    id: 'RADAR AKTIF',
    en: 'LIVE SYNC',
  },
  'sales_search_placeholder': {
    id: 'Cari game diskon di Steam...',
    en: 'Search discounted Steam games...',
  },
  'sales_tier_all': {
    id: 'Semua Diskon',
    en: 'All Deals',
  },
  'sales_tier_75plus': {
    id: 'Diskon 75%+',
    en: '75%+ OFF',
  },
  'sales_tier_50plus': {
    id: 'Diskon 50% - 74%',
    en: '50% - 74% OFF',
  },
  'sales_tier_under5': {
    id: '< $5 (Rp 80rb)',
    en: 'Under $5',
  },
  'sales_tier_under10': {
    id: '$5 - $10 (Rp 80rb - 160rb)',
    en: '$5 - $10',
  },
  'sales_tier_top_rated': {
    id: 'Rating 90%+',
    en: 'Top Rated 90%+',
  },
  'sales_sort_discount': {
    id: 'Diskon Tertinggi',
    en: 'Highest Discount',
  },
  'sales_sort_rating': {
    id: 'Rating Steam',
    en: 'Steam Rating',
  },
  'sales_sort_price_asc': {
    id: 'Harga Termurah',
    en: 'Lowest Price',
  },
  'sales_sort_deal': {
    id: 'Skor Value',
    en: 'Deal Rating',
  },
  'sales_sort_title': {
    id: 'Judul A-Z',
    en: 'Title A-Z',
  },
  'sales_store_btn': {
    id: 'STORE STEAM',
    en: 'STEAM STORE',
  },
  'sales_steamdb_btn': {
    id: 'STEAMDB INFO',
    en: 'STEAMDB INFO',
  },
  'sales_browse_steamdb_hub': {
    id: 'BUKA STEAMDB SALES RESMI (STEAMDB.INFO/SALES)',
    en: 'OPEN OFFICIAL STEAMDB SALES (STEAMDB.INFO/SALES)',
  },
  'sales_refresh_btn': {
    id: 'SEGARKAN',
    en: 'REFRESH',
  },
  'sales_refresh_success': {
    id: 'Data diskon Steam & SteamDB berhasil diperbarui!',
    en: 'Steam & SteamDB sales updated successfully!',
  },
  'sales_deals_found': {
    id: '{count} game diskon ditemukan',
    en: '{count} discounted games found',
  },
  'sales_currency_label': {
    id: 'KURS:',
    en: 'CURRENCY:',
  },
  'sales_approx_idr': {
    id: 'Perkiraan Rp 16.300 / USD',
    en: 'Est. Rp 16,300 / USD',
  },
  'sales_empty_title': {
    id: 'TIDAK ADA DISKON YANG COCOK',
    en: 'NO MATCHING DEALS FOUND',
  },
  'sales_empty_desc': {
    id: 'Coba ubah kata kunci pencarian atau sesuaikan pilihan filter diskon Anda.',
    en: 'Try modifying your search keywords or adjusting your discount filter settings.',
  },
  'sales_empty_reset': {
    id: 'RESET FILTER',
    en: 'RESET FILTERS',
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

export const TRIVIA_ID_OVERLAYS: Record<string, TriviaTranslationItem> = ALL_TRIVIA_ID_OVERLAYS;

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
