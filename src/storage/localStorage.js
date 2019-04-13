/*global localStorage*/
import { processDataFromStoreToSave } from './misc';
import { STORAGE_FILENAME } from '../constants';

export const storageSet = (key, content) => {
  try {
    localStorage.setItem(key, content);
  } catch (e) {
    return e;
  }
};

export const storageGet = key => {
  let ret;
  try {
    ret = localStorage.getItem(key);
    if (ret === null) return undefined;
  } catch (e) {
    return undefined;
  }
  return JSON.parse(ret);
};

export const saveStateFile = state =>
  storageSet(
    //save to local storage
    STORAGE_FILENAME,
    processDataFromStoreToSave(state)
  );
