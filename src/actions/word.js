import uniqid from 'uniqid';

export const WORD_ADD_PHRASE = 'WORD_ADD_PHRASE',
  WORD_EDIT_PHRASE = 'WORD_EDIT_PHRASE',
  WORD_LIST_SELECTED = 'WORD_LIST_SELECTED',
  WORD_REMOVE_PHRASE = 'WORD_REMOVE_PHRASE',
  WORD_SET_CUSTOM_FIELD = 'WORD_SET_CUSTOM_FIELD',
  WORD_SET_FAVORITE = 'WORD_SET_FAVORITE',
  WORD_SET_IMAGE_SRC = 'WORD_SET_IMAGE_SRC',
  WORD_SET_AUDIO_SRC = 'WORD_SET_AUDIO_SRC',
  WORD_SET_RATING = 'WORD_SET_RATING',
  WORD_VIEW = 'WORD_VIEW',
  WORDS_DELETE = 'WORDS_DELETE',
  WORDS_IMPORT = 'WORDS_IMPORT';

export const wordAddPhrase = ({
  id = uniqid(),
  wordID,
  phrase,
  startIndex,
  endIndex,
} = {}) => ({
  type: WORD_ADD_PHRASE,
  payload: { id, wordID, phrase, startIndex, endIndex },
});

export const wordEditPhrase = ({
  wordID,
  phraseID,
  phrase,
  startIndex,
  endIndex,
} = {}) => ({
  type: WORD_EDIT_PHRASE,
  payload: { wordID, phraseID, phrase, startIndex, endIndex },
});

export const wordListSelected = (wordID, listID) => ({
  type: WORD_LIST_SELECTED,
  payload: { wordID, listID },
});

export const wordRemovePhrase = (wordID, phraseID) => ({
  type: WORD_REMOVE_PHRASE,
  payload: { wordID, phraseID },
});

export const wordSetCustomField = (wordID, customField) => ({
  type: WORD_SET_CUSTOM_FIELD,
  payload: { wordID, customField },
});

export const wordSetFavorite = ({
  dateAdded = new Date().getTime(),
  wordID,
  word,
  isSettingAsFavorite = false,
} = {}) => ({
  type: WORD_SET_FAVORITE,
  payload: { wordID, dateAdded, word, isSettingAsFavorite },
});

export const wordSetImageSrc = (wordID, imageSrc) => ({
  type: WORD_SET_IMAGE_SRC,
  payload: { wordID, imageSrc },
});

export const wordSetAudioSrc = (wordID, audioSrc) => ({
  type: WORD_SET_AUDIO_SRC,
  payload: { wordID, audioSrc },
});

export const wordSetRating = ({
  wordID,
  rating,
  dateRated = new Date().getTime(),
} = {}) => ({
  type: WORD_SET_RATING,
  payload: { wordID, rating, dateRated },
});

export const wordView = (wordID, dateViewed = new Date().getTime()) => ({
  type: WORD_VIEW,
  payload: { wordID, dateViewed },
});

export const wordsDelete = () => ({
  type: WORDS_DELETE,
});

export const wordsImport = (words, dateAdded = new Date().getTime()) => ({
  type: WORDS_IMPORT,
  payload: { words, dateAdded },
});
