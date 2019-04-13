import { ITEMS_PER_PAGE } from '../constants';
import {
  APP_INFO_MESSAGE,
  APP_LOAD_STATE,
  APP_SET_ITEMS_PER_PAGE,
  APP_SET_LANGUAGE,
  APP_SET_SELECTED_PHRASE,
  APP_STATE_NOT_LOADED,
  APP_STORAGE_TYPE,
  APP_WARNING,
  APP_WARNING_CLOSE,
  APP_WORD_LIST_SET_PAGE,
} from '../actions/app';
import { GAPI_CLIENT_STATUS_UPDATE } from '../actions/gapi';

const initState = {
  language: '',
  infoMessage: '',
  phraseSelected: '',
  wordListsActivePages: {},
  itemsPerPage: ITEMS_PER_PAGE,
};

const app = (state = initState, action) => {
  let newState;
  const { payload, type } = action;
  switch (type) {
    case APP_INFO_MESSAGE:
      return {
        ...state,
        infoMessage: payload.infoMessage,
      };
    case APP_LOAD_STATE:
      return {
        ...state,
        ...payload.stateToLoad.app,
        storageType: payload.storageType,
        isStateLoaded: true,
      };
    case APP_SET_ITEMS_PER_PAGE:
      return {
        ...state,
        itemsPerPage: payload.number,
      };
    case APP_SET_LANGUAGE:
      return {
        ...state,
        language: payload.language,
      };
    case APP_SET_SELECTED_PHRASE:
      return {
        ...state,
        phraseSelected: payload.phrase,
      };
    case APP_STATE_NOT_LOADED:
      return {
        ...state,
        isStateLoaded: false,
      };
    case APP_STORAGE_TYPE:
      return {
        ...state,
        storageType: payload.storageType,
      };
    case APP_WARNING:
      if (state[payload.warningType] === false) return state;
      return {
        ...state,
        warning: payload.warning,
        warningType: payload.warningType,
      };
    case APP_WARNING_CLOSE:
      newState = { ...state };
      delete newState.warning;
      newState[payload.warningType] = false;
      return newState;
    case APP_WORD_LIST_SET_PAGE:
      newState = { ...state };
      newState.wordListsActivePages[payload.listID] = payload.pageNumber;
      return newState;
    case GAPI_CLIENT_STATUS_UPDATE:
      if (payload.isInitial) return state;
      return {
        ...state,
        isStateLoaded: false,
        infoMessage: payload.isClientSignedIn
          ? 'Logged in to Google Drive'
          : 'Logged out from Google Drive',
      };
    default:
      return state;
  }
};

export default app;
