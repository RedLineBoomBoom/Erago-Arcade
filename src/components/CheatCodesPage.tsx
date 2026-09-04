import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Terminal, 
  Flame, 
  Zap, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  PlusCircle,
  Download,
  LayoutGrid,
  List,
  BookOpen,
  Trash2
} from 'lucide-react';
import type { CheatCodeItem, CheatPlatform, CheatCategory } from '../types/cheats';
import { CHEAT_CODES_DATABASE, CHEAT_PLATFORMS, CHEAT_CATEGORIES, FRANCHISE_FILTERS } from '../data/cheatsData';
import { sound } from '../audio/soundEngine';
import { unlockAchievement } from '../utils/achievements';

export const CheatCodesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<CheatPlatform>('All');
  const [selectedCategory, setSelectedCategory] = useState<CheatCategory>('All');
  const [selectedFranchise, setSelectedFranchise] = useState<string>('All');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');
  const [displayMode, setDisplayMode] = useState<'cards' | 'table'>('cards');
  
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activatedCheat, setActivatedCheat] = useState<CheatCodeItem | null>(null);
  const [inputBuffer, setInputBuffer] = useState<string[]>([]);
  const clearTimerRef = useRef<number | null>(null);

  // Custom User Cheats persisted in LocalStorage
  const [customCheats, setCustomCheats] = useState<CheatCodeItem[]>(() => {
    try {
      const saved = localStorage.getItem('erago_custom_cheats') || localStorage.getItem('yestalgia_custom_cheats');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });


  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newCheatName, setNewCheatName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newPlatform, setNewPlatform] = useState<CheatCodeItem['platform']>('PC / MS-DOS');
  const [newCategory, setNewCategory] = useState<CheatCodeItem['category']>('Invincibility');
  const [newEffect, setNewEffect] = useState('');
  const [newInstructions, setNewInstructions] = useState('');
  const [newDevLore, setNewDevLore] = useState('');

  // Combined Library (Official + Custom)
  const fullLibrary = useMemo(() => {
    return [...customCheats, ...CHEAT_CODES_DATABASE];
  }, [customCheats]);

  const triggerActivation = useCallback((cheat: CheatCodeItem) => {
    sound.playJackpot();
    setActivatedCheat(cheat);

    confetti({
      particleCount: 70,
      spread: 85,
      origin: { y: 0.5 },
      colors: ['#FF2A85', '#FFE600', '#00F5D4', '#9D4EDD', '#FFFFFF'],
    });

    setTimeout(() => {
      setActivatedCheat((prev) => (prev?.id === cheat.id ? null : prev));
    }, 4500);
  }, []);

  const handlePushToken = useCallback((token: string) => {
    setInputBuffer((prevBuffer) => {
      const newBuffer = [...prevBuffer, token].slice(-14);

      if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
      clearTimerRef.current = window.setTimeout(() => {
        setInputBuffer([]);
      }, 4000);

      const bufferJoined = newBuffer.join(' ');
      const konamiSequence = ['UP', 'UP', 'DOWN', 'DOWN', 'LEFT', 'RIGHT', 'LEFT', 'RIGHT', 'B', 'A'];
      if (bufferJoined.endsWith(konamiSequence.join(' '))) {
        triggerActivation(CHEAT_CODES_DATABASE[0]);
        unlockAchievement('KONAMI_CODE');
        return [];
      }

      // Helldivers 2 500KG Bomb: UP RIGHT DOWN DOWN DOWN
      const helldiversSequence = ['UP', 'RIGHT', 'DOWN', 'DOWN', 'DOWN'];
      if (bufferJoined.endsWith(helldiversSequence.join(' '))) {
        const hd2 = CHEAT_CODES_DATABASE.find((c) => c.id === 'c-62');
        if (hd2) triggerActivation(hd2);
        return [];
      }

      // Check gamepad sequence cheats with at least 4 tokens
      const matchedGamepad = fullLibrary.find((c) => {
        if (c.inputType === 'Gamepad Sequence' && c.inputTokens && c.inputTokens.length >= 4) {
          const seq = c.inputTokens.join(' ');
          return bufferJoined.endsWith(seq);
        }
        return false;
      });

      if (matchedGamepad) {
        triggerActivation(matchedGamepad);
        return [];
      }

      // Check typed word codes (HESOYAM, IDDQD, IDKFA, ABACABB, etc.)
      const letterBuffer = newBuffer.filter((t) => t.length === 1).join('').toUpperCase();
      if (letterBuffer.length >= 4) {
        const matched = fullLibrary.find((c) => {
          if (c.inputType === 'Keyboard Phrase' || c.inputType === 'Developer Console') {
            const cleanCode = c.code.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
            return cleanCode.length >= 4 && letterBuffer.endsWith(cleanCode);
          }

          return false;
        });

        if (matched) {
          triggerActivation(matched);
          return [];
        }
      }

      return newBuffer;
    });
  }, [triggerActivation, fullLibrary]);


  // Global key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      let keyToken: string | null = null;
      if (e.key === 'ArrowUp') keyToken = 'UP';
      else if (e.key === 'ArrowDown') keyToken = 'DOWN';
      else if (e.key === 'ArrowLeft') keyToken = 'LEFT';
      else if (e.key === 'ArrowRight') keyToken = 'RIGHT';
      else if (e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) keyToken = e.key.toUpperCase();

      if (keyToken) {
        sound.playClick();
        handlePushToken(keyToken);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePushToken]);

  const handleCopyCode = async (cheat: CheatCodeItem) => {
    sound.playCoin();
    try {
      await navigator.clipboard.writeText(cheat.code);
      unlockAchievement('CHEAT_COLLECTOR');
      setCopiedId(cheat.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };


  const handleAddCustomCheat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameTitle || !newCode) return;

    sound.playJackpot();
    const newEntry: CheatCodeItem = {
      id: `custom-${Date.now()}`,
      gameTitle: newGameTitle,
      releaseYear: new Date().getFullYear(),
      platform: newPlatform,
      category: newCategory,
      cheatName: newCheatName || 'Custom Vault Code',
      code: newCode,
      inputType: 'Keyboard Phrase',
      effect: newEffect || 'User-defined custom effect',
      instructions: newInstructions || 'Input during gameplay.',
      devLore: newDevLore || 'Custom community entry added to local vault.',
      badgeColor: '#00F5D4',
      isCustom: true,
    };

    const updated = [newEntry, ...customCheats];
    setCustomCheats(updated);
    try {
      localStorage.setItem('erago_custom_cheats', JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setIsAddModalOpen(false);
    setNewGameTitle('');
    setNewCheatName('');
    setNewCode('');
    setNewEffect('');
    setNewInstructions('');
    setNewDevLore('');
  };

  const handleDeleteCustomCheat = (id: string) => {
    sound.playClick();
    const updated = customCheats.filter((c) => c.id !== id);
    setCustomCheats(updated);
    try {
      localStorage.setItem('erago_custom_cheats', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };


  const alphabetList = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredCheats = useMemo(() => {
    return fullLibrary.filter((c) => {
      const matchesSearch =
        c.gameTitle.toLowerCase().includes(search.toLowerCase()) ||
        c.cheatName.toLowerCase().includes(search.toLowerCase()) ||
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.effect.toLowerCase().includes(search.toLowerCase()) ||
        (c.franchise && c.franchise.toLowerCase().includes(search.toLowerCase()));

      const matchesPlatform = selectedPlatform === 'All' || c.platform === selectedPlatform;
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesFranchise = selectedFranchise === 'All' || c.franchise === selectedFranchise;
      
      const firstChar = c.gameTitle.trim().charAt(0).toUpperCase();
      const matchesLetter = selectedLetter === 'ALL' || firstChar === selectedLetter;

      return matchesSearch && matchesPlatform && matchesCategory && matchesFranchise && matchesLetter;
    });
  }, [fullLibrary, search, selectedPlatform, selectedCategory, selectedFranchise, selectedLetter]);

  // Download 90s ASCII Cheat Sheet File (.txt)
  const handleDownloadAsciiSheet = () => {
    sound.playCoin();
    const header = `
========================================================================
   ______ _____            _____  ____       _    ____   ____    _    ____  _____ 
  |  ____|  __ \\   /\\     / ____|/ __ \\     / \\  |  _ \\ / ___|  / \\  |  _ \\|  ___|
  | |__  | |__) | /  \\   | |  __| |  | |   / _ \\ | |_) | |     / _ \\ | | | | |__  
  |  __| |  _  / / /\\ \\  | | |_ | |  | |  / ___ \\|  _ <| |    / ___ \\| |_| |  __| 
  | |____| | \\ \\/ ____ \\ | |__| | |__| | / ___ \\ \\ | \\ \\ |___/_/   \\_\\____/| |____
  |______|_|  \\_/_/    \\_\\\\_____|\\____/ /_/   \\_\\_\\ |_\\_\\\\____|            |______|
========================================================================
                 ERAGO ARCADE // THE MASTER CHEAT VAULT
                      AUTHENTIC VIDEO GAME ARCHIVE
========================================================================
Total Loaded Codes: ${filteredCheats.length}
Generated on: ${new Date().toLocaleDateString()}
`;

    const body = filteredCheats
      .map((c, i) => {
        return `
[#${String(i + 1).padStart(3, '0')}] ${c.gameTitle.toUpperCase()} (${c.releaseYear}) [${c.platform}]
CHEAT NAME:   ${c.cheatName}
CATEGORY:     ${c.category}
CODE / COMBO: ${c.code}
EFFECT:       ${c.effect}
INSTRUCTIONS: ${c.instructions}
DEVELOPER LORE:
"${c.devLore}"
------------------------------------------------------------------------`;
      })
      .join('\n');

    const fullText = header + body;
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ERAGO_ARCADE_CHEATBOOK_${Math.floor(Date.now() / 1000)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };



  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      {/* Top Banner & Library Header */}
      <div className="border-b-3 border-black pb-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#FF2A85] px-2 py-0.5 font-['Press_Start_2P'] text-[9px] font-bold text-black uppercase">
                MASTER DIRECTORY
              </span>
              <span className="font-['Press_Start_2P'] text-[9px] text-[#FFE600]">
                // ENCYCLOPEDIC CHEAT VAULT ({fullLibrary.length} CODES)
              </span>
            </div>
            <h1 className="font-['Syne'] text-3xl sm:text-4xl md:text-5xl font-black text-white mt-1">
              THE COMPLETE CHEAT CODES LIBRARY
            </h1>
            <p className="font-['Space_Grotesk'] text-sm sm:text-base text-zinc-300 mt-1 max-w-2xl">
              From the first arcade secrets in 1980 to the newest 2024 releases. Search by franchise, console, letter, or submit your own custom codes!
            </p>
          </div>

          {/* Action Tools: Add Custom Code, Download ASCII CheatBook */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { sound.playClick(); setIsAddModalOpen(true); }}
              data-cursor="ADD"
              className="flex items-center gap-1.5 rounded-sm border-2 border-black bg-[#00F5D4] px-3.5 py-2 font-['Press_Start_2P'] text-[8px] text-black font-bold brutal-shadow-sm hover:bg-[#20f7dc] transition-transform hover:-translate-y-0.5"
            >
              <PlusCircle className="h-3.5 w-3.5 text-black" />
              <span>SUBMIT CHEAT</span>
            </button>

            <button
              onClick={handleDownloadAsciiSheet}
              data-cursor="EXPORT"
              title="Download 90s ASCII GameFAQs Style Text Guide"
              className="flex items-center gap-1.5 rounded-sm border-2 border-black bg-[#FFE600] px-3.5 py-2 font-['Press_Start_2P'] text-[8px] text-black font-bold brutal-shadow-sm hover:bg-[#ffea33] transition-transform hover:-translate-y-0.5"
            >
              <Download className="h-3.5 w-3.5 text-black" />
              <span>EXPORT TXT</span>
            </button>
          </div>
        </div>

        {/* Interactive Virtual Gamepad & Live Input Simulator */}
        <div className="rounded-md border-3 border-black bg-[#14161F] p-4 sm:p-5 brutal-shadow space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-black/40 pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#00F5D4]" />
              <span className="font-['Press_Start_2P'] text-[9px] text-[#00F5D4]">
                INTERACTIVE CONTROLLER // TEST CHEATS LIVE
              </span>
            </div>
            <span className="font-['Space_Grotesk'] text-xs text-zinc-400">
              Press buttons below or type arrow keys on your keyboard
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            {/* Virtual D-Pad */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { sound.playClick(); handlePushToken('UP'); }}
                data-cursor="UP"
                className="flex h-9 w-9 items-center justify-center rounded-xs border-2 border-black bg-black text-zinc-200 font-bold hover:bg-[#FFE600] hover:text-black brutal-shadow-sm transition-transform active:translate-y-0.5"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => { sound.playClick(); handlePushToken('DOWN'); }}
                data-cursor="DOWN"
                className="flex h-9 w-9 items-center justify-center rounded-xs border-2 border-black bg-black text-zinc-200 font-bold hover:bg-[#FFE600] hover:text-black brutal-shadow-sm transition-transform active:translate-y-0.5"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                onClick={() => { sound.playClick(); handlePushToken('LEFT'); }}
                data-cursor="LEFT"
                className="flex h-9 w-9 items-center justify-center rounded-xs border-2 border-black bg-black text-zinc-200 font-bold hover:bg-[#FFE600] hover:text-black brutal-shadow-sm transition-transform active:translate-y-0.5"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => { sound.playClick(); handlePushToken('RIGHT'); }}
                data-cursor="RIGHT"
                className="flex h-9 w-9 items-center justify-center rounded-xs border-2 border-black bg-black text-zinc-200 font-bold hover:bg-[#FFE600] hover:text-black brutal-shadow-sm transition-transform active:translate-y-0.5"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Virtual Action Buttons (B, A, Start) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { sound.playClick(); handlePushToken('B'); }}
                data-cursor="B"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-[#FF2A85] text-black font-['Press_Start_2P'] text-[10px] font-bold brutal-shadow-sm hover:scale-105 active:scale-95 transition-transform"
              >
                B
              </button>
              <button
                onClick={() => { sound.playClick(); handlePushToken('A'); }}
                data-cursor="A"
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-black bg-[#FF2A85] text-black font-['Press_Start_2P'] text-[10px] font-bold brutal-shadow-sm hover:scale-105 active:scale-95 transition-transform"
              >
                A
              </button>
              <button
                onClick={() => { sound.playClick(); handlePushToken('START'); }}
                data-cursor="START"
                className="rounded-xs border-2 border-black bg-[#FFE600] px-2.5 py-1.5 text-black font-['Press_Start_2P'] text-[8px] font-bold brutal-shadow-sm hover:bg-[#ffea33]"
              >
                START
              </button>
            </div>

            {/* Quick-test Presets */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-['Press_Start_2P'] text-[7px] text-zinc-400">PRESETS:</span>
              <button
                onClick={() => triggerActivation(CHEAT_CODES_DATABASE[0])}
                className="rounded-xs border border-black bg-white/5 px-2 py-1 font-['Press_Start_2P'] text-[7px] text-[#00F5D4] hover:bg-[#00F5D4] hover:text-black"
              >
                1986: KONAMI
              </button>
              <button
                onClick={() => triggerActivation(CHEAT_CODES_DATABASE[22])}
                className="rounded-xs border border-black bg-white/5 px-2 py-1 font-['Press_Start_2P'] text-[7px] text-[#FF2A85] hover:bg-[#FF2A85] hover:text-black"
              >
                1993: DOOM
              </button>
              <button
                onClick={() => triggerActivation(CHEAT_CODES_DATABASE[15])}
                className="rounded-xs border border-black bg-white/5 px-2 py-1 font-['Press_Start_2P'] text-[7px] text-[#FFE600] hover:bg-[#FFE600] hover:text-black"
              >
                2004: HESOYAM
              </button>
              <button
                onClick={() => triggerActivation(CHEAT_CODES_DATABASE[61])}
                className="rounded-xs border border-black bg-white/5 px-2 py-1 font-['Press_Start_2P'] text-[7px] text-[#9D4EDD] hover:bg-[#9D4EDD] hover:text-white"
              >
                2024: 500KG
              </button>
            </div>
          </div>

          {/* Active input buffer display */}
          <div className="flex items-center gap-2 rounded-sm border border-black bg-black/60 px-3 py-1.5 font-mono text-xs">
            <span className="font-['Press_Start_2P'] text-[8px] text-zinc-500">BUFFER:</span>
            {inputBuffer.length > 0 ? (
              <span className="text-[#FFE600] font-bold tracking-widest">
                {inputBuffer.join(' - ')}
              </span>
            ) : (
              <span className="text-zinc-600 italic">Press buttons or keyboard keys to test sequences...</span>
            )}
          </div>
        </div>

        {/* Cheat Activated Banner */}
        {activatedCheat && (
          <div className="flex items-center justify-between rounded-md border-3 border-black bg-[#FFE600] p-4 text-black brutal-shadow animate-bounce">
            <div className="flex items-center gap-3">
              <Flame className="h-6 w-6 text-[#FF2A85] animate-pulse" />
              <div>
                <span className="font-['Press_Start_2P'] text-[9px] font-bold">
                  CHEAT ACTIVATED! // {activatedCheat.gameTitle}
                </span>
                <p className="font-['Space_Grotesk'] text-sm font-semibold">
                  "{activatedCheat.cheatName}" — {activatedCheat.effect}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActivatedCheat(null)}
              className="rounded-xs border-2 border-black bg-black px-2 py-1 font-['Press_Start_2P'] text-[8px] text-white"
            >
              DISMISS
            </button>
          </div>
        )}

        {/* Search & View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search game, code, franchise..."
              className="w-full rounded-sm border-2 border-black bg-[#14161F] pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-[#00F5D4] focus:outline-hidden brutal-shadow-sm font-['Space_Grotesk']"
            />
          </div>

          {/* View Mode Toggle: Cards vs Table */}
          <div className="flex items-center gap-1 rounded-sm border-2 border-black bg-[#14161F] p-1 brutal-shadow-sm">
            <button
              onClick={() => { sound.playClick(); setDisplayMode('cards'); }}
              data-cursor="CARDS"
              className={`flex items-center gap-1.5 rounded-xs px-3 py-1 font-['Press_Start_2P'] text-[8px] transition-all ${
                displayMode === 'cards'
                  ? 'bg-[#00F5D4] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3 w-3" />
              <span>CARDS</span>
            </button>
            <button
              onClick={() => { sound.playClick(); setDisplayMode('table'); }}
              data-cursor="TABLE"
              className={`flex items-center gap-1.5 rounded-xs px-3 py-1 font-['Press_Start_2P'] text-[8px] transition-all ${
                displayMode === 'table'
                  ? 'bg-[#FFE600] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <List className="h-3 w-3" />
              <span>TABLE</span>
            </button>
          </div>
        </div>

        {/* Alphabetical A-Z Directory Bar */}
        <div className="flex flex-wrap items-center gap-1 overflow-x-auto py-1 border-y border-black/40">
          <span className="font-['Press_Start_2P'] text-[7px] text-zinc-500 mr-1 shrink-0">A-Z:</span>
          {alphabetList.map((letter) => (
            <button
              key={letter}
              onClick={() => { sound.playClick(); setSelectedLetter(letter); }}
              className={`rounded-xs px-2 py-0.5 font-['Press_Start_2P'] text-[7px] transition-colors shrink-0 ${
                selectedLetter === letter
                  ? 'bg-[#FF2A85] text-black font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Franchise Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="font-['Press_Start_2P'] text-[8px] text-[#FFE600] mr-2 flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> FRANCHISE:
          </span>
          {FRANCHISE_FILTERS.map((franchise) => (
            <button
              key={franchise}
              onClick={() => { sound.playClick(); setSelectedFranchise(franchise); }}
              className={`rounded-xs border border-black px-2 py-0.5 font-['Space_Grotesk'] text-xs font-semibold transition-all ${
                selectedFranchise === franchise
                  ? 'bg-[#FFE600] text-black border-2 brutal-shadow-sm'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {franchise}
            </button>
          ))}
        </div>

        {/* Platform & Category Pills */}
        <div className="space-y-2 pt-1">
          {/* Console Platforms */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-['Press_Start_2P'] text-[8px] text-[#00F5D4] mr-2">CONSOLE:</span>
            {CHEAT_PLATFORMS.map((plat) => (
              <button
                key={plat.id}
                onClick={() => { sound.playClick(); setSelectedPlatform(plat.id); }}
                className={`rounded-xs border-2 border-black px-2 py-0.5 font-['Press_Start_2P'] text-[7px] transition-all ${
                  selectedPlatform === plat.id
                    ? 'bg-[#00F5D4] text-black font-bold brutal-shadow-sm'
                    : 'bg-[#14161F] text-zinc-400 hover:text-white'
                }`}
              >
                {plat.label}
              </button>
            ))}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-['Press_Start_2P'] text-[8px] text-[#FF2A85] mr-2">EFFECT:</span>
            {CHEAT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { sound.playClick(); setSelectedCategory(cat.id); }}
                className={`rounded-xs border border-black px-2 py-0.5 font-['Space_Grotesk'] text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#FF2A85] text-black border-2 brutal-shadow-sm'
                    : 'bg-white/5 text-zinc-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: RICH RETRO CARDS */}
      {displayMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCheats.map((cheat) => (
            <div
              key={cheat.id}
              data-cursor="CHEAT"
              className="group relative rounded-md border-3 border-black bg-[#14161F] p-5 sm:p-6 brutal-shadow hover:-translate-y-1 hover:border-[#FFE600] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between border-b-2 border-black/40 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#FFE600] px-2 py-0.5 font-['Press_Start_2P'] text-[8px] font-bold text-black">
                      {cheat.gameTitle} ({cheat.releaseYear})
                    </span>
                    {cheat.isCustom && (
                      <span className="rounded bg-[#00F5D4] px-1.5 py-0.5 font-['Press_Start_2P'] text-[7px] text-black font-bold">
                        CUSTOM
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Press_Start_2P'] text-[7px] text-zinc-400">
                      {cheat.platform}
                    </span>
                    {cheat.isCustom && (
                      <button
                        onClick={() => handleDeleteCustomCheat(cheat.id)}
                        title="Delete Custom Code"
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h2 className="font-['Syne'] text-xl sm:text-2xl font-black text-white group-hover:text-[#00F5D4] transition-colors leading-tight">
                  {cheat.cheatName}
                </h2>

                <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                  {cheat.effect}
                </p>

                {/* Bold Code Box */}
                <div className="relative my-4 rounded-sm border-2 border-black bg-black p-3.5 brutal-shadow-sm flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    <Zap className="h-4 w-4 text-[#FFE600] shrink-0" />
                    <code className="font-['Press_Start_2P'] text-xs sm:text-sm font-bold text-[#00F5D4] tracking-wider whitespace-nowrap selection:bg-[#FF2A85] selection:text-black">
                      {cheat.code}
                    </code>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopyCode(cheat)}
                      title="Copy Cheat Code"
                      data-cursor="COPY"
                      className="flex h-8 w-8 items-center justify-center rounded-xs border border-black bg-[#1E2230] hover:bg-[#FFE600] hover:text-black text-zinc-300 transition-colors"
                    >
                      {copiedId === cheat.id ? (
                        <Check className="h-4 w-4 text-[#00F5D4]" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>

                    <button
                      onClick={() => triggerActivation(cheat)}
                      title="Simulate Cheat Activation"
                      data-cursor="ACTIVATE"
                      className="flex items-center gap-1 rounded-xs border-2 border-black bg-[#FF2A85] px-2.5 py-1 font-['Press_Start_2P'] text-[7px] text-black font-bold hover:bg-[#ff4396] active:translate-y-0.5 transition-all"
                    >
                      <Sparkles className="h-3 w-3 text-black" />
                      <span>TEST</span>
                    </button>
                  </div>
                </div>

                <div className="rounded-xs bg-white/5 border border-white/10 p-2.5 text-xs text-zinc-400 font-['Space_Grotesk']">
                  <strong className="text-white">HOW TO INPUT:</strong> {cheat.instructions}
                </div>
              </div>

              <div className="border-t-2 border-black/40 pt-3 text-xs text-zinc-400 font-['Space_Grotesk'] leading-relaxed">
                <span className="font-['Press_Start_2P'] text-[7px] text-[#FFE600] block mb-1">
                  DEV LORE ORIGIN:
                </span>
                <p className="italic text-zinc-400">
                  "{cheat.devLore}"
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 2: RETRO GAMEFAQS DENSE TABLE */}
      {displayMode === 'table' && (
        <div className="overflow-x-auto rounded-md border-3 border-black bg-[#14161F] brutal-shadow">
          <table className="w-full text-left font-['Space_Grotesk'] text-sm">
            <thead className="border-b-2 border-black bg-black font-['Press_Start_2P'] text-[8px] text-[#00F5D4]">
              <tr>
                <th className="p-3">GAME TITLE</th>
                <th className="p-3">PLATFORM</th>
                <th className="p-3">CHEAT CODE</th>
                <th className="p-3">EFFECT</th>
                <th className="p-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/40">
              {filteredCheats.map((cheat) => (
                <tr key={cheat.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-semibold text-white">
                    {cheat.gameTitle} ({cheat.releaseYear})
                    {cheat.isCustom && <span className="ml-1 text-[#00F5D4] text-xs">*Custom</span>}
                  </td>
                  <td className="p-3 text-xs text-zinc-400 font-mono">{cheat.platform}</td>
                  <td className="p-3 font-['Press_Start_2P'] text-[9px] text-[#FFE600]">
                    {cheat.code}
                  </td>
                  <td className="p-3 text-xs text-zinc-300 max-w-md break-words leading-relaxed">{cheat.effect}</td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleCopyCode(cheat)}
                      className="rounded-xs border border-black bg-[#1E2230] hover:bg-[#00F5D4] hover:text-black px-2.5 py-1 font-['Press_Start_2P'] text-[7px] text-zinc-200 transition-colors"
                    >
                      {copiedId === cheat.id ? 'COPIED!' : 'COPY'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredCheats.length === 0 && (
        <div className="rounded-md border-2 border-dashed border-zinc-700 p-12 text-center space-y-3">
          <p className="font-['Press_Start_2P'] text-xs text-zinc-400">
            NO CHEAT CODES FOUND MATCHING YOUR CRITERIA.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-sm border-2 border-black bg-[#00F5D4] px-4 py-2 font-['Press_Start_2P'] text-[8px] text-black font-bold"
          >
            + ADD THIS GAME'S CHEAT TO VAULT
          </button>
        </div>
      )}

      {/* Modal: Add Custom Cheat Code for ANY Game */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-lg border-3 border-black bg-[#14161F] p-6 sm:p-8 brutal-shadow-lg space-y-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 rounded-xs border-2 border-black bg-[#FF2A85] px-2.5 py-1 font-['Press_Start_2P'] text-[9px] text-black font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <span className="rounded bg-[#00F5D4] px-2 py-0.5 font-['Press_Start_2P'] text-[8px] font-bold text-black">
                CUSTOM ENTRY
              </span>
              <span className="font-['Press_Start_2P'] text-[8px] text-[#FFE600]">
                ADD ANY GAME CHEAT
              </span>
            </div>

            <h2 className="font-['Syne'] text-2xl font-black text-white">
              SUBMIT CHEAT TO LOCAL VAULT
            </h2>

            <form onSubmit={handleAddCustomCheat} className="space-y-3 font-['Space_Grotesk'] text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Game Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kingdom Hearts II, Bloodborne, etc."
                  value={newGameTitle}
                  onChange={(e) => setNewGameTitle(e.target.value)}
                  className="w-full rounded-sm border-2 border-black bg-black p-2.5 text-white placeholder-zinc-600 focus:border-[#00F5D4] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Cheat Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Infinite MP, Max Gil"
                    value={newCheatName}
                    onChange={(e) => setNewCheatName(e.target.value)}
                    className="w-full rounded-sm border-2 border-black bg-black p-2.5 text-white placeholder-zinc-600 focus:border-[#00F5D4] focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Console Platform</label>
                  <select
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value as CheatCodeItem['platform'])}
                    className="w-full rounded-sm border-2 border-black bg-black p-2.5 text-white focus:border-[#00F5D4] focus:outline-hidden"
                  >
                    <option value="PlayStation / PS2">PlayStation / PS2</option>
                    <option value="PC / MS-DOS">PC / MS-DOS</option>
                    <option value="NES / SNES">NES / SNES</option>
                    <option value="Sega Genesis">Sega Genesis</option>
                    <option value="Nintendo 64">Nintendo 64</option>
                    <option value="Modern (2010s-2024)">Modern (2010s-2024)</option>
                    <option value="Multiplatform">Multiplatform</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1 font-semibold">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as CheatCodeItem['category'])}
                    className="w-full rounded-sm border-2 border-black bg-black p-2.5 text-white focus:border-[#00F5D4] focus:outline-hidden"
                  >
                    <option value="Invincibility">Invincibility</option>
                    <option value="Weapons & Ammo">Weapons & Ammo</option>
                    <option value="Vehicles & Spawns">Vehicles & Spawns</option>
                    <option value="Money & Economy">Money & Economy</option>
                    <option value="Level Skip & Warp">Level Skip & Warp</option>
                    <option value="Hilarious & Fun">Hilarious & Fun</option>
                  </select>
                </div>
              </div>


              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Code / Button Combo *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. L1, R2, X, Up, Down or sv_cheats 1"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full rounded-sm border-2 border-black bg-black p-2.5 text-white font-mono placeholder-zinc-600 focus:border-[#00F5D4] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Effect</label>
                <input
                  type="text"
                  placeholder="What happens when triggered?"
                  value={newEffect}
                  onChange={(e) => setNewEffect(e.target.value)}
                  className="w-full rounded-sm border-2 border-black bg-black p-2.5 text-white placeholder-zinc-600 focus:border-[#00F5D4] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-zinc-400 mb-1 font-semibold">Instructions / Dev Lore Note</label>
                <textarea
                  rows={2}
                  placeholder="Where to input code or historical context..."
                  value={newDevLore}
                  onChange={(e) => setNewDevLore(e.target.value)}
                  className="w-full rounded-sm border-2 border-black bg-black p-2.5 text-white placeholder-zinc-600 focus:border-[#00F5D4] focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-between border-t-2 border-black pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="font-['Press_Start_2P'] text-[8px] text-zinc-400 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="rounded-sm border-2 border-black bg-[#00F5D4] px-4 py-2 font-['Press_Start_2P'] text-[8px] text-black font-bold brutal-shadow-sm hover:bg-[#20f7dc]"
                >
                  SAVE TO VAULT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
