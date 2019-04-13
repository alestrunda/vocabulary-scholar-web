import {
  GAPI_CLIENT_STATUS_UPDATE,
  GAPI_CONNECTED,
  GAPI_SET_STORE_FILE_ID,
  GAPI_STORE_LOADED_FROM_DRIVE,
} from '../actions/gapi';

const gapi = (state = {}, action) => {
  let isStoreLoadedFromDrive;
  const { payload, type } = action;
  switch (type) {
    case GAPI_CLIENT_STATUS_UPDATE:
      isStoreLoadedFromDrive = payload.isClientSignedIn //reset to false if client signed out
        ? state.isStoreLoadedFromDrive
        : false;
      return {
        ...state,
        isClientSignedIn: payload.isClientSignedIn,
        isStoreLoadedFromDrive,
      };
    case GAPI_CONNECTED:
      return {
        ...state,
        isConnected: true,
      };
    case GAPI_SET_STORE_FILE_ID:
      return {
        ...state,
        storeFileID: payload.storeFileID,
      };
    case GAPI_STORE_LOADED_FROM_DRIVE:
      return {
        ...state,
        isStoreLoadedFromDrive: payload.isStoreLoadedFromDrive,
        storeFileID: payload.storeFileID,
      };
    default:
      return state;
  }
};

export default gapi;
