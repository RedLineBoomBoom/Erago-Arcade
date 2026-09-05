import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  Key, 
  Check, 
  RefreshCw, 
  Trash2, 
  Zap, 
  ShieldCheck, 
  Globe, 
  Eye, 
  EyeOff,
  Sparkles
} from 'lucide-react';
import { deepLService } from '../services/deepLService';
import type { DeepLStatus } from '../services/deepLService';
import { sound } from '../audio/soundEngine';

interface DeepLSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeepLSettingsModal: React.FC<DeepLSettingsModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<DeepLStatus>(deepLService.getStatus());
  const [keyInput, setKeyInput] = useState<string>(deepLService.getApiKey());
  const [showKey, setShowKey] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isCheckingUsage, setIsCheckingUsage] = useState<boolean>(false);

  // Test sandbox state
  const [testInput, setTestInput] = useState<string>('Insert coin to begin your retro gaming adventure!');
  const [testOutput, setTestOutput] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);

  useEffect(() => {
    return deepLService.subscribe((newStatus) => {
      setStatus(newStatus);
    });
  }, []);

  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setKeyInput(deepLService.getApiKey());
    }
  }

  useEffect(() => {
    if (isOpen) {
      deepLService.fetchUsage();
    }
  }, [isOpen]);

  // Handle ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSaveKey = () => {
    sound.playPowerUp();
    deepLService.setApiKey(keyInput);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleRefreshUsage = async () => {
    sound.playClick();
    setIsCheckingUsage(true);
    await deepLService.fetchUsage();
    setIsCheckingUsage(false);
  };

  const handleClearCache = () => {
    sound.playClick();
    deepLService.clearCache();
  };

  const handleRunTest = async () => {
    if (!testInput.trim()) return;
    sound.playPowerUp();
    setIsTesting(true);
    setTestOutput('');
    try {
      const translated = await deepLService.translateText(testInput, 'id', 'en');
      setTestOutput(translated);
      sound.playJackpot();
    } catch {
      setTestOutput('Gagal menerjemahkan via DeepL API.');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl border-4 border-black bg-[#14161F] shadow-[8px_8px_0px_#0F2B48] text-white overflow-hidden animate-scale-up my-auto">
        
        {/* Top Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 bg-[#0B0C10] border-b-2 border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border-2 border-black bg-[#0F2B48] text-[#00F5D4] shadow-[2px_2px_0px_#000] text-2xl font-black">
              <Globe className="w-6 h-6 text-[#00F5D4]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-base sm:text-lg text-white tracking-wide">
                  DEEPL TRANSLATION ENGINE
                </h2>
                <span className="px-2 py-0.5 rounded-xs bg-[#0F2B48] border border-[#00F5D4]/40 text-[#00F5D4] font-['Press_Start_2P'] text-[6px] font-bold">
                  DEEPL.COM
                </span>
              </div>
              <p className="font-mono text-[10px] text-zinc-400">
                LAYANAN PENERJEMAHAN RESMI NEURAL AI // TINGKAT AKURASI TINGGI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.deepl.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-black bg-[#1E2230] text-[#00F5D4] hover:bg-[#00F5D4] hover:text-black font-mono text-xs transition-colors shadow-[2px_2px_0px_#000]"
              title="Kunjungi DeepL Resmi"
            >
              <span>deepl.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              title="Tutup (Esc)"
              className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white hover:bg-white hover:text-black font-bold transition-all shadow-[2px_2px_0px_#000]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 sm:p-6 space-y-6">
          
          {/* DeepL Info Box */}
          <div className="p-4 rounded-xl border-2 border-black bg-gradient-to-r from-[#0F2B48]/60 to-[#14161F] shadow-[3px_3px_0px_#000] space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-['Press_Start_2P'] text-[#00F5D4]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>INTEGRASI RESMI DEEPL</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 border border-white/10 text-zinc-300">
                EN ⇄ ID
              </span>
            </div>
            <p className="font-mono text-xs text-zinc-300 leading-relaxed">
              Website ini menggunakan kecerdasan buatan dari <strong>DeepL</strong> (<a href="https://www.deepl.com/" target="_blank" rel="noopener noreferrer" className="text-[#00F5D4] underline hover:text-white">www.deepl.com</a>) untuk menerjemahkan katrid trivia video game dan berita industri gaming secara akurat, kontekstual, dan alami.
            </p>
          </div>

          {/* API Key Configuration Card */}
          <div className="p-4 sm:p-5 rounded-xl border-3 border-black bg-[#1A1C26] shadow-[4px_4px_0px_#000] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-['Syne'] font-bold text-sm text-white">
                <Key className="w-4 h-4 text-[#FFE600]" />
                <span>DEEPL API KEY</span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-1.5">
                {status.hasKey ? (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#00F566]/20 border border-[#00F566] text-[#00F566] font-['Press_Start_2P'] text-[7px] font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    {status.keyType === 'free' ? 'DEEPL FREE KEY' : 'DEEPL PRO KEY'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#FFE600]/20 border border-[#FFE600] text-[#FFE600] font-['Press_Start_2P'] text-[7px] font-bold">
                    <Zap className="w-3 h-3" />
                    CACHE SIAP PAKAI
                  </span>
                )}
              </div>
            </div>

            <p className="font-mono text-xs text-zinc-400">
              Anda dapat menggunakan API Key gratis dari DeepL (500.000 karakter gratis per bulan). Dapatkan key gratis di{' '}
              <a
                href="https://www.deepl.com/pro-api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00F5D4] underline font-bold hover:text-white"
              >
                deepl.com/pro-api ↗
              </a>.
            </p>

            {/* Input & Action */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="Masukkan DeepL API Key (contoh: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx:fx)"
                  className="w-full pl-3 pr-10 py-2.5 rounded-lg border-2 border-black bg-[#14161F] text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#00F5D4] shadow-[2px_2px_0px_#000]"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="text-[10px] font-mono text-zinc-500">
                  Key tersimpan aman di browser (localStorage) Anda.
                </div>

                <div className="flex items-center gap-2">
                  {keyInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setKeyInput('');
                        deepLService.setApiKey('');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-white/20 bg-black/40 hover:bg-red-950/60 text-zinc-300 font-mono text-xs transition-colors"
                    >
                      Hapus
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleSaveKey}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border-2 border-black bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors"
                  >
                    {saveSuccess ? <Check className="w-3 h-3 text-black" /> : null}
                    <span>{saveSuccess ? 'TERSIMPAN!' : 'SIMPAN KEY'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quota Usage Bar (if available) */}
            {status.usage && (
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Penggunaan Karakter DeepL:</span>
                  <span className="font-bold text-[#00F5D4]">
                    {status.usage.characterCount.toLocaleString()} / {status.usage.characterLimit.toLocaleString()}
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-black/60 border border-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00F5D4] to-[#FFE600] transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        (status.usage.characterCount / (status.usage.characterLimit || 1)) * 100
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleRefreshUsage}
                    disabled={isCheckingUsage}
                    className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-white"
                  >
                    <RefreshCw className={`w-2.5 h-2.5 ${isCheckingUsage ? 'animate-spin text-[#FFE600]' : ''}`} />
                    <span>Perbarui Kuota</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* DeepL Interactive Test Sandbox */}
          <div className="p-4 sm:p-5 rounded-xl border-3 border-black bg-[#1A1C26] shadow-[4px_4px_0px_#000] space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-['Syne'] font-bold text-sm text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#00F5D4]" />
                <span>UJI TERJEMAHAN LANGSUNG (EN ➔ ID)</span>
              </div>
              <span className="font-mono text-[9px] text-zinc-500">Live Test Sandbox</span>
            </div>

            <div className="space-y-2">
              <textarea
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                rows={2}
                placeholder="Tulis kalimat bahasa Inggris untuk diuji..."
                className="w-full p-2.5 rounded-lg border-2 border-black bg-[#14161F] text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-[#00F5D4] shadow-[2px_2px_0px_#000] resize-none"
              />

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleRunTest}
                  disabled={isTesting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border-2 border-black bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors"
                >
                  <RefreshCw className={`w-3 h-3 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? 'MENERJEMAHKAN...' : 'TERJEMAHKAN DENGAN DEEPL'}</span>
                </button>

                <div className="font-mono text-[10px] text-zinc-500">
                  Target: Bahasa Indonesia
                </div>
              </div>

              {testOutput && (
                <div className="p-3 rounded-lg border-2 border-black bg-[#0B0C10] shadow-[2px_2px_0px_#000] space-y-1 animate-fade-in">
                  <div className="font-['Press_Start_2P'] text-[7px] text-[#00F5D4]">
                    HASIL TERJEMAHAN DEEPL:
                  </div>
                  <p className="font-mono text-xs text-white leading-relaxed">
                    {testOutput}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Cache Management */}
          <div className="p-4 rounded-xl border-2 border-black bg-[#0B0C10] shadow-[2px_2px_0px_#000] flex items-center justify-between gap-3 font-mono text-xs">
            <div className="space-y-0.5">
              <div className="text-white font-bold">
                Cache Terjemahan Lokal: <span className="text-[#FFE600]">{status.cachedItemsCount}</span> teks tersimpan
              </div>
              <div className="text-[10px] text-zinc-500">
                Teks yang sudah diterjemahkan disimpan di browser agar tidak memakan kuota ulang.
              </div>
            </div>

            {status.cachedItemsCount > 0 && (
              <button
                onClick={handleClearCache}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-950/40 hover:bg-red-900/60 text-red-300 text-xs transition-colors shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Bersihkan</span>
              </button>
            )}
          </div>

        </div>

        {/* Modal Fixed Footer */}
        <div className="shrink-0 px-5 py-3.5 bg-[#0B0C10] border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2 text-[11px]">
            <span>Didukung oleh teknologi penerjemahan</span>
            <a
              href="https://www.deepl.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00F5D4] font-bold hover:underline inline-flex items-center gap-0.5"
            >
              <span>DeepL</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2 rounded-lg border-2 border-black bg-[#FFE600] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors"
          >
            TUTUP [ESC]
          </button>
        </div>

      </div>
    </div>
  );
};

export default DeepLSettingsModal;
