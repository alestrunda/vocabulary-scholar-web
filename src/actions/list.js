import uniqid from 'uniqid';

export const LIST_CREATE = 'LIST_CREATE',
  LIST_REMOVE = 'LIST_REMOVE',
  LIST_SET_WORDS = 'LIST_SET_WORDS',
  LIST_SORT = 'LIST_SORT',
  LIST_SORT_RESET = 'LIST_SORT_RESET',
  LIST_VIEW = 'LIST_VIEW',
  LISTS_DELETE = 'LISTS_DELETE',
  LISTS_IMPORT = 'LISTS_IMPORT';

export const listCreate = ({
  id = uniqid(),
  name = '',
  wordIDs = [],
  dateCreated = new Date().getTime(),
} = {}) => ({
  type: LIST_CREATE,
  payload: { id, name, wordIDs, dateCreated },
});

export const listRemove = listID => ({
  type: LIST_REMOVE,
  payload: { listID },
});

export const listSetWords = (listID, selectedWordIDs) => ({
  type: LIST_SET_WORDS,
  payload: { listID, selectedWordIDs },
});

export const listSort = (
  listID,
  sortBy,
  isDescSort,
  words,
  forceResort = false
) => ({
  type: LIST_SORT,
  payload: { forceResort, listID, sortBy, isDescSort, words },
});

export const listSortReset = listID => ({
  type: LIST_SORT_RESET,
  payload: { listID },
});

export const listView = (listID, dateViewed = new Date().getTime()) => ({
  type: LIST_VIEW,
  payload: { listID, dateViewed },
});

export const listsDelete = () => ({
  type: LISTS_DELETE,
});

export const listsImport = (lists, dateCreated = new Date().getTime()) => ({
  type: LISTS_IMPORT,
  payload: { lists, dateCreated },
});
