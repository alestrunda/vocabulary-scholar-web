export const APP_VERSION = '1.0.0';

export const LIST_MAIN_ID = 'main';

export const STORAGE_FILENAME = 'vocabulary-scholar';

export const DATE_FORMAT = 'mmm d. yyyy';

export const WORD_RATINGS_CNT = 5;
export const DEFAULT_LESSON_QUESTIONS_CNT = 30;
export const MIN_WORD_LENGTH_SEARCH = 2;

export const SNACKBAR_HIDE_DURATION = 4000; //ms

export const WEEK_IN_MS = 604800000; //1000 * 60 * 60 * 24 * 7
export const MONTH_IN_MS = 18144000000; //1000 * 60 * 60 * 24 * 7 * 30
export const THREE_MONTHS_IN_MS = 54432000000; //1000 * 60 * 60 * 24 * 7 * 30 * 3

export const ITEMS_PER_PAGE = 10;
export const MAX_PAGINATION_ITEMS_ONE_DIRECTION_TO_SHOW = 4;
export const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50];

export const HINT = {
  AUDIO: 'audio',
  CUSTOM_FIELD: 'custom-field',
  IMAGE: 'image',
  NONE: 'none',
  TRANSLATION: 'translation',
  WORD_FIRST_LETTER: 'word-first-letter',
  WORD_LENGTH: 'word-length',
};

export const HINT_TYPES = [
  { value: HINT.AUDIO, text: 'Audio' },
  { value: HINT.CUSTOM_FIELD, text: 'Custom field' },
  { value: HINT.WORD_FIRST_LETTER, text: 'First letter' },
  { value: HINT.IMAGE, text: 'Image' },
  { value: HINT.NONE, text: 'None' },
  { value: HINT.TRANSLATION, text: 'Translation' },
  { value: HINT.WORD_LENGTH, text: 'Word length' },
];

export const DEFAULT_SORTING_OPTIONS = [
  { title: 'Date added', sortingFuncName: 'date-added' },
  { title: 'Date rated', sortingFuncName: 'date-rated' },
  { title: 'Date viewed', sortingFuncName: 'date-viewed' },
  { title: 'Random', sortingFuncName: 'random' },
  { title: 'Rating', sortingFuncName: 'rating' },
  { title: 'Word', sortingFuncName: 'id' },
];

export const QUESTION = {
  AUDIO: 'audio',
  CUSTOM_FIELD: 'custom-field',
  IMAGE: 'image',
  PHRASE: 'phrase',
  TRANSLATION: 'translation',
  WORD: 'word',
};

export const QUESTION_TYPES = [
  { value: QUESTION.AUDIO, text: 'Audio' },
  { value: QUESTION.CUSTOM_FIELD, text: 'Custom field' },
  { value: QUESTION.IMAGE, text: 'Image' },
  { value: QUESTION.PHRASE, text: 'Phrase' },
  { value: QUESTION.TRANSLATION, text: 'Translation' },
  { value: QUESTION.WORD, text: 'Word' },
];

export const RATE_BY = {
  SELF_RATING: 'self-rating',
  TYPE_IN: 'type-in',
};
