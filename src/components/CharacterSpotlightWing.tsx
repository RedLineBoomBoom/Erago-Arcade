import React, { useState } from 'react';
import { User, Sparkles, ShieldAlert, ZoomIn } from 'lucide-react';
import type { TriviaItem } from '../types/trivia';
import { TRIVIA_VISUALS_MAP } from '../data/triviaVisualsData';
import { sound } from '../audio/soundEngine';
import { ArtifactInspectionModal, type InspectionModalData } from './ArtifactInspectionModal';
import { getCandidateImageUrls, getSteamDbPageUrl, getSteamAppId } from '../utils/steamDbResolver';
import { useLanguage, getTranslatedTrivia, translateRarity } from '../utils/i18n';

interface CharacterSpotlightWingProps {
  item: TriviaItem;
}

export const CharacterSpotlightWing: React.FC<CharacterSpotlightWingProps> = ({ item }) => {
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const { language } = useLanguage();
  const translatedItem = getTranslatedTrivia(item, language);

  const visual = TRIVIA_VISUALS_MAP[item.id] || TRIVIA_VISUALS_MAP[item.gameTitle] || {
    characterName: item.gameTitle,
    characterTitle: item.developer,
    characterQuote: translatedItem.quoteOrLore || translatedItem.headline,
    characterImageUrl: '',
    characterBadge: language === 'id' ? 'ARSIP RETRO' : 'RETRO ARCHIVE',
    characterJapanese: item.genre,
    colorHex: item.theme.primary
  };

  const activeQuote = translatedItem.quoteOrLore || visual.characterQuote;

  const candidates = getCandidateImageUrls(visual.characterImageUrl, item.id, 'character');
  const [candidateIndex, setCandidateIndex] = useState(0);
  const steamDbUrl = getSteamDbPageUrl(item.id);
  const steamAppId = getSteamAppId(item.id);

  const currentImgUrl = candidateIndex >= 0 && candidateIndex < candidates.length ? candidates[candidateIndex] : null;

  const handleImgError = () => {
    if (candidateIndex + 1 < candidates.length) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setCandidateIndex(-1);
    }
  };

  const handleInspect = () => {
    sound.playClick();
    setIsInspectOpen(true);
  };

  const inspectData: InspectionModalData = {
    type: 'character',
    title: visual.characterName,
    subtitle: visual.characterTitle,
    badge: visual.characterBadge,
    japanese: visual.characterJapanese,
    imageUrl: currentImgUrl || visual.characterImageUrl,
    quote: activeQuote,
    themeColor: visual.colorHex || item.theme.primary,
    loreSnippet: translatedItem.story || translatedItem.headline,
    steamDbUrl,
    steamAppId,
    candidateUrls: candidates,
    details: [
      { label: language === 'id' ? 'GAME ASAL' : 'ORIGIN GAME', value: item.gameTitle },
      { label: language === 'id' ? 'ERA / TAHUN' : 'ERA / YEAR', value: `${item.releaseYear} (${item.era})` },
      { label: 'PLATFORM', value: item.platform },
      { label: language === 'id' ? 'PENGEMBANG' : 'DEVELOPER', value: item.developer },
      { label: language === 'id' ? 'TINGKAT KELANGKAAN' : 'RARITY TIER', value: translateRarity(item.rarityTier, language) },
      { label: language === 'id' ? 'SKOR KAGUM' : 'MINDBLOWN FACTOR', value: `${item.mindblownScore}%` }
    ]
  };


  return (
    <>
      <aside 
        className="hidden xl:flex flex-col w-72 2xl:w-80 shrink-0 sticky top-24 self-start animate-wing-left transition-all duration-300 select-none"
        aria-label="Character Spotlight Exhibit"
      >

        {/* Neo-retro Tape Pin on Top */}
        <div className="relative mx-auto -mb-3 z-10">
          <div className="rounded-xs border border-black bg-[#FFE600] px-3 py-1 font-['Press_Start_2P'] text-[7px] text-black font-bold uppercase shadow-sm rotate-[-2deg]">
            {language === 'id' ? 'PAMERAN A // PROFIL HERO' : 'EXHIBIT A // HERO PROFILE'}
          </div>
        </div>

        {/* Polaroid Museum Card Shell */}
        <div 
          data-cursor="INSPECT"
          onClick={handleInspect}
          className="group relative rounded-lg border-3 border-black bg-[#14161F] p-4 brutal-shadow hover:border-[#00F5D4] transition-all duration-200 cursor-pointer overflow-hidden space-y-3.5"
          title={language === 'id' ? 'Klik untuk menginspeksi berkas karakter' : 'Click to inspect character dossier'}
        >
          {/* Top Japanese & Era Header */}
          <div className="flex items-center justify-between border-b border-black/40 pb-2 text-[9px] font-['Press_Start_2P']">
            <span className="text-[#00F5D4] flex-1 break-words leading-tight pr-2">
              {visual.characterJapanese || (language === 'id' ? 'ARSIP HERO' : 'HERO ARCHIVE')}
            </span>

            <div className="flex items-center gap-1.5 shrink-0">
              {steamDbUrl && (
                <a
                  href={steamDbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded bg-[#1b2838] px-1 py-0.5 text-[#66c0f4] border border-[#66c0f4]/40 hover:bg-[#2a475e] hover:text-white transition-colors text-[7px]"
                  title={`SteamDB App #${steamAppId}`}
                >
                  STEAMDB
                </a>
              )}
              <span className="rounded bg-black/60 px-1.5 py-0.5 text-zinc-300 border border-black">
                {item.releaseYear}
              </span>
            </div>
          </div>

          {/* Photo Frame with Scanline CRT Effect */}
          <div className="relative aspect-square w-full overflow-hidden rounded-md border-2 border-black bg-black/80 shadow-inner flex items-center justify-center">
            {currentImgUrl ? (
              <img
                src={currentImgUrl}
                alt={visual.characterName}
                onError={handleImgError}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              /* Fallback Retro Vector Avatar Badge */
              <div 
                className="flex flex-col items-center justify-center p-4 text-center h-full w-full"
                style={{ background: `radial-gradient(circle at center, ${visual.colorHex}22, #0d0e15)` }}
              >
                <div 
                  className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mb-2 shadow-md"
                  style={{ backgroundColor: visual.colorHex }}
                >
                  <User className="w-8 h-8 text-black" />
                </div>
                <span className="font-['Press_Start_2P'] text-[8px] text-white uppercase tracking-wider">
                  {visual.characterName}
                </span>
                <span className="font-['Space_Grotesk'] text-[10px] text-zinc-400 mt-1 font-bold">
                  {language === 'id' ? 'ARSIP TERKLASIFIKASI' : 'ARCHIVE CLASSIFIED'}
                </span>
              </div>
            )}

            {/* Retro CRT Scanlines Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-40" />

            {/* Neo-retro Sticker Badge */}
            <div className="absolute bottom-2 left-2 rounded-xs border border-black bg-[#00F5D4] px-1.5 py-0.5 font-['Press_Start_2P'] text-[6px] text-black font-bold uppercase shadow-sm">
              {visual.characterBadge}
            </div>

            {/* Inspect Icon Hover Cue */}
            <div className="absolute top-2 right-2 rounded-full bg-black/80 p-1.5 text-white opacity-80 group-hover:opacity-100 transition-opacity border border-white/20">
              <ZoomIn className="h-3.5 w-3.5 text-[#00F5D4]" />
            </div>
          </div>

          {/* Character Identity & Titles */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-['Press_Start_2P']">
              <Sparkles className="h-3 w-3 text-[#FFE600]" />
              <span className="text-[8px] text-[#FFE600]">{language === 'id' ? 'SUBJEK ARSIP:' : 'ARCHIVAL SUBJECT:'}</span>
            </div>
            <h3 className="font-['Syne'] text-lg font-black text-white leading-tight group-hover:text-[#00F5D4] transition-colors">
              {visual.characterName}
            </h3>
            <p className="font-['Space_Grotesk'] text-xs font-medium text-zinc-300 leading-snug">
              {visual.characterTitle}
            </p>
          </div>

          {/* Dialogue / Signature Quote Speech Bubble */}
          <div className="relative rounded-sm border-2 border-black bg-black/70 p-3 font-['Space_Grotesk'] text-xs text-zinc-300 italic brutal-shadow-sm">
            <div className="absolute -top-2 left-4 h-0 w-0 border-x-4 border-x-transparent border-b-4 border-b-black" />
            <p className="leading-relaxed">
              {activeQuote}
            </p>
          </div>

          {/* Bottom Metadata Bar */}
          <div className="flex items-center justify-between border-t border-black/40 pt-2 text-[8px] font-['Press_Start_2P'] text-zinc-400">
            <span className="flex items-center gap-1">
              <ShieldAlert className="h-3 w-3 text-[#FF2A85]" />
              {language === 'id' ? 'RAHASIA' : 'CONFIDENTIAL'}
            </span>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="text-[#00F5D4] hover:underline flex items-center gap-1 cursor-pointer font-bold"
            >
              <ZoomIn className="w-2.5 h-2.5" />
              {language === 'id' ? 'KLIK INSPEKSI' : 'CLICK TO INSPECT'}
            </button>
          </div>
        </div>
      </aside>

      {/* Archival Dossier Inspection Lightbox Modal */}
      {isInspectOpen && (
        <ArtifactInspectionModal 
          key={inspectData.imageUrl}
          data={inspectData} 
          onClose={() => setIsInspectOpen(false)} 
        />
      )}
    </>
  );
};
