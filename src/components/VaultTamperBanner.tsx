import React, { useEffect } from 'react';
import { ShieldAlert, AlertTriangle, X } from 'lucide-react';
import { sound } from '../audio/soundEngine';
import { useLanguage } from '../utils/i18n';
import type { TamperIncident } from '../utils/securityLedger';

interface VaultTamperBannerProps {
  incident: TamperIncident | null;
  onDismiss: () => void;
}

export const VaultTamperBanner: React.FC<VaultTamperBannerProps> = ({ incident, onDismiss }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (incident) {
      sound.playError();
    }
  }, [incident]);

  if (!incident) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[110] w-[95%] max-w-xl animate-bounce-short select-none">
      <div className="rounded-xl border-3 border-[#FF2A85] bg-[#140810]/95 backdrop-blur-md p-4 text-white shadow-[6px_6px_0px_#FF2A85] flex items-start gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border-2 border-black bg-[#FF2A85] text-white shadow-[2px_2px_0px_#000] animate-pulse">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-['Press_Start_2P'] text-[9px] text-[#FF2A85] uppercase tracking-wide">
              {t('tamper_alert_title')}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 font-mono text-[9px] font-bold border border-red-500/40">
              ANTI-TAMPER
            </span>
          </div>

          <p className="font-mono text-[11px] text-zinc-300 leading-snug">
            {t('tamper_alert_desc')}
          </p>

          <div className="rounded bg-black/60 px-2.5 py-1.5 border border-red-500/20 font-mono text-[10px] text-red-300/90 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF2A85] shrink-0" />
            <span className="truncate">Detail: {incident.reason}</span>
          </div>

          <div className="pt-1 flex items-center justify-between">
            <span className="font-mono text-[10px] text-zinc-400">
              {t('tamper_alert_reverted', { coins: incident.revertedToCoins.toLocaleString() })}
            </span>

            <button
              onClick={() => {
                sound.playClick();
                onDismiss();
              }}
              className="px-3 py-1 rounded border border-white/20 bg-white/10 hover:bg-[#FF2A85] text-white font-['Press_Start_2P'] text-[7px] transition-colors"
            >
              {t('tamper_alert_dismiss')}
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onDismiss();
          }}
          className="text-zinc-400 hover:text-white p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default VaultTamperBanner;
