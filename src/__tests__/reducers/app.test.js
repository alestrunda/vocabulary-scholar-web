import appReducer from '../../reducers/app';
import { ITEMS_PER_PAGE } from '../../constants';
import {
  appInfoMessage,
  appLoadState,
  appSetSelectedPhrase,
  appStateNotLoaded,
  appStorageType,
  appWarning,
  appWarningClose,
  appWordListSetPage,
} from '../../actions/app';
import { gapiClientStatusUpdate } from '../../actions/gapi';

it('correct app initial state', () => {
  const action = { type: '' }; //passing no action should return initial state
  const initialState = {
    language: '',
    infoMessage: '',
    itemsPerPage: ITEMS_PER_PAGE,
    phraseSelected: '',
    wordListsActivePages: {},
  };
  const defaultState = undefined;

  expect(appReducer(defaultState, action)).toEqual(initialState);
});

it('does not modify state if action not recognized', () => {
  const action = { type: 'unknown', payload: { someProp: 'some value' } };
  const defaultState = {
    testProp: 'test value',
  };

  expect(appReducer(defaultState, action)).toEqual(defaultState);
});

it('handles APP_INFO_MESSAGE', () => {
  const message = 'test message';
  const action = appInfoMessage(message);
  const defaultState = {};

  expect(appReducer(defaultState, action)).toMatchSnapshot();
});

it('handles APP_LOAD_STATE', () => {
  const stateToLoad = {
    app: {},
  };
  const storageType = 'local-storage';
  const action = appLoadState(stateToLoad, storageType);
  const defaultState = {};

  expect(appReducer(defaultState, action)).toMatchSnapshot();
});

it('handles APP_SET_SELECTED_PHRASE', () => {
  const phrase = 'Lorem ipsum';
  const action = appSetSelectedPhrase(phrase);
  const expectedState = {
    phraseSelected: phrase,
  };
  const defaultState = {};

  expect(appReducer(defaultState, action)).toEqual(expectedState);
});

it('handles APP_STATE_NOT_LOADED', () => {
  const action = appStateNotLoaded();
  const expectedState = {
    isStateLoaded: false,
  };
  const defaultState = {};

  expect(appReducer(defaultState, action)).toEqual(expectedState);
});

it('handles APP_STORAGE_TYPE', () => {
  const action = appStorageType('local-storage');
  const defaultState = {};

  expect(appReducer(defaultState, action)).toMatchSnapshot();
});

it('handles APP_WARNING', () => {
  const action = appWarning('something went wrong', 'user-error');
  const defaultState = {};

  expect(appReducer(defaultState, action)).toMatchSnapshot();
});

it('handles APP_WARNING_CLOSE', () => {
  const action = appWarningClose('user-error');
  const defaultState = {};

  expect(appReducer(defaultState, action)).toMatchSnapshot();
});

it('sets active page on APP_WORD_LIST_SET_PAGE', () => {
  const action = appWordListSetPage(5);
  const defaultState = {
    wordListsActivePages: {},
  };

  expect(appReducer(defaultState, action)).toMatchSnapshot();
});

it('updates active page on APP_WORD_LIST_SET_PAGE', () => {
  const listID = 'list1';
  const newPageNumber = 10;
  const action = appWordListSetPage(newPageNumber, listID);
  const defaultState = {
    wordListsActivePages: {},
  };
  defaultState.wordListsActivePages[listID] = 5;

  expect(appReducer(defaultState, action).wordListsActivePages[listID]).toBe(
    newPageNumber
  );
});

it('handles GAPI_CLIENT_STATUS_UPDATE', () => {
  const isClientSignedIn = true,
    isInitial = true;
  const action = gapiClientStatusUpdate(isClientSignedIn, isInitial);
  const defaultState = {};

  expect(appReducer(defaultState, action)).toMatchSnapshot();
});
