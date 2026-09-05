import { useState, useEffect, useCallback } from 'react';
import type { TriviaItem } from '../types/trivia';
import type { Language } from '../utils/i18n';
import { getTranslatedTrivia, TRIVIA_ID_OVERLAYS } from '../utils/i18n';
import { deepLService } from '../services/deepLService';

export interface DeepLTranslationResult {
  translatedItem: TriviaItem;
  isTranslating: boolean;
  isDeepLVerified: boolean;
  error: string | null;
  retranslate: () => Promise<void>;
}

export function useDeepLTranslation(item: TriviaItem, language: Language): DeepLTranslationResult {
  const [dynamicItem, setDynamicItem] = useState<TriviaItem | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prevId, setPrevId] = useState<string>(item.id);
  const [prevLang, setPrevLang] = useState<Language>(language);

  // Reset dynamic state on item or language change
  if (item.id !== prevId || language !== prevLang) {
    setPrevId(item.id);
    setPrevLang(language);
    setDynamicItem(null);
  }

  const hasCurated = Boolean(TRIVIA_ID_OVERLAYS[item.id]);

  useEffect(() => {
    if (language === 'en' || hasCurated) {
      return;
    }

    let isMounted = true;
    const timer = setTimeout(() => {
      setIsTranslating(true);
      deepLService
        .translateTrivia(item, 'id')
        .then((result) => {
          if (isMounted) {
            setDynamicItem(result);
            setIsTranslating(false);
          }
        })
        .catch((err: unknown) => {
          if (isMounted) {
            setError(err instanceof Error ? err.message : 'DeepL translation failed');
            setIsTranslating(false);
          }
        });
    }, 10);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [item, language, hasCurated]);

  const retranslate = useCallback(async () => {
    if (language === 'en') return;
    setIsTranslating(true);
    try {
      const result = await deepLService.translateTrivia(item, 'id');
      setDynamicItem(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'DeepL re-translation failed');
    } finally {
      setIsTranslating(false);
    }
  }, [item, language]);

  const translatedItem = dynamicItem ?? getTranslatedTrivia(item, language);

  return {
    translatedItem,
    isTranslating,
    isDeepLVerified: language === 'id',
    error,
    retranslate,
  };
}

export default useDeepLTranslation;
