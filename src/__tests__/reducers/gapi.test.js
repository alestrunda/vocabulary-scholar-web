import gapiReducer from '../../reducers/gapi';
import {
  gapiClientStatusUpdate,
  gapiConnected,
  gapiSetStoreFileID,
  gapiStoreLoadedFromDrive,
} from '../../actions/gapi';

it('correct gapi initial state', () => {
  const action = { type: '' }; //passing no action should return initial state
  const initialState = {};
  const defaultState = undefined;

  expect(gapiReducer(defaultState, action)).toEqual(initialState);
});

it('handles GAPI_CLIENT_STATUS_UPDATE', () => {
  const isClientSignedIn = true,
    isInitial = true;
  const action = gapiClientStatusUpdate(isClientSignedIn, isInitial);
  const defaultState = {};

  expect(gapiReducer(defaultState, action)).toMatchSnapshot();
});

it('handles GAPI_CONNECTED', () => {
  const action = gapiConnected();
  const expectedState = {
    isConnected: true,
  };
  const defaultState = {};

  expect(gapiReducer(defaultState, action)).toEqual(expectedState);
});

it('handles GAPI_SET_STORE_FILE_ID', () => {
  const storeFileID = 'abc123';
  const action = gapiSetStoreFileID(storeFileID);
  const defaultState = {};

  expect(gapiReducer(defaultState, action)).toMatchSnapshot();
});

it('handles GAPI_STORE_LOADED_FROM_DRIVE', () => {
  const isStoreLoadedFromDrive = true,
    storeFileID = 'abc123';
  const action = gapiStoreLoadedFromDrive(isStoreLoadedFromDrive, storeFileID);
  const defaultState = {};

  expect(gapiReducer(defaultState, action)).toMatchSnapshot();
});
