import { appInfoMessage, appWarning } from '../actions/app';
import { gapiSetStoreFileID } from '../actions/gapi';
import { gapiCreateAppFile, gapiSignOut, gapiUpdateFile } from '../gapi';
import { saveStateFile as saveStateToLocalStorage } from './localStorage';
import {
  hasDataChanged,
  getPartsOfStoreToSave,
  processDataFromStoreToSave,
} from './misc';
import { STORAGE_FILENAME } from '../constants';

let lastSavedData = {};

export const saveStoreToLocalStorage = store => {
  const storeState = store.getState();

  //don't save if data hasn't changed
  const dataToSave = getPartsOfStoreToSave(storeState, false);
  if (!hasDataChanged(dataToSave, lastSavedData)) {
    lastSavedData = dataToSave;
    return;
  }
  lastSavedData = dataToSave;

  const result = saveStateToLocalStorage(storeState);
  if (result !== undefined) {
    const warningType = 'localStorageSave';
    if (storeState.app[warningType] === false) return;
    store.dispatch(
      appWarning(
        "Cannot save to local storage. All changes will be lost after closing the browser's window.",
        warningType
      )
    );
  }
};

export const saveStoreToGoogleDrive = store => {
  const storeState = store.getState();

  //don't save if data hasn't changed
  const dataToSave = getPartsOfStoreToSave(storeState, false);
  if (!hasDataChanged(dataToSave, lastSavedData)) {
    lastSavedData = dataToSave;
    return;
  }
  lastSavedData = dataToSave;

  if (storeState.gapi.storeFileID) {
    //update app file with current store data
    gapiUpdateFile(
      storeState.gapi.storeFileID,
      processDataFromStoreToSave(storeState)
    )
      .then(() => {
        //file successfully updated, no action needed
      })
      .catch(() => {
        const warningType = 'googleDriveUpdate';
        store.dispatch(
          appWarning(
            'Cannot write to Google Drive. Your google account has been signed out to prevent recurring errors.',
            warningType
          )
        );
        gapiSignOut();
      });
  } else {
    //google drive init - create empty file that will hold the state
    gapiCreateAppFile(STORAGE_FILENAME)
      .then(file => {
        store.dispatch(gapiSetStoreFileID(file.result.id));
        store.dispatch(
          appInfoMessage('Synchronization with Google Drive ready')
        );
      })
      .catch(() => {
        const warningType = 'googleDriveCreate';
        store.dispatch(
          appWarning(
            'Cannot write to Google Drive. Your google account has been signed out to prevent recurring errors.',
            warningType
          )
        );
        gapiSignOut();
      });
  }
};
