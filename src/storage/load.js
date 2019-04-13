import { appLoadState } from '../actions/app';
import { gapiStoreLoadedFromDrive } from '../actions/gapi';
import { gapiGetAppFileID, gapiGetFileContentByID } from '../gapi';
import { storageGet } from './localStorage';
import { STORAGE_FILENAME } from '../constants';
import { getInitState } from './misc';

export const loadStoreFromGoogleDrive = store => {
  let stateFileID;
  gapiGetAppFileID(STORAGE_FILENAME) //get the app file ID
    .then(fileID => {
      if (!fileID) throw new Error('file does not exist');
      stateFileID = fileID;
      return gapiGetFileContentByID(stateFileID); //get file content by the file ID
    })
    .then(res => {
      store.dispatch(gapiStoreLoadedFromDrive(true, stateFileID));
      //if file not empty set its content as the app state
      const storeToLoad = res.body ? JSON.parse(res.body) : getInitState();
      store.dispatch(appLoadState(storeToLoad), 'google-drive');
    })
    .catch(() => {
      //no need to show error message - getting here just means app has no data on drive yet
      store.dispatch(gapiStoreLoadedFromDrive(true));
      store.dispatch(appLoadState(getInitState()), 'google-drive');
    });
};

export const loadStoreFromLocalStorage = store => {
  //load state from local storage, if nothing loaded set init state
  let storeToLoad = getStateLocalStorage();
  if (!storeToLoad) storeToLoad = getInitState();
  store.dispatch(appLoadState(storeToLoad, 'local-storage'));
};

export const getStateLocalStorage = () => {
  const state = storageGet(STORAGE_FILENAME);
  return state === undefined ? getInitState() : state;
};
