import React, { useState } from 'react';
import { Disc, Barcode, Trophy, Cpu, Calendar, Database, ZoomIn } from 'lucide-react';
import type { TriviaItem } from '../types/trivia';
import { TRIVIA_VISUALS_MAP } from '../data/triviaVisualsData';
import { sound } from '../audio/soundEngine';
import { ArtifactInspectionModal, type InspectionModalData } from './ArtifactInspectionModal';
import { getCandidateImageUrls, getSteamDbPageUrl, getSteamAppId } from '../utils/steamDbResolver';
import { useLanguage, getTranslatedTrivia } from '../utils/i18n';

interface GameArtifactWingProps {
  item: TriviaItem;
}

export const GameArtifactWing: React.FC<GameArtifactWingProps> = ({ item }) => {
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const { language } = useLanguage();
  const translatedItem = getTranslatedTrivia(item, language);

  const visual = TRIVIA_VISUALS_MAP[item.id] || TRIVIA_VISUALS_MAP[item.gameTitle] || {
    boxArtTitle: item.gameTitle,
    boxArtImageUrl: '',
    releaseDate: `${item.releaseYear}`,
    mediaFormat: item.platform,
    developerStudio: item.developer,
    salesOrLegacy: item.rarityTier,
    serialNumber: `ROM-${item.id.toUpperCase()}`,
    colorHex: item.theme.secondary
  };

  const candidates = getCandidateImageUrls(visual.boxArtImageUrl, item.id, 'boxart');
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
    type: 'game',
    title: visual.boxArtTitle,
    subtitle: `${visual.developerStudio} // ${visual.releaseDate}`,
    badge: `ROM SERIAL: ${visual.serialNumber}`,
    japanese: `${item.gameTitle} [${item.platform}]`,
    imageUrl: currentImgUrl || visual.boxArtImageUrl,
    themeColor: visual.colorHex || item.theme.secondary,
    loreSnippet: translatedItem.verifiedFact || translatedItem.story,
    steamDbUrl,
    steamAppId,
    candidateUrls: candidates,
    details: [
      { label: language === 'id' ? 'TANGGAL RILIS' : 'RELEASE DATE', value: visual.releaseDate, icon: <Calendar className="w-3.5 h-3.5" /> },
      { label: language === 'id' ? 'FORMAT MEDIA' : 'MEDIA FORMAT', value: visual.mediaFormat, icon: <Cpu className="w-3.5 h-3.5" /> },
      { label: language === 'id' ? 'PENGEMBANG' : 'DEVELOPER', value: visual.developerStudio, icon: <Database className="w-3.5 h-3.5" /> },
      { label: language === 'id' ? 'PENCAPAIAN' : 'SALES & LEGACY', value: visual.salesOrLegacy, icon: <Trophy className="w-3.5 h-3.5" /> },
      { label: language === 'id' ? 'SERIAL KATALOG' : 'CATALOG SERIAL', value: visual.serialNumber, icon: <Barcode className="w-3.5 h-3.5" /> },
      { label: language === 'id' ? 'ARSIP TERVERIFIKASI' : 'VERIFIED ARCHIVE', value: item.id.toUpperCase(), icon: <Disc className="w-3.5 h-3.5" /> }
    ]
  };

  return (
    <>
      <aside 
        className="hidden xl:flex flex-col w-72 2xl:w-80 shrink-0 sticky top-24 self-start animate-wing-right transition-all duration-300 select-none"
        aria-label="Game Artifact Box Art Exhibit"
      >

        {/* Neo-retro Tape Pin on Top */}
        <div className="relative mx-auto -mb-3 z-10">
          <div className="rounded-xs border border-black bg-[#00F5D4] px-3 py-1 font-['Press_Start_2P'] text-[7px] text-black font-bold uppercase shadow-sm rotate-[2deg]">
            {language === 'id' ? 'PAMERAN B // ARTEFAK BOX ART' : 'EXHIBIT B // BOX ART ARTIFACT'}
          </div>
        </div>

        {/* Collector Cartridge Shell */}
        <div 
          data-cursor="INSPECT"
          onClick={handleInspect}
          className="group relative rounded-lg border-3 border-black bg-[#14161F] p-4 brutal-shadow hover:border-[#FFE600] transition-all duration-200 cursor-pointer overflow-hidden space-y-3.5"
          title={language === 'id' ? 'Klik untuk menginspeksi artefak box art resmi' : 'Click to inspect official box art artifact'}
        >
          {/* Top Status & Serial Tag */}
          <div className="flex items-center justify-between border-b border-black/40 pb-2 text-[9px] font-['Press_Start_2P']">
            <span className="flex items-center gap-1 text-[#FFE600]">
              <Disc className="h-3 w-3 animate-spin-slow text-[#FFE600]" />
              {language === 'id' ? 'RILIS ASLI' : 'ORIGINAL RELEASE'}
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
              <span className="font-mono text-[9px] text-zinc-400">
                {visual.serialNumber}
              </span>
            </div>
          </div>

          {/* High-Res Vertical Box Art Frame */}
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-md border-2 border-black bg-black/90 shadow-inner flex items-center justify-center">
            {currentImgUrl ? (
              <img
                src={currentImgUrl}
                alt={visual.boxArtTitle}
                onError={handleImgError}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              /* Fallback Vintage Cartridge Vector Illustration */
              <div 
                className="flex flex-col items-center justify-center p-4 text-center h-full w-full"
                style={{ background: `radial-gradient(circle at center, ${visual.colorHex}22, #0d0e15)` }}
              >
                <div 
                  className="w-16 h-20 rounded-md border-2 border-black flex flex-col items-center justify-center mb-2 shadow-md"
                  style={{ backgroundColor: visual.colorHex }}
                >
                  <Cpu className="w-8 h-8 text-black" />
                  <span className="font-['Press_Start_2P'] text-[6px] text-black font-bold mt-1">ROM</span>
                </div>
                <span className="font-['Press_Start_2P'] text-[8px] text-white uppercase tracking-wider line-clamp-2">
                  {visual.boxArtTitle}
                </span>
                <span className="font-mono text-[9px] text-zinc-400 mt-1">
                  {visual.mediaFormat}
                </span>
              </div>
            )}

            {/* Holo foil reflection effect on hover */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Official Seal Badge */}
            <div className="absolute top-2 left-2 rounded-xs border border-black bg-[#FF2A85] px-1.5 py-0.5 font-['Press_Start_2P'] text-[6px] text-white font-bold uppercase shadow-sm">
              {language === 'id' ? 'SEGEL RESMI' : 'OFFICIAL SEAL'}
            </div>

            {/* Inspect Icon Hover Cue */}
            <div className="absolute top-2 right-2 rounded-full bg-black/80 p-1.5 text-white opacity-80 group-hover:opacity-100 transition-opacity border border-white/20">
              <ZoomIn className="h-3.5 w-3.5 text-[#FFE600]" />
            </div>
          </div>

          {/* Technical Specs Summary */}
          <div className="space-y-1.5 font-['Space_Grotesk'] text-xs">
            <div className="flex items-start justify-between border-b border-white/10 pb-1.5">
              <span className="flex items-center gap-1 text-zinc-400 font-semibold shrink-0">
                <Calendar className="h-3 w-3 text-[#00F5D4]" /> {language === 'id' ? 'Tanggal Rilis:' : 'Release Date:'}
              </span>
              <span className="font-mono text-white text-[11px] font-bold text-right flex-1 ml-2 break-words leading-tight">
                {visual.releaseDate}
              </span>
            </div>

            <div className="flex items-start justify-between border-b border-white/10 pb-1.5">
              <span className="flex items-center gap-1 text-zinc-400 font-semibold shrink-0">
                <Cpu className="h-3 w-3 text-[#FF2A85]" /> {language === 'id' ? 'Format Media:' : 'Media Format:'}
              </span>
              <span className="font-mono text-white text-[11px] text-right flex-1 ml-2 break-words leading-tight">
                {visual.mediaFormat}
              </span>
            </div>

            <div className="flex items-start justify-between border-b border-white/10 pb-1.5">
              <span className="flex items-center gap-1 text-zinc-400 font-semibold shrink-0">
                <Database className="h-3 w-3 text-[#FFE600]" /> {language === 'id' ? 'Pengembang:' : 'Developer:'}
              </span>
              <span className="font-mono text-white text-[11px] text-right flex-1 ml-2 break-words leading-tight">
                {visual.developerStudio}
              </span>
            </div>

            <div className="flex items-start justify-between">
              <span className="flex items-center gap-1 text-zinc-400 font-semibold shrink-0">
                <Trophy className="h-3 w-3 text-[#00F5D4]" /> {language === 'id' ? 'Pencapaian:' : 'Milestone:'}
              </span>
              <span className="font-mono text-[#FFE600] text-[11px] font-bold text-right flex-1 ml-2 break-words leading-tight">
                {visual.salesOrLegacy}
              </span>
            </div>
          </div>


          {/* Retro Barcode & Archival Verification Strip */}
          <div className="flex items-center justify-between border-t border-black/40 pt-2 text-zinc-400">
            <div className="flex items-center gap-1 font-mono text-[9px] text-zinc-400">
              <Barcode className="h-4 w-5 text-white" />
              <span>{visual.serialNumber}</span>
            </div>
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleInspect();
              }}
              className="text-[#FFE600] hover:underline flex items-center gap-1 cursor-pointer font-bold font-mono text-[9px]"
            >
              <ZoomIn className="w-2.5 h-2.5" />
              {language === 'id' ? 'KLIK INSPEKSI' : 'CLICK TO INSPECT'}
            </button>
          </div>
        </div>
      </aside>

      {/* Archival Box Art Inspection Lightbox Modal */}
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
