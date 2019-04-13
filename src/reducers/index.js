import { combineReducers } from 'redux';
import app from './app';
import gapi from './gapi';
import lessons from './lessons';
import lessonsAnonymous from './lessonsAnonymous';
import lists from './lists';
import listsPredefined from './listsPredefined';
import words from './words';

export default combineReducers({
  app,
  gapi,
  lessons,
  lessonsAnonymous,
  lists,
  listsPredefined,
  words,
});
