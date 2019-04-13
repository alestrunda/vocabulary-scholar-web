import { saveStoreToLocalStorage, saveStoreToGoogleDrive } from './save';
import { loadStoreFromGoogleDrive, loadStoreFromLocalStorage } from './load';
import { APP_VERSION } from '../constants';

export const loadStore = store => {
  const storeState = store.getState();
  if (storeState.gapi.isClientSignedIn === undefined) return; //wait for google api to load first
  if (storeState.app.isStateLoaded) return;
  //try to load from google drive first, if not connected load from local storage
  if (storeState.gapi.isClientSignedIn) loadStoreFromGoogleDrive(store);
  else loadStoreFromLocalStorage(store);
};

export const saveStore = store => {
  const storeState = store.getState();
  storeState.app.version = APP_VERSION;
  if (!storeState.app.isStateLoaded) return; //saving when state is not loaded yet would clear saved data
  if (
    storeState.gapi.isClientSignedIn &&
    storeState.gapi.isStoreLoadedFromDrive
  ) {
    saveStoreToGoogleDrive(store);
  } else if (!storeState.gapi.isClientSignedIn) {
    //save to local storage
    saveStoreToLocalStorage(store);
  }
};
