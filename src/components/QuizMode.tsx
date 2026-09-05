import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RefreshCw, CheckCircle, XCircle, Gamepad2 } from 'lucide-react';
import type { TriviaItem } from '../types/trivia';
import { sound } from '../audio/soundEngine';
import { unlockAchievement } from '../utils/achievements';
import { currencyManager } from '../utils/currencyManager';
import { useLanguage, getTranslatedTrivia } from '../utils/i18n';

interface QuizModeProps {
  triviaList: TriviaItem[];
  onBackToArcade: () => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ triviaList, onBackToArcade }) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  const rawItem = triviaList[currentIndex];
  const currentItem = getTranslatedTrivia(rawItem, language);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === currentItem.quizAnswerIndex;

    if (isCorrect) {
      sound.playCorrect();
      unlockAchievement('QUIZ_MASTER');
      const points = 100 * (streak + 1);
      currencyManager.convertPoints(points, 'QUIZ_MODE');

      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);

      if (streak >= 2) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#FFE600', '#00F5D4', '#FF2A85'],
        });
      }
    } else {
      sound.playError();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sound.playClick();
    setIsAnswered(false);
    setSelectedOption(null);
    setCurrentIndex((prev) => (prev + 1) % triviaList.length);
  };

  const handleReset = () => {
    sound.playCoin();
    setScore(0);
    setStreak(0);
    setIsAnswered(false);
    setSelectedOption(null);
    setCurrentIndex(0);
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 space-y-6">
      {/* Quiz HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border-3 border-black bg-[#14161F] p-4 brutal-shadow">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-[#FFE600] border-2 border-black">
            <Trophy className="h-6 w-6 text-black" />
          </div>
          <div>
            <span className="font-['Press_Start_2P'] text-[8px] text-zinc-400">
              {language === 'id' ? 'TANTANGAN ARCADE' : 'ARCADE CHALLENGE'}
            </span>
            <div className="font-['Press_Start_2P'] text-sm sm:text-base text-[#FFE600]">
              {language === 'id' ? 'SKOR:' : 'SCORE:'} {score.toLocaleString()} {language === 'id' ? 'POIN' : 'PTS'}
            </div>
          </div>
        </div>

        {/* Streak Multiplier */}
        <div className="flex items-center gap-2">
          <div className="rounded-sm border-2 border-black bg-[#FF2A85] px-3 py-1 font-['Press_Start_2P'] text-[9px] font-bold text-black brutal-shadow-sm">
            {language === 'id' ? 'UNTUN:' : 'STREAK:'} {streak}X 🔥
          </div>
          <button
            onClick={handleReset}
            title={language === 'id' ? 'Reset Kuis' : 'Reset Quiz'}
            className="flex h-8 w-8 items-center justify-center rounded-sm border-2 border-black bg-white/10 hover:bg-white/20 text-zinc-300"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Quiz Question Card */}
      <div className="relative rounded-lg border-3 border-black bg-[#14161F] p-6 sm:p-8 brutal-shadow-lg space-y-6">
        {/* Game reference */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-[#00F5D4]" />
            <span className="font-['Press_Start_2P'] text-[9px] text-[#00F5D4]">
              {currentItem.gameTitle} ({currentItem.releaseYear})
            </span>
          </div>
          <span className="font-['Press_Start_2P'] text-[8px] text-zinc-400">
            {language === 'id' ? 'PERTANYAAN #' : 'QUESTION #'}{currentIndex + 1}/{triviaList.length}
          </span>
        </div>

        {/* Question Title */}
        <h2 className="font-['Syne'] text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug">
          {currentItem.quizQuestion}
        </h2>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {currentItem.quizOptions.map((opt, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isCorrectAnswer = idx === currentItem.quizAnswerIndex;
            const isUserChoice = idx === selectedOption;

            let buttonStyle = 'bg-black/40 border-black text-zinc-200 hover:bg-white/5 hover:border-[#FFE600]';

            if (isAnswered) {
              if (isCorrectAnswer) {
                buttonStyle = 'bg-[#38B000] border-black text-black font-bold brutal-shadow-sm';
              } else if (isUserChoice) {
                buttonStyle = 'bg-[#FF2A85] border-black text-black font-bold';
              } else {
                buttonStyle = 'bg-black/20 border-black/40 text-zinc-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full flex items-center justify-between rounded-md border-2 p-4 text-left font-['Space_Grotesk'] text-sm sm:text-base transition-all ${buttonStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xs border-2 border-black bg-[#FFE600] font-['Press_Start_2P'] text-[9px] font-bold text-black">
                    {letter}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && isCorrectAnswer && (
                  <CheckCircle className="h-5 w-5 text-black shrink-0" />
                )}
                {isAnswered && isUserChoice && !isCorrectAnswer && (
                  <XCircle className="h-5 w-5 text-black shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Banner on Answer */}
        {isAnswered && (
          <div className="rounded-sm border-2 border-black bg-black/60 p-4 space-y-2 brutal-shadow-sm animate-fade-in">
            <div className="flex items-center gap-2 font-['Press_Start_2P'] text-[9px]">
              {selectedOption === currentItem.quizAnswerIndex ? (
                <span className="text-[#38B000]">
                  {language === 'id' ? `BENAR! +${100 * streak} POIN` : `CORRECT! +${100 * streak} PTS`}
                </span>
              ) : (
                <span className="text-[#FF2A85]">
                  {language === 'id' ? 'JAWABAN SALAH!' : 'WRONG ANSWER!'}
                </span>
              )}
            </div>
            <p className="font-['Space_Grotesk'] text-xs sm:text-sm text-zinc-300">
              {currentItem.quizExplanation}
            </p>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between border-t-2 border-black pt-4">
          <button
            onClick={onBackToArcade}
            className="font-['Press_Start_2P'] text-[8px] text-zinc-400 hover:text-white"
          >
            {language === 'id' ? '← KEMBALI KE PUTARAN' : '← BACK TO ROULETTE'}
          </button>

          {isAnswered && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 rounded-sm border-2 border-black bg-[#FFE600] px-5 py-2.5 font-['Press_Start_2P'] text-[9px] font-bold text-black brutal-shadow-sm hover:bg-[#ffea33] hover:-translate-y-0.5 transition-transform"
            >
              <span>{language === 'id' ? 'PERTANYAAN BERIKUTNYA' : 'NEXT QUESTION'}</span>
              <span>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

