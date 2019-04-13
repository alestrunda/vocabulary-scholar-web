import { checkWordIDsMatch, sortWords } from '../misc';
import { APP_LOAD_STATE } from '../actions/app';
import {
  LIST_CREATE,
  LIST_REMOVE,
  LIST_VIEW,
  LIST_SET_WORDS,
  LIST_SORT,
  LIST_SORT_RESET,
  LISTS_DELETE,
  LISTS_IMPORT,
} from '../actions/list';
import { WORD_LIST_SELECTED, WORD_SET_FAVORITE } from '../actions/word';

/** List structure
 * id: '1',
 * name: 'List name',
 * wordIDs: ['word1', 'word2'],
 * dateCreated: 1544482800000,
 * dateViewed: 1532028111990
 */

const initState = [];

const lists = (state = initState, action) => {
  let forceResort,
    list,
    listsToImport,
    listsToImportIDs,
    newLists,
    originalLists,
    targetList,
    wordIndex;
  const { payload, type } = action;
  switch (type) {
    case APP_LOAD_STATE:
      return payload.stateToLoad.lists;
    case LIST_CREATE:
      return [
        ...state,
        {
          id: payload.id,
          name: payload.name,
          wordIDs: payload.wordIDs,
          dateCreated: payload.dateCreated,
        },
      ];
    case LIST_REMOVE:
      return state.filter(list => list.id !== payload.listID);
    case LIST_VIEW:
      newLists = [...state];
      //cannot use array.find because that would return new item, we want the modyfied item to stay inside the array, so it can be simply returned
      for (list of newLists) {
        if (list.id === payload.listID) {
          targetList = list;
          break;
        }
      }
      if (!targetList) return state;
      targetList.dateViewed = payload.dateViewed;
      return newLists;
    case LIST_SET_WORDS:
      newLists = [...state];
      //cannot use array.find because that would return new item, we want the modyfied item to stay inside the array, so it can be simply returned
      for (list of newLists) {
        if (list.id === payload.listID) {
          targetList = list;
          break;
        }
      }
      if (!targetList) return state;
      targetList.wordIDs = [...payload.selectedWordIDs];
      targetList.wordIDsSorted = null; //words in list changed, sorting needs to be reseted
      return newLists;
    case LIST_SORT:
      newLists = [...state];
      //cannot use array.find because that would return new item, we want the modyfied item to stay inside the array, so it can be simply returned
      for (list of newLists) {
        if (list.id === payload.listID) {
          targetList = list;
          break;
        }
      }
      if (!targetList) return state;

      forceResort = payload.forceResort;

      //check if last sorting is still actual
      if (
        !forceResort &&
        !checkWordIDsMatch(targetList.wordIDsSorted || [], targetList.wordIDs)
      )
        forceResort = true;

      //do not resort when sorting settings haven't changed
      if (
        !forceResort &&
        targetList.sortBy === payload.sortBy &&
        targetList.isDescSort === payload.isDescSort
      )
        return state;

      targetList.wordIDsSorted = sortWords(
        payload.words,
        payload.sortBy,
        payload.isDescSort
      ).map(word => word.id);
      targetList.sortBy = payload.sortBy;
      targetList.isDescSort = payload.isDescSort;
      return newLists;
    case LIST_SORT_RESET:
      newLists = [...state];
      //cannot use array.find because that would return new item, we want the modyfied item to stay inside the array, so it can be simply returned
      for (list of newLists) {
        if (list.id === payload.listID) {
          targetList = list;
          break;
        }
      }
      if (!targetList) return state;
      delete targetList.wordIDsSorted;
      return newLists;
    case LISTS_DELETE:
      return initState;
    case LISTS_IMPORT:
      //set new dateCreated
      listsToImport = payload.lists.map(list => {
        list.dateCreated = payload.dateCreated;
        return list;
      });
      //filter out all lists where ID would collide with the imported lists
      listsToImportIDs = listsToImport.map(list => list.id);
      originalLists = state.filter(list => !listsToImportIDs.includes(list.id));
      return [...originalLists, ...listsToImport];
    case WORD_LIST_SELECTED: //add word id to list
      newLists = [...state];
      //cannot use array.find because that would return new item, we want the modyfied item to stay inside the array, so it can be simply returned
      for (list of newLists) {
        if (list.id === payload.listID) {
          targetList = list;
          break;
        }
      }
      if (!targetList) return state;
      targetList.wordIDs = [...targetList.wordIDs]; //clone the original array co it can be mutated
      wordIndex = targetList.wordIDs.indexOf(payload.wordID);
      if (wordIndex > -1) targetList.wordIDs.splice(wordIndex, 1);
      else targetList.wordIDs.push(payload.wordID);
      targetList.wordIDsSorted = null; //words in list changed, sorting needs to be reseted
      return newLists;
    case WORD_SET_FAVORITE:
      //if word removed from favorites, make sure it's removed also from all lists
      if (payload.isSettingAsFavorite) return state;
      return state.map(list => ({
        ...list,
        wordIDs: list.wordIDs.filter(wordID => wordID !== payload.wordID),
      }));
    default:
      return state;
  }
};

export default lists;
