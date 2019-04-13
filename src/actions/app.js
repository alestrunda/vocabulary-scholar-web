export const APP_INFO_MESSAGE = 'APP_INFO_MESSAGE',
  APP_LOAD_STATE = 'APP_LOAD_STATE',
  APP_SET_ITEMS_PER_PAGE = 'APP_SET_ITEMS_PER_PAGE',
  APP_SET_LANGUAGE = 'APP_SET_LANGUAGE',
  APP_SET_SELECTED_PHRASE = 'APP_SET_SELECTED_PHRASE',
  APP_STATE_NOT_LOADED = 'APP_STATE_NOT_LOADED',
  APP_STORAGE_TYPE = 'APP_STORAGE_TYPE',
  APP_WARNING = 'APP_WARNING',
  APP_WARNING_CLOSE = 'APP_WARNING_CLOSE',
  APP_WORD_LIST_SET_PAGE = 'APP_WORD_LIST_SET_PAGE';

export const appInfoMessage = infoMessage => ({
  type: APP_INFO_MESSAGE,
  payload: { infoMessage },
});

export const appLoadState = (stateToLoad, storageType) => ({
  type: APP_LOAD_STATE,
  payload: { stateToLoad, storageType },
});

export const appSetItemsPerPage = number => ({
  type: APP_SET_ITEMS_PER_PAGE,
  payload: { number },
});

export const appSetLanguage = language => ({
  type: APP_SET_LANGUAGE,
  payload: { language },
});

export const appSetSelectedPhrase = phrase => ({
  type: APP_SET_SELECTED_PHRASE,
  payload: { phrase },
});

export const appStateNotLoaded = () => ({
  type: APP_STATE_NOT_LOADED,
});

export const appStorageType = storageType => ({
  type: APP_STORAGE_TYPE,
  payload: { storageType },
});

export const appWarning = (warning, warningType) => ({
  type: APP_WARNING,
  payload: { warning, warningType },
});

export const appWarningClose = warningType => ({
  type: APP_WARNING_CLOSE,
  payload: { warningType },
});

export const appWordListSetPage = (pageNumber, listID) => ({
  type: APP_WORD_LIST_SET_PAGE,
  payload: { pageNumber, listID },
});
