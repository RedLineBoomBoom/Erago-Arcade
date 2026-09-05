import React, { useState } from 'react';
import { Image as ImageIcon, ChevronDown, ChevronUp, User, Disc, ZoomIn } from 'lucide-react';
import type { TriviaItem } from '../types/trivia';
import { TRIVIA_VISUALS_MAP } from '../data/triviaVisualsData';
import { sound } from '../audio/soundEngine';
import { ArtifactInspectionModal, type InspectionModalData } from './ArtifactInspectionModal';
import { useLanguage, getTranslatedTrivia, translateRarity } from '../utils/i18n';

interface MobilePhotoCompanionProps {
  item: TriviaItem;
}

export const MobilePhotoCompanion: React.FC<MobilePhotoCompanionProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inspectData, setInspectData] = useState<InspectionModalData | null>(null);
  const { language } = useLanguage();
  const translatedItem = getTranslatedTrivia(item, language);

  const visual = TRIVIA_VISUALS_MAP[item.id] || TRIVIA_VISUALS_MAP[item.gameTitle];

  if (!visual) return null;

  const activeQuote = translatedItem.quoteOrLore || visual.characterQuote;

  const toggleOpen = () => {
    sound.playClick();
    setIsOpen(!isOpen);
  };

  const handleInspectCharacter = () => {
    sound.playClick();
    setInspectData({
      type: 'character',
      title: visual.characterName,
      subtitle: visual.characterTitle,
      badge: visual.characterBadge,
      japanese: visual.characterJapanese,
      imageUrl: visual.characterImageUrl,
      quote: activeQuote,
      themeColor: visual.colorHex || item.theme.primary,
      loreSnippet: translatedItem.story || translatedItem.headline,
      details: [
        { label: language === 'id' ? 'GAME ASAL' : 'ORIGIN GAME', value: item.gameTitle },
        { label: language === 'id' ? 'ERA / TAHUN' : 'ERA / YEAR', value: `${item.releaseYear} (${item.era})` },
        { label: 'PLATFORM', value: item.platform },
        { label: language === 'id' ? 'PENGEMBANG' : 'DEVELOPER', value: item.developer },
        { label: language === 'id' ? 'TINGKAT KELANGKAAN' : 'RARITY TIER', value: translateRarity(item.rarityTier, language) },
        { label: language === 'id' ? 'SKOR KAGUM' : 'MINDBLOWN FACTOR', value: `${item.mindblownScore}%` }
      ]
    });
  };

  const handleInspectGame = () => {
    sound.playClick();
    setInspectData({
      type: 'game',
      title: visual.boxArtTitle,
      subtitle: `${visual.developerStudio} // ${visual.releaseDate}`,
      badge: `ROM SERIAL: ${visual.serialNumber}`,
      japanese: `${item.gameTitle} [${item.platform}]`,
      imageUrl: visual.boxArtImageUrl,
      themeColor: visual.colorHex || item.theme.secondary,
      loreSnippet: translatedItem.verifiedFact || translatedItem.story,
      details: [
        { label: language === 'id' ? 'TANGGAL RILIS' : 'RELEASE DATE', value: visual.releaseDate },
        { label: language === 'id' ? 'FORMAT MEDIA' : 'MEDIA FORMAT', value: visual.mediaFormat },
        { label: language === 'id' ? 'PENGEMBANG' : 'DEVELOPER', value: visual.developerStudio },
        { label: language === 'id' ? 'PENCAPAIAN' : 'SALES & LEGACY', value: visual.salesOrLegacy },
        { label: language === 'id' ? 'SERIAL KATALOG' : 'CATALOG SERIAL', value: visual.serialNumber },
        { label: language === 'id' ? 'ARSIP TERVERIFIKASI' : 'VERIFIED ARCHIVE', value: item.id.toUpperCase() }
      ]
    });
  };

  return (
    <>
      <div className="xl:hidden w-full max-w-4xl mx-auto px-2 sm:px-4">
        {/* Toggle Button */}
        <button
          onClick={toggleOpen}
          data-cursor="PHOTOS"
          className="w-full flex items-center justify-between rounded-sm border-2 border-black bg-[#14161F] px-4 py-2.5 font-['Press_Start_2P'] text-[8px] sm:text-[9px] text-[#00F5D4] brutal-shadow-sm hover:border-[#FFE600] transition-colors"
        >
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-[#FFE600]" />
            <span>
              {language === 'id'
                ? `FOTO ARSIP (${visual.characterName} & BOX ART)`
                : `VIEW ARCHIVE PHOTOS (${visual.characterName} & BOX ART)`}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-white" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white" />
          )}
        </button>

        {/* Expandable Photo Gallery Grid */}
        {isOpen && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 p-4 rounded-md border-2 border-black bg-[#14161F] brutal-shadow animate-fade-in">
            {/* Character Photo */}
            <div 
              onClick={handleInspectCharacter}
              className="space-y-2 cursor-pointer group"
              title={language === 'id' ? 'Klik untuk menginspeksi karakter' : 'Click to inspect character'}
            >
              <div className="flex items-center justify-between font-['Press_Start_2P'] text-[8px] text-[#FF2A85]">
                <div className="flex items-center gap-1.5">
                  <User className="h-3 w-3" />
                  <span>HERO: {visual.characterName}</span>
                </div>
                <span className="text-[#00F5D4] flex items-center gap-0.5 group-hover:underline">
                  <ZoomIn className="w-2.5 h-2.5" /> {language === 'id' ? 'INSPEKSI' : 'INSPECT'}
                </span>
              </div>
              <div className="aspect-video sm:aspect-4/3 w-full overflow-hidden rounded border-2 border-black bg-black relative">
                <img
                  src={visual.characterImageUrl}
                  alt={visual.characterName}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <p className="font-['Space_Grotesk'] text-xs text-zinc-300 italic">
                {activeQuote}
              </p>
            </div>

            {/* Game Box Art */}
            <div 
              onClick={handleInspectGame}
              className="space-y-2 cursor-pointer group"
              title={language === 'id' ? 'Klik untuk menginspeksi box art' : 'Click to inspect box art'}
            >
              <div className="flex items-center justify-between font-['Press_Start_2P'] text-[8px] text-[#FFE600]">
                <div className="flex items-center gap-1.5">
                  <Disc className="h-3 w-3" />
                  <span>BOX ART: {visual.boxArtTitle}</span>
                </div>
                <span className="text-[#FFE600] flex items-center gap-0.5 group-hover:underline">
                  <ZoomIn className="w-2.5 h-2.5" /> {language === 'id' ? 'INSPEKSI' : 'INSPECT'}
                </span>
              </div>
              <div className="aspect-video sm:aspect-4/3 w-full overflow-hidden rounded border-2 border-black bg-black relative">
                <img
                  src={visual.boxArtImageUrl}
                  alt={visual.boxArtTitle}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="font-mono text-[11px] text-zinc-400">
                Format: <span className="text-white">{visual.mediaFormat}</span> ({visual.releaseDate})
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Inspection Modal */}
      {inspectData && (
        <ArtifactInspectionModal 
          data={inspectData} 
          onClose={() => setInspectData(null)} 
        />
      )}
    </>
  );
};
