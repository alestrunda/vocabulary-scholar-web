import { checkWordIDsMatch, sortWords } from '../misc';
import { APP_LOAD_STATE } from '../actions/app';
import { LIST_SORT, LIST_SORT_RESET } from '../actions/list';

const initState = {
  main: {
    id: 'main',
    name: 'All',
    wordIDs: [],
  },
  'not-rated': {
    id: 'not-rated',
    name: 'Not rated',
    wordIDs: [],
  },
  'rating-1': {
    id: 'rating-1',
    name: 'Rating 1',
    wordIDs: [],
  },
  'rating-2': {
    id: 'rating-2',
    name: 'Rating 2',
    wordIDs: [],
  },
  'rating-3': {
    id: 'rating-3',
    name: 'Rating 3',
    wordIDs: [],
  },
  'rating-4': {
    id: 'rating-4',
    name: 'Rating 4',
    wordIDs: [],
  },
  'rating-5': {
    id: 'rating-5',
    name: 'Rating 5',
    wordIDs: [],
  },
  'view-week': {
    id: 'view-week',
    name: 'Viewed in last week',
    wordIDs: [],
  },
  'view-month': {
    id: 'view-month',
    name: 'Viewed in last month',
    wordIDs: [],
  },
  'view-three-months': {
    id: 'view-three-months',
    name: 'Viewed in last 3 months',
    wordIDs: [],
  },
  'add-week': {
    id: 'add-week',
    name: 'Added in last week',
    wordIDs: [],
  },
  'add-month': {
    id: 'add-month',
    name: 'Added in last month',
    wordIDs: [],
  },
  'add-three-months': {
    id: 'add-three-months',
    name: 'Added in last 3 months',
    wordIDs: [],
  },
};

const listsPredefined = (state = initState, action) => {
  let forceResort, newLists, targetList;
  const { payload, type } = action;
  switch (type) {
    case APP_LOAD_STATE:
      delete state.main.wordIDsSorted;
      return state;
    case LIST_SORT:
      newLists = { ...state };
      targetList = newLists[payload.listID];
      if (!targetList) return state;

      forceResort = payload.forceResort;

      //check if last sorting is still actual
      if (
        !forceResort &&
        !checkWordIDsMatch(
          targetList.wordIDsSorted || [],
          payload.words.map(word => word.id)
        )
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
      newLists = { ...state };
      targetList = newLists[payload.listID];
      if (!targetList) return state;
      delete targetList.wordIDsSorted;
      return newLists;
    default:
      return state;
  }
};

export default listsPredefined;
