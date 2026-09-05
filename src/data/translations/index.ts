import { TRIVIA_ID_BATCH_1, type TriviaTranslationItem } from './triviaBatch1.id';
import { TRIVIA_ID_BATCH_2 } from './triviaBatch2.id';
import { TRIVIA_ID_BATCH_3 } from './triviaBatch3.id';
import { TRIVIA_ID_BATCH_4 } from './triviaBatch4.id';
import { TRIVIA_ID_BATCH_5 } from './triviaBatch5.id';

export type { TriviaTranslationItem };

export const ALL_TRIVIA_ID_OVERLAYS: Record<string, TriviaTranslationItem> = {
  ...TRIVIA_ID_BATCH_1,
  ...TRIVIA_ID_BATCH_2,
  ...TRIVIA_ID_BATCH_3,
  ...TRIVIA_ID_BATCH_4,
  ...TRIVIA_ID_BATCH_5,
};

export const TOTAL_TRANSLATED_ITEMS = Object.keys(ALL_TRIVIA_ID_OVERLAYS).length;
