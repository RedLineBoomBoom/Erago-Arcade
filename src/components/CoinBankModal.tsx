import React, { useEffect, useState } from 'react';
import { X, Coins, Clock, Sparkles, Gamepad2, Swords, RefreshCw, ShieldCheck, ShieldAlert } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { currencyManager, BOSS_CLEAR_REWARD_COINS } from '../utils/currencyManager';
import { useLanguage } from '../utils/i18n';

interface CoinBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  accumulatedPoints: number;
  onOpenMiniGames: () => void;
  onOpenBossBattle: () => void;
}

export const CoinBankModal: React.FC<CoinBankModalProps> = ({
  isOpen,
  onClose,
  coins,
  accumulatedPoints,
  onOpenMiniGames,
  onOpenBossBattle,
}) => {
  const { language, t } = useLanguage();
  const [playtime, setPlaytime] = useState(() => currencyManager.getPlaytimeRemaining());
  const [securityStatus, setSecurityStatus] = useState(() => currencyManager.getSecurityStatus());

  // Close on Escape key
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

  // Live countdown timer & security telemetry while modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Subscribe to currencyManager which emits every second
    const unsub = currencyManager.subscribe(() => {
      setPlaytime(currencyManager.getPlaytimeRemaining());
      setSecurityStatus(currencyManager.getSecurityStatus());
    });

    const unsubTamper = currencyManager.onTamperDetected(() => {
      setSecurityStatus(currencyManager.getSecurityStatus());
    });

    // Secondary interval ticker for guaranteed 1000ms live ticks
    const intervalId = window.setInterval(() => {
      setPlaytime(currencyManager.getPlaytimeRemaining());
    }, 1000);

    return () => {
      unsub();
      unsubTamper();
      clearInterval(intervalId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const { formatted, progressPercent } = playtime;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onClose();
        }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none overflow-y-auto"
    >
      {/* Modal Container with strict viewport constraints and scrolling */}
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col rounded-2xl border-4 border-black bg-[#14161F] shadow-[8px_8px_0px_#FFE600] text-white overflow-hidden animate-scale-up my-auto">
        {/* Fixed Sticky Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-3.5 bg-[#0B0C10] border-b-2 border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-black bg-[#FFE600] text-black shadow-[2px_2px_0px_#000]">
              <Coins className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-base sm:text-lg text-white">
                  {t('bank_title')}
                </h2>
                <span className="px-1.5 py-0.5 rounded-xs bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[6px] font-bold">
                  BANK
                </span>
              </div>
              <p className="font-mono text-[9px] text-zinc-400">
                {t('bank_subtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            title={language === 'id' ? 'Tutup (Esc)' : 'Close (Esc)'}
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white hover:bg-white hover:text-black font-bold transition-all shadow-[2px_2px_0px_#000]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5 space-y-3.5">
          {/* Current Balance Display */}
          <div className="rounded-xl border-3 border-black bg-gradient-to-br from-[#1E2230] via-[#14161F] to-[#0B0C10] p-4 text-center space-y-1.5 shadow-[3px_3px_0px_#000]">
            <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
              {t('bank_current_balance')}
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <span className="text-2xl animate-bounce">🪙</span>
              <span className="font-['Press_Start_2P'] text-xl sm:text-2xl text-[#FFE600] tracking-tight">
                {coins.toLocaleString()}
              </span>
              <span className="font-['Press_Start_2P'] text-[10px] text-[#00F5D4]">COINS</span>
            </div>
          </div>

          {/* Status Dual Cards: Points Buffer & Time Reward */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Points Progress */}
            <div className="rounded-xl border-2 border-black bg-[#1A1C26] p-3 space-y-1.5 shadow-[2px_2px_0px_#000]">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-400">{t('bank_points_buffer')}:</span>
                <span className="text-[#00F5D4] font-bold">{accumulatedPoints} / 100 PTS</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="bg-[#00F5D4] h-full transition-all duration-300"
                  style={{ width: `${accumulatedPoints}%` }}
                />
              </div>
              <p className="font-mono text-[9px] text-zinc-400">
                {t('bank_buffer_subtext', { needed: 100 - accumulatedPoints })}
              </p>
            </div>

            {/* Time Progress */}
            <div className="rounded-xl border-2 border-black bg-[#1A1C26] p-3 space-y-1.5 shadow-[2px_2px_0px_#000]">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#FFE600]" /> {t('bank_next_time_reward')}:
                </span>
                <span className="text-[#FFE600] font-['Press_Start_2P'] text-[8px]">{formatted}</span>
              </div>
              <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-white/10">
                <div
                  className="bg-[#FFE600] h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="font-mono text-[9px] text-zinc-400">
                {t('bank_time_reward_sub')}
              </p>
            </div>
          </div>

          {/* Currency Rules Table */}
          <div className="rounded-xl border-2 border-black bg-[#0B0C10] p-3 space-y-2 shadow-[2px_2px_0px_#000]">
            <div className="font-['Press_Start_2P'] text-[7px] text-[#FFE600] uppercase">
              {t('bank_rules_heading')}:
            </div>

            <div className="space-y-1 font-mono text-[11px] text-zinc-300 divide-y divide-white/5">
              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-3 h-3 text-[#FF2A85]" /> {language === 'id' ? 'Roll Roulette Trivia:' : 'Trivia Roulette Roll:'}
                </span>
                <span className="font-bold text-[#FF2A85]">{language === 'id' ? '-10 Koin / spin' : '-10 Coins / spin'}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-3 h-3 text-[#00F5D4]" /> {language === 'id' ? 'Mini Games (5 Game):' : 'Mini Games (5 Games):'}
                </span>
                <span className="font-bold text-[#00F5D4]">{language === 'id' ? '100 Poin = +10 Koin' : '100 Pts = +10 Coins'}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-2">
                  <Swords className="w-3 h-3 text-[#FFE600]" /> Trivia Boss Rush:
                </span>
                <span className="font-bold text-[#FFE600]">{language === 'id' ? `Selesai Boss = +${BOSS_CLEAR_REWARD_COINS} Koin` : `Boss Clear = +${BOSS_CLEAR_REWARD_COINS} Coins`}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-[#9D4EDD]" /> {language === 'id' ? 'Hadiah Aktif Website:' : 'Playtime Active Reward:'}
                </span>
                <span className="font-bold text-[#9D4EDD]">{language === 'id' ? '+100 Koin / 10 menit' : '+100 Coins / 10 mins'}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#00F5D4]" /> {language === 'id' ? 'Modal Awal Pengguna:' : 'Starting User Balance:'}
                </span>
                <span className="font-bold text-white">{language === 'id' ? '2.000 Koin Gratis' : '2,000 Free Coins'}</span>
              </div>
            </div>
          </div>

          {/* Cryptographic Vault Security Audit Card */}
          <div className="rounded-xl border-2 border-[#00F5D4]/40 bg-[#0C131A] p-3.5 space-y-2 shadow-[2px_2px_0px_#000]">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#00F5D4] bg-[#00F5D4]/10 text-[#00F5D4] shadow-[1px_1px_0px_#000]">
                  {securityStatus.isSecured ? (
                    <ShieldCheck className="w-4 h-4" />
                  ) : (
                    <ShieldAlert className="w-4 h-4 text-[#FF2A85]" />
                  )}
                </div>
                <div>
                  <div className="font-['Press_Start_2P'] text-[7px] text-[#00F5D4] tracking-tight">
                    {t('vault_security_title')}
                  </div>
                  <div className="font-mono text-[9px] text-zinc-400">
                    {t('vault_security_badge')}
                  </div>
                </div>
              </div>

              <div
                className={`px-2 py-1 rounded border text-[7px] font-['Press_Start_2P'] flex items-center gap-1.5 shrink-0 ${
                  securityStatus.isSecured
                    ? 'border-[#00F5D4] bg-[#00F5D4]/10 text-[#00F5D4]'
                    : 'border-[#FF2A85] bg-[#FF2A85]/20 text-[#FF2A85]'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    securityStatus.isSecured ? 'bg-[#00F5D4] animate-pulse' : 'bg-[#FF2A85] animate-ping'
                  }`}
                />
                <span>{securityStatus.isSecured ? t('vault_status_secured') : t('vault_status_tampered')}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[10px] border-t border-white/10">
              <div>
                <span className="text-zinc-500 block text-[8px] uppercase">{t('vault_device_id_label')}:</span>
                <span className="text-zinc-300 font-bold tracking-wider">{securityStatus.shortVaultId}</span>
              </div>
              <div className="text-right">
                <span className="text-zinc-500 block text-[8px] uppercase">ANTI-TAMPER STATUS:</span>
                <span className={securityStatus.tamperCount === 0 ? 'text-[#00F5D4] font-bold' : 'text-[#FF2A85] font-bold'}>
                  {securityStatus.tamperCount === 0 ? '0 ANOMALIES (ACTIVE)' : `${securityStatus.tamperCount} TAMPER BLOCKED`}
                </span>
              </div>
            </div>

            <p className="font-mono text-[9px] text-zinc-400 leading-relaxed pt-0.5">
              {t('vault_anti_tamper_desc')}
            </p>
          </div>
        </div>

        {/* Fixed Sticky Footer */}
        <div className="shrink-0 p-3 sm:p-4 bg-[#0B0C10] border-t-2 border-black flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenMiniGames();
            }}
            className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border-2 border-black bg-[#00F5D4] text-black font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white transition-colors"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>{t('bank_btn_minigame')}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
              onOpenBossBattle();
            }}
            className="flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border-2 border-black bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[8px] font-bold shadow-[2px_2px_0px_#000] hover:bg-white hover:text-black transition-colors"
          >
            <Swords className="w-4 h-4" />
            <span>{t('bank_btn_boss')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoinBankModal;
