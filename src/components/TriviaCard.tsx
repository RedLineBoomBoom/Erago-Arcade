import { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Share2, 
  Check, 
  Flame, 
  Quote, 
  Zap, 
  Cpu, 
  Calendar, 
  Gamepad2, 
  HelpCircle,
  Globe
} from 'lucide-react';
import type { TriviaItem } from '../types/trivia';
import { sound } from '../audio/soundEngine';
import { useLanguage, translateTag, translateRarity } from '../utils/i18n';
import { useDeepLTranslation } from '../hooks/useDeepLTranslation';

interface TriviaCardProps {
  item: TriviaItem;
  onOpenQuizModal?: () => void;
}

export const TriviaCard: React.FC<TriviaCardProps> = ({ item, onOpenQuizModal }) => {
  const { language, t } = useLanguage();
  const { translatedItem, isTranslating, isDeepLVerified } = useDeepLTranslation(item, language);

  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [reacted, setReacted] = useState(false);
  const [decryptedHeadline, setDecryptedHeadline] = useState(translatedItem.headline);
  const [isScanning, setIsScanning] = useState(true);

  // Digital Decrypt Text Scramble Effect upon card mount/change
  useEffect(() => {
    const scanTimer = setTimeout(() => setIsScanning(false), 950);

    const glyphs = '01✦▲■●01#$%=+/*_ABCDEF0123456789';
    let iteration = 0;
    const final = translatedItem.headline;

    const scrambleInterval = setInterval(() => {
      setDecryptedHeadline(
        final
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return final[index];
            }
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('')
      );

      if (iteration >= final.length) {
        clearInterval(scrambleInterval);
      }
      iteration += Math.max(1, Math.floor(final.length / 10));
    }, 24);

    return () => {
      clearTimeout(scanTimer);
      clearInterval(scrambleInterval);
    };
  }, [translatedItem.id, translatedItem.headline]);


  // 3D Tilt calculation on mouse move using CSS variables (0 React re-renders)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    cardRef.current.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
    cardRef.current.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
    cardRef.current.style.setProperty('--shine-x', `${shineX.toFixed(1)}%`);
    cardRef.current.style.setProperty('--shine-y', `${shineY.toFixed(1)}%`);
    cardRef.current.style.setProperty('--tilt-transition', 'transform 0.05s ease-out');
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rx', '0deg');
    cardRef.current.style.setProperty('--ry', '0deg');
    cardRef.current.style.setProperty('--shine-x', '50%');
    cardRef.current.style.setProperty('--shine-y', '50%');
    cardRef.current.style.setProperty('--tilt-transition', 'transform 0.4s ease-out');
  };

  const handleCopy = async () => {
    sound.playClick();
    const textToCopy = `🎮 ${translatedItem.gameTitle} (${translatedItem.releaseYear}) Trivia:\n"${translatedItem.headline}"\n\n${translatedItem.story}\n\nVia Erago Arcade: ${translatedItem.verifiedFact}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard fallback
    }
  };

  const handleMindblownReact = () => {
    sound.playJackpot();
    setReacted(true);
    setTimeout(() => setReacted(false), 2000);

    // Blast celebratory retro confetti
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF2A85', '#FFE600', '#00F5D4', '#9D4EDD', '#FFFFFF'],
      disableForReducedMotion: true,
    });
  };

  const rarityColorMap: Record<string, string> = {
    'COMMON VINTAGE': 'border-[#00F5D4] text-[#00F5D4] bg-[#00F5D4]/10',
    'RARE COLLECTIBLE': 'border-[#FFE600] text-[#FFE600] bg-[#FFE600]/10',
    'LEGENDARY SECRET': 'border-[#FF2A85] text-[#FF2A85] bg-[#FF2A85]/10',
    'CURSED ANOMALY': 'border-[#9D4EDD] text-[#9D4EDD] bg-[#9D4EDD]/10',
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-2 py-4 sm:px-4 perspective-[1200px]">
      {/* 3D Tilt Card Shell */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          transition: 'var(--tilt-transition, transform 0.4s ease-out)',
          transformStyle: 'preserve-3d',
        }}
        className="relative rounded-lg border-3 border-black bg-[#14161F] brutal-shadow-lg overflow-hidden will-change-transform"
        data-cursor="CARD"
      >
        {/* Holographic Iridescent Reflective Foil Sheen Layer */}
        <div
          className="holo-foil pointer-events-none absolute inset-0 z-20 opacity-40 transition-opacity duration-300 group-hover:opacity-75"
          style={{
            backgroundPosition: 'var(--shine-x, 50%) var(--shine-y, 50%)',
          }}
        />

        {/* Dynamic Light Spotlight following cursor */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: 'radial-gradient(circle 350px at var(--shine-x, 50%) var(--shine-y, 50%), rgba(255, 255, 255, 0.12), transparent 70%)',
          }}
        />


        {/* Holographic Laser Scan Line during ROM read */}
        {isScanning && <div className="animate-laser-scan" />}

        {/* Top Cartridge Header Strip (Memphis Vintage Style) */}
        <div className="relative z-10 flex flex-wrap items-center justify-between border-b-2 border-black bg-[#0B0C10] px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Retro Cartridge Pin Icon */}
            <div className="flex gap-1">
              <span className="h-3 w-1 bg-[#FFE600] rounded-xs"></span>
              <span className="h-3 w-1 bg-[#FF2A85] rounded-xs"></span>
              <span className="h-3 w-1 bg-[#00F5D4] rounded-xs"></span>
            </div>
            <span className="font-['Press_Start_2P'] text-[9px] sm:text-[10px] text-zinc-300 tracking-wider">
              {isScanning ? (
                <span className="text-[#00F5D4] animate-pulse font-bold">
                  {t('card_decrypting')}
                </span>
              ) : (
                <span>{t('card_rom')} {translatedItem.id.toUpperCase()}</span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* DeepL Attribution Badge */}
            {isDeepLVerified && (
              <a
                href="https://www.deepl.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Diterjemahkan dengan DeepL AI (deepl.com)"
                className="flex items-center gap-1 px-2 py-0.5 rounded-xs border border-[#00F5D4]/40 bg-[#0F2B48] text-[#00F5D4] hover:bg-[#00F5D4] hover:text-black font-['Press_Start_2P'] text-[6px] transition-colors shadow-[1px_1px_0px_#000]"
              >
                <Globe className="w-2.5 h-2.5" />
                <span>{isTranslating ? 'DEEPL TRANSLATING...' : 'DEEPL TRANSLATE'}</span>
              </a>
            )}

            {/* Rarity Tier Stamp */}
            <span
              className={`rounded-xs border px-2 py-0.5 font-['Press_Start_2P'] text-[7px] sm:text-[8px] tracking-wider uppercase ${
                rarityColorMap[translatedItem.rarityTier] || 'border-white text-white'
              }`}
            >
              ★ {translateRarity(translatedItem.rarityTier, language)}
            </span>

            {/* Retro Barcode Accent */}
            <div className="hidden sm:flex items-center gap-0.5 opacity-60">
              <div className="h-4 w-1 bg-white"></div>
              <div className="h-4 w-0.5 bg-white"></div>
              <div className="h-4 w-1.5 bg-white"></div>
              <div className="h-4 w-0.5 bg-white"></div>
              <div className="h-4 w-1 bg-white"></div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 space-y-6">
          {/* Metadata Badges & Tags Header */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Game Badge */}
            <div className="flex items-center gap-1.5 rounded-sm border-2 border-black bg-[#FF2A85] px-2.5 py-1 font-['Press_Start_2P'] text-[9px] font-bold text-black brutal-shadow-sm">
              <Gamepad2 className="h-3 w-3" />
              <span>{translatedItem.gameTitle}</span>
            </div>

            {/* Platform / Hardware */}
            <div className="flex items-center gap-1 rounded-sm border-2 border-black bg-[#FFE600] px-2 py-1 font-['Press_Start_2P'] text-[8px] text-black brutal-shadow-sm">
              <Cpu className="h-2.5 w-2.5" />
              <span>{translatedItem.platform}</span>
            </div>

            {/* Release Year */}
            <div className="flex items-center gap-1 rounded-sm border-2 border-black bg-[#00F5D4] px-2 py-1 font-['Press_Start_2P'] text-[8px] text-black brutal-shadow-sm">
              <Calendar className="h-2.5 w-2.5" />
              <span>{translatedItem.releaseYear}</span>
            </div>

            {/* Category Tag */}
            <span className="rounded-sm border-2 border-white/20 bg-white/5 px-2 py-1 font-['Press_Start_2P'] text-[8px] text-zinc-300">
              🏷️ {translateTag(translatedItem.tag, language)}
            </span>
          </div>

          {/* Punchy Headline (Syne Typography with Cyber Decryption) */}
          <h1 className="font-['Syne'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.15] text-white tracking-tight min-h-[1.15em]">
            {decryptedHeadline}
          </h1>

          {/* Deep Dive Story */}
          <div className="relative rounded-sm border-l-4 border-[#FF2A85] bg-black/40 p-4 sm:p-5 text-base sm:text-lg leading-relaxed text-zinc-200">
            <p className="font-['Space_Grotesk'] text-zinc-100 selection:bg-[#FFE600] selection:text-black">
              {translatedItem.story}
            </p>
          </div>

          {/* Quote or Developer Note Callout (if available) */}
          {translatedItem.quoteOrLore && (
            <div className="flex items-start gap-3 rounded-sm border-2 border-black bg-[#FFE600]/10 p-3 sm:p-4 text-xs sm:text-sm text-[#FFE600]">
              <Quote className="h-5 w-5 shrink-0 text-[#FFE600] mt-0.5" />
              <div className="italic font-['Space_Grotesk'] font-medium">
                {translatedItem.quoteOrLore}
              </div>
            </div>
          )}

          {/* Verified Takeaway Box & Mindblown Meter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t-2 border-black pt-4">
            {/* Verified Fact Snippet */}
            <div className="md:col-span-2 rounded-sm border-2 border-black bg-black/50 p-3.5 brutal-shadow-sm">
              <div className="flex items-center gap-1.5 font-['Press_Start_2P'] text-[8px] text-[#00F5D4] uppercase mb-1.5">
                <Zap className="h-3 w-3" />
                <span>{t('card_takeaway')}</span>
              </div>
              <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-zinc-300">
                {translatedItem.verifiedFact}
              </p>
            </div>

            {/* Mindblown Rating Gauge */}
            <div className="rounded-sm border-2 border-black bg-black/50 p-3.5 flex flex-col justify-between brutal-shadow-sm">
              <div className="flex items-center justify-between font-['Press_Start_2P'] text-[8px] text-zinc-400">
                <span>{t('card_mindblown')}</span>
                <span className="text-[#FF2A85]">{translatedItem.mindblownScore}%</span>
              </div>
              {/* Progress Bar */}
              <div className="relative h-3 w-full rounded-xs border border-black bg-zinc-800 overflow-hidden my-2">
                <div
                  className="h-full bg-gradient-to-r from-[#FFE600] via-[#FF2A85] to-[#00F5D4]"
                  style={{ width: `${translatedItem.mindblownScore}%` }}
                />
              </div>
              <span className="text-[10px] text-zinc-400 font-mono text-right">
                {t('card_verified_metric')}
              </span>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-black pt-5">
            {/* Reaction / Confetti Trigger */}
            <button
              onClick={handleMindblownReact}
              data-cursor="MIND=BLOWN"
              className={`flex items-center gap-2 rounded-sm border-2 border-black px-4 py-2 font-['Press_Start_2P'] text-[9px] font-bold transition-all brutal-shadow-sm ${
                reacted
                  ? 'bg-[#FF2A85] text-white scale-105'
                  : 'bg-[#FFE600] text-black hover:bg-[#ffea33] hover:-translate-y-0.5'
              }`}
            >
              <Flame className="h-4 w-4 text-black" />
              <span>{reacted ? t('card_boom') : t('card_mindblown_btn')}</span>
            </button>

            {/* Quiz Mode Prompt (Challenge your memory) */}
            {onOpenQuizModal && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenQuizModal();
                }}
                data-cursor="QUIZ"
                className="flex items-center gap-1.5 rounded-sm border-2 border-black bg-[#00F5D4] px-3.5 py-2 font-['Press_Start_2P'] text-[8px] text-black font-bold brutal-shadow-sm hover:bg-[#20f7dc] transition-transform hover:-translate-y-0.5"
              >
                <HelpCircle className="h-3.5 w-3.5 text-black" />
                <span>{t('card_test_knowledge')}</span>
              </button>
            )}

            {/* Copy / Share Button */}
            <button
              onClick={handleCopy}
              data-cursor="SHARE"
              className="flex items-center gap-1.5 rounded-sm border-2 border-black bg-[#1E2230] px-3.5 py-2 font-['Press_Start_2P'] text-[8px] text-zinc-200 brutal-shadow-sm hover:bg-[#282d40] hover:text-white transition-all"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#00F5D4]" />
                  <span className="text-[#00F5D4]">{t('card_copied')}</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>{t('card_share')}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Cartridge Footer Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t-2 border-black bg-[#0B0C10] px-4 py-2 font-['Press_Start_2P'] text-[7px] text-zinc-500">
          <span>{t('card_developer')} {translatedItem.developer.toUpperCase()}</span>
          {isDeepLVerified && (
            <span className="text-[#00F5D4]/80 hidden sm:inline">
              NEURAL AI TRANSLATION //{' '}
              <a
                href="https://www.deepl.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00F5D4] hover:underline"
              >
                DEEPL.COM
              </a>
            </span>
          )}
          <span>{t('card_genre')} {translatedItem.genre.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
