export const GAPI_CLIENT_STATUS_UPDATE = 'GAPI_CLIENT_STATUS_UPDATE',
  GAPI_CONNECTED = 'GAPI_CONNECTED',
  GAPI_SET_STORE_FILE_ID = 'GAPI_SET_STORE_FILE_ID',
  GAPI_STORE_LOADED_FROM_DRIVE = 'GAPI_STORE_LOADED_FROM_DRIVE';

export const gapiClientStatusUpdate = (isClientSignedIn, isInitial) => ({
  type: GAPI_CLIENT_STATUS_UPDATE,
  payload: { isClientSignedIn, isInitial },
});

export const gapiConnected = () => ({
  type: GAPI_CONNECTED,
});

export const gapiSetStoreFileID = storeFileID => ({
  type: GAPI_SET_STORE_FILE_ID,
  payload: { storeFileID },
});

export const gapiStoreLoadedFromDrive = (
  isStoreLoadedFromDrive,
  storeFileID
) => ({
  type: GAPI_STORE_LOADED_FROM_DRIVE,
  payload: { isStoreLoadedFromDrive, storeFileID },
});
