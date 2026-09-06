import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Sparkles } from 'lucide-react';
import { TRIVIA_DATABASE } from '../data/triviaData';

import { CHEAT_CODES_DATABASE } from '../data/cheatsData';
import { sound } from '../audio/soundEngine';
import { unlockAchievement } from '../utils/achievements';
import { getTranslatedTrivia, getLanguage } from '../utils/i18n';
import { MatrixRainCanvas } from './MatrixRainCanvas';

interface DosTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReboot?: () => void;
}

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const DosTerminalModal: React.FC<DosTerminalModalProps> = ({ isOpen, onClose, onReboot }) => {
  const [inputVal, setInputVal] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [isMatrixBgActive, setIsMatrixBgActive] = useState(false);
  const lang = getLanguage();
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'SYSTEM_BOOT',
      output: (
        <div className="text-emerald-400 space-y-1">
          <div>MS-DOS Version 6.22 (C) Copyright Microsoft Corp 1981-1994.</div>
          <div>ERAGO ARCADE OS v2.4 // 640K BASE MEMORY OK // EXTENDED MEMORY OK.</div>
          <div className="text-yellow-400 font-bold">Type 'HELP' for a list of available commands.</div>
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    sound.playClick();
    unlockAchievement('DOS_HACKER');

    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];
    const arg = parts.slice(1).join(' ');

    let output: React.ReactNode = '';

    switch (mainCmd) {
      case 'help':
      case '?':
        output = (
          <div className="space-y-0.5 text-zinc-300">
            <div>AVAILABLE COMMANDS:</div>
            <div>• <strong className="text-yellow-400">DIR</strong> : {lang === 'id' ? 'Tampilkan file direktori' : 'Display files in current directory'}</div>
            <div>• <strong className="text-yellow-400">TRIVIA</strong> : {lang === 'id' ? 'Ambil trivia game acak' : 'Fetch random gaming trivia snippet'}</div>
            <div>• <strong className="text-yellow-400">CHEAT [NAMA]</strong> : {lang === 'id' ? 'Cari pustaka cheat code' : 'Search cheat code library'}</div>
            <div>• <strong className="text-yellow-400">ART [MARIO|DOOM|PACMAN|ZELDA]</strong> : {lang === 'id' ? 'Tampilkan ASCII art' : 'Render ASCII art'}</div>
            <div>• <strong className="text-yellow-400">TYPE SECRET.TXT</strong> : {lang === 'id' ? 'Baca dokumen rahasia' : 'Read confidential lore'}</div>
            <div>• <strong className="text-yellow-400">MATRIX</strong> : {lang === 'id' ? 'Buka layar penuh efek digital rain Matrix hijau' : 'Trigger green digital rain stream screensaver'}</div>
            <div>• <strong className="text-yellow-400">MATRIX BG</strong> : {lang === 'id' ? 'Aktifkan/matikan Matrix di latar belakang terminal' : 'Toggle Matrix rain in terminal background'}</div>
            <div>• <strong className="text-yellow-400">REBOOT</strong> : {lang === 'id' ? 'Restart sistem operasi Erago Arcade' : 'Restart and trigger console boot sequence'}</div>
            <div>• <strong className="text-yellow-400">CLS</strong> : {lang === 'id' ? 'Bersihkan layar terminal' : 'Clear terminal screen'}</div>
            <div>• <strong className="text-yellow-400">EXIT</strong> : {lang === 'id' ? 'Tutup terminal MS-DOS' : 'Close command prompt'}</div>
          </div>
        );
        break;

      case 'dir':
        output = (
          <div className="text-emerald-300 font-mono space-y-0.5">
            <div> Volume in drive C is ERAGO_V1</div>
            <div> Volume Serial Number is 1994-0420</div>
            <div> Directory of C:\ERAGO</div>
            <div className="pt-1">.              &lt;DIR&gt;        09-03-96  12:00a</div>
            <div>..             &lt;DIR&gt;        09-03-96  12:00a</div>
            <div>TRIVIA   DAT         48,920 09-03-96   4:20p</div>
            <div>CHEATS   EXE        124,512 09-03-96   6:00p</div>
            <div>BONUS    BAT            512 09-03-96   8:15p</div>
            <div>SECRET   TXT            842 09-03-96  11:59p</div>
            <div className="pt-1 text-zinc-400">       4 File(s)        174,786 bytes free</div>
          </div>
        );
        break;

      case 'trivia': {
        const rawItem = TRIVIA_DATABASE[Math.floor(Math.random() * TRIVIA_DATABASE.length)];
        const item = getTranslatedTrivia(rawItem, getLanguage());
        output = (
          <div className="text-yellow-300 space-y-1 p-2 bg-black/40 border border-emerald-900 rounded">
            <div className="font-bold text-white">[{item.gameTitle} // {item.releaseYear}]</div>
            <div>{item.headline}</div>
            <div className="text-xs text-zinc-400">{item.story}</div>
          </div>
        );
        break;
      }


      case 'cheat': {
        if (!arg) {
          output = <div className="text-red-400">Usage: CHEAT &lt;game name or word&gt; (e.g. CHEAT DOOM)</div>;
        } else {
          const matched = CHEAT_CODES_DATABASE.filter(
            (c) =>
              c.gameTitle.toLowerCase().includes(arg) ||
              c.cheatName.toLowerCase().includes(arg) ||
              c.code.toLowerCase().includes(arg)
          );
          if (matched.length === 0) {
            output = <div className="text-red-400">No cheat codes found matching "{arg}".</div>;
          } else {
            output = (
              <div className="space-y-1 text-emerald-300">
                <div>FOUND {matched.length} CHEAT(S):</div>
                {matched.slice(0, 4).map((c) => (
                  <div key={c.id} className="p-1 border-l-2 border-yellow-400 pl-2">
                    <span className="text-yellow-400 font-bold">{c.gameTitle}:</span> {c.cheatName} ➔ <strong className="text-white">{c.code}</strong>
                  </div>
                ))}
              </div>
            );
          }
        }
        break;
      }

      case 'matrix':
        if (arg === 'bg' || arg === 'background') {
          setIsMatrixBgActive((prev) => !prev);
          output = (
            <div className="text-emerald-400 font-mono space-y-1 p-2 rounded border border-emerald-500/30 bg-black/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#00F5D4]" />
                <span className="font-bold">
                  [MATRIX BACKGROUND STREAM]: <span className="text-yellow-400">{!isMatrixBgActive ? 'AKTIF / ON' : 'NONAKTIF / OFF'}</span>
                </span>
              </div>
              <div className="text-[10px] text-zinc-400">
                {lang === 'id'
                  ? 'Efek aliran digital rain di latar belakang terminal berhasil diperbarui.'
                  : 'Terminal background digital rain stream has been toggled.'}
              </div>
            </div>
          );
        } else if (arg === 'off' || arg === 'stop') {
          setIsMatrixBgActive(false);
          setIsMatrixMode(false);
          output = <div className="text-zinc-400">[MATRIX STREAM STOPPED]</div>;
        } else {
          // Trigger the real Matrix Digital Rain!
          sound.playCrtBuzz();
          sound.playPowerUp();
          setIsMatrixMode(true);
          output = (
            <div className="space-y-1.5 p-2.5 rounded border border-emerald-500/40 bg-black/70 font-mono">
              <div className="flex items-center justify-between text-[#00F5D4] font-bold text-[11px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  [MATRIX DIGITAL RAIN PROTOCOL]
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    sound.playCrtBuzz();
                    setIsMatrixMode(true);
                  }}
                  className="px-2 py-0.5 rounded border border-emerald-400 bg-emerald-900/60 hover:bg-emerald-400 hover:text-black text-[9.5px] font-bold transition-all cursor-pointer shadow-[1px_1px_0px_#000]"
                >
                  ▶ {lang === 'id' ? 'BUKA LAGI EFEK MATRIX' : 'RE-LAUNCH MATRIX RAIN'}
                </button>
              </div>
              <div className="text-emerald-400 text-[11px] leading-tight">
                01000101 01010010 01000001 01000111 01001111 00100000 01000001 01010010 01000011 01000001 01000100 01000101<br />
                Wake up, Neo... The Erago Arcade matrix has you...<br />
                01100011 01101000 01100101 01100001 01110100 01110011 00100000 01101111 01101110 01101100 01111001
              </div>
              <div className="text-[10px] text-zinc-400">
                {lang === 'id'
                  ? 'Aliran kode digital Matrix layar penuh aktif. Tekan ESC atau klik di mana saja untuk kembali. Ketik MATRIX BG untuk hujan kode di background.'
                  : 'Full-screen Matrix digital rain active. Press ESC or click anywhere to return. Type MATRIX BG for background rain.'}
              </div>
            </div>
          );
        }
        break;

      case 'art':
        if (arg.includes('mario')) {
          output = (
            <pre className="text-red-400 text-[10px] leading-none select-none font-mono">
{`   ██████
  █████████
  ███  ██
 ███████████
 ████████████
  █████████
   ██   ██`}
            </pre>
          );
        } else if (arg.includes('pacman')) {
          output = (
            <pre className="text-yellow-400 text-[10px] leading-none select-none font-mono">
{`    ▄██████▄
  ▄██████████▄
 █████████▀▀  •   •   •
 █████████▄▄
  ▀██████████▀
    ▀██████▀`}
            </pre>
          );
        } else if (arg.includes('doom')) {
          output = (
            <pre className="text-orange-500 text-[9px] leading-tight select-none font-mono">
{`   [ DOOM SLAYER HELMET ]
    ▄▄▄███████▄▄▄
   ███████████████
  ███  ███████  ███
  ████ ▄▄▄▄▄▄▄ ████
  ███ █▀▀▀▀▀▀▀█ ███
   ███  ▀▀▀▀▀  ███
    ▀▀███████▀▀`}
            </pre>
          );
        } else if (arg.includes('zelda')) {
          output = (
            <pre className="text-yellow-300 text-[10px] leading-tight select-none font-mono">
{`        ▲
       ▲ ▲
    [ TRIFORCE ]
   IT'S DANGEROUS TO GO ALONE!
   TAKE THIS ➔ ⚔️`}
            </pre>
          );
        } else {
          output = (
            <div className="text-yellow-400 font-mono">
              Try: ART MARIO, ART PACMAN, ART DOOM, ART ZELDA
            </div>
          );
        }
        break;

      case 'type':
        if (arg.includes('secret')) {
          output = (
            <div className="text-cyan-300 p-2 border border-cyan-900 bg-black/60 space-y-1">
              <div>[CONFIDENTIAL MEMORANDUM // ERAGO ARCADE]</div>
              <div>Legend holds that entering the Konami Code on the title screen will grant you the highest clearance level.</div>
              <div>The vault continues to preserve gaming history for generations to come.</div>
            </div>
          );
        } else {
          output = <div className="text-red-400">File not found: {arg}</div>;
        }
        break;

      case 'reboot':
      case 'restart':
      case 'boot':
        output = (
          <div className="text-yellow-400 font-bold animate-pulse">
            REBOOTING ERAGO ARCADE SYSTEM OS...
          </div>
        );
        if (onReboot) {
          setTimeout(() => {
            onClose();
            onReboot();
          }, 350);
        }
        break;

      case 'cls':
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        sound.playError();
        output = <div className="text-red-400">Bad command or file name. Type 'HELP' for commands.</div>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-2xl rounded-xl border-4 border-black bg-[#070D09] shadow-[8px_8px_0px_#000] overflow-hidden flex flex-col h-[520px] font-mono">
        {/* DOS Window Title Bar */}
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#1A1C26] border-b-2 border-black text-white text-xs select-none">
          <div className="flex items-center gap-2 truncate">
            <TerminalIcon className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-bold truncate">MS-DOS Prompt - C:\ERAGO\COMMAND.COM</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Matrix Rain Launch Button */}
            <button
              onClick={() => {
                sound.playClick();
                sound.playCrtBuzz();
                setIsMatrixMode(true);
              }}
              title={lang === 'id' ? 'Buka Efek Matrix Digital Rain (Layar Penuh)' : 'Trigger Green Matrix Digital Rain Effect'}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500 hover:bg-emerald-400 hover:text-black text-emerald-300 font-mono text-[9px] font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-ping" />
              <span>MATRIX</span>
            </button>

            {/* Quick Matrix BG Rain Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setIsMatrixBgActive((prev) => !prev);
              }}
              title={lang === 'id' ? 'Toggle Hujan Matrix di Background Prompt' : 'Toggle Matrix Rain in Background'}
              className={`flex items-center gap-1 px-1.5 py-0.5 rounded border font-mono text-[9px] font-bold transition-all shadow-[1px_1px_0px_#000] cursor-pointer ${
                isMatrixBgActive
                  ? 'bg-emerald-400 text-black border-emerald-300'
                  : 'bg-[#141622] text-zinc-400 border-zinc-700 hover:text-white'
              }`}
            >
              <span>BG:{isMatrixBgActive ? 'ON' : 'OFF'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="flex h-5 w-5 items-center justify-center rounded bg-[#FF2A85] text-white hover:bg-white hover:text-black text-xs font-bold shadow-[1px_1px_0px_#000] cursor-pointer"
              aria-label="Close Terminal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="relative flex-1 p-4 overflow-y-auto custom-scrollbar text-emerald-400 text-xs sm:text-sm space-y-3 cursor-text"
          style={{ textShadow: '0 0 4px rgba(52, 211, 153, 0.4)' }}
        >
          {/* Subtle Background Matrix Digital Rain if enabled */}
          {isMatrixBgActive && (
            <MatrixRainCanvas isBackground language={lang} />
          )}

          <div className="relative z-10 space-y-3">
            {history.map((h, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <span className="text-zinc-500">C:\ERAGO&gt;</span>
                  <span className="font-bold">{h.command}</span>
                </div>
                <div className="pl-2">{h.output}</div>
              </div>
            ))}

            {/* Active Command Line Input */}
            <form onSubmit={handleCommand} className="flex items-center gap-1.5 pt-1">
              <span className="text-zinc-500 font-bold shrink-0">C:\ERAGO&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className="flex-1 bg-transparent text-emerald-400 outline-none border-none font-mono text-xs sm:text-sm caret-emerald-400"
                autoFocus
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </div>

        {/* Full-Screen Matrix Digital Rain Overlay */}
        {isMatrixMode && (
          <MatrixRainCanvas
            language={lang}
            onExit={() => {
              sound.playClick();
              setIsMatrixMode(false);
              setTimeout(() => inputRef.current?.focus(), 80);
            }}
          />
        )}
      </div>
    </div>
  );
};
