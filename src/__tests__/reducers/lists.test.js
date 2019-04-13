/*global describe, expect, it*/
import listsReducer from '../../reducers/lists';
import { appLoadState } from '../../actions/app';
import {
  listCreate,
  listRemove,
  listView,
  listSetWords,
  listSort,
  listSortReset,
  listsDelete,
  listsImport,
} from '../../actions/list';
import { wordListSelected } from '../../actions/word';

it('correct app initial state', () => {
  const action = { type: '' }; //passing no action should return initial state
  const initialState = [];
  const defaultState = undefined;

  expect(listsReducer(defaultState, action)).toEqual(initialState);
});

it('does not modify state if action not recognized', () => {
  const action = { type: 'unknown', payload: { someProp: 'some value' } };
  const defaultState = [
    {
      testProp: 'test value',
    },
  ];

  expect(listsReducer(defaultState, action)).toEqual(defaultState);
});

describe('APP_LOAD_STATE', () => {
  it('handles APP_LOAD_STATE', () => {
    const stateToLoad = {
        lists: ['data'],
      },
      storageType = 'local-storage';
    const action = appLoadState(stateToLoad, storageType);
    const defaultState = [];

    expect(listsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LIST_CREATE', () => {
  it('handles LIST_CREATE', () => {
    const action = listCreate({
      id: 'fg4af65g4adfg',
      listName: 'list name',
      dateCreated: 1532028111990,
    });
    const defaultState = [];

    expect(listsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LIST_REMOVE', () => {
  it('handles LIST_REMOVE', () => {
    const listID = 'abc123';
    const action = listRemove(listID);
    const defaultState = [{ id: listID, listName: 'list name' }];

    expect(listsReducer(defaultState, action).length).toBe(0);
  });
});

describe('LIST_VIEW', () => {
  it('handles LIST_VIEW', () => {
    const listID = 'abc123',
      dateViewed = 1532028111990;
    const list = {
      id: listID,
      listName: 'list name',
      dateViewed,
    };
    const action = listView(listID, dateViewed);
    const defaultState = [list];

    expect(listsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LIST_SET_WORDS', () => {
  it('handles LIST_SET_WORDS', () => {
    const listID = 'abc123',
      selectedWordIDs = ['1', '2', '3', '4'];
    const list = {
      id: listID,
      listName: 'list name',
      wordIDs: [],
    };
    const action = listSetWords(listID, selectedWordIDs);
    const defaultState = [list];

    expect(listsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LIST_SORT', () => {
  it('handles LIST_SORT', () => {
    const listID = 'abc123',
      sortBy = 'rating',
      isDescSort = false;
    const words = ['word1', 'word2'];
    const list = {
      id: listID,
      listName: 'list name',
      wordIDs: ['1', '2', '3', '4'],
    };
    const action = listSort(listID, sortBy, isDescSort, words);
    const defaultState = [list];

    expect(listsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LIST_SORT_RESET', () => {
  it('handles LIST_SORT_RESET', () => {
    const listID = 'abc123';
    const list = {
      id: listID,
      listName: 'list name',
      wordIDs: ['1', '2', '3', '4'],
      wordIDsSorted: ['1', '2', '3', '4'],
      sortBy: 'rating',
      isDescSort: false,
    };
    const action = listSortReset(listID);
    const defaultState = [list];

    expect(listsReducer(defaultState, action)[0].wordIDsSorted).toBe(undefined);
  });
});

describe('LISTS_DELETE', () => {
  it('handles LISTS_DELETE', () => {
    const lists = [
      {
        id: 'qwe',
        listName: 'list name',
        wordIDs: ['1', '2'],
      },
      {
        id: 'abc',
        listName: 'list 2 name',
        wordIDs: ['2', '3'],
      },
    ];
    const action = listsDelete();
    const defaultState = lists;

    expect(listsReducer(defaultState, action).length).toBe(0);
  });
});

describe('LISTS_IMPORT', () => {
  it('handles LISTS_IMPORT', () => {
    const listsToImport = [
      {
        id: 'qwe',
        listName: 'list name',
        wordIDs: ['1', '2'],
      },
      {
        id: 'abc',
        listName: 'list 2 name',
        wordIDs: ['2', '3'],
      },
      {
        id: 'iop',
        listName: 'list 3 name',
        wordIDs: [],
      },
    ];
    const defaultState = [
      {
        id: 'abc',
        listName: 'list 2 name',
        wordIDs: ['2', '3'],
      },
    ];
    const dateCreated = 1530825000000;
    const action = listsImport(listsToImport, dateCreated);

    expect(listsReducer(defaultState, action)).toMatchSnapshot();
  });

  it("replaces old list's props on LISTS_IMPORT", () => {
    const dateCreated = 1530825000000;
    const listsToImport = [
      {
        id: 'abc',
        listName: 'new list name',
        wordIDs: ['3', '4'],
        dateCreated,
      },
    ];
    const defaultState = [
      {
        id: 'abc',
        listName: 'list name',
        wordIDs: ['2', '3'],
        dateCreated,
      },
    ];
    const action = listsImport(listsToImport, dateCreated);
    const result = listsReducer(defaultState, action);

    expect(result).toEqual(listsToImport);
  });

  it('sets new dateCreated for imported lists on LISTS_IMPORT', () => {
    const dateCreated = 1530825000000;
    const listsToImport = [
      {
        id: 'abc',
        listName: 'new list name',
        wordIDs: ['3', '4'],
        dateCreated,
      },
    ];
    const defaultState = [
      {
        id: 'abc',
        listName: 'list name',
        wordIDs: ['2', '3'],
      },
    ];
    const action = listsImport(listsToImport);

    expect(listsReducer(defaultState, action)[0].dateCreated).not.toBe(
      dateCreated
    );
  });

  it('does not affect other lists on LISTS_IMPORT', () => {
    const dateCreated = 1530825000000;
    const listsToImport = [
      {
        id: 'abc',
        listName: 'list 2 name',
        wordIDs: ['2', '3'],
        dateCreated,
      },
      {
        id: 'qwe',
        listName: 'list name',
        wordIDs: ['1', '2'],
        dateCreated,
      },
    ];
    const defaultState = [
      {
        id: 'abc',
        listName: 'list 2 name',
        wordIDs: ['2', '3'],
      },
    ];
    const action = listsImport(listsToImport, dateCreated);
    expect(listsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('WORD_LIST_SELECTED', () => {
  it('adds word to list on WORD_LIST_SELECTED', () => {
    const listID = 'abc123',
      wordID = 'word1',
      wordIDs = ['1', '2', '3', '4'];
    const list = {
      id: listID,
      listName: 'list name',
      wordIDs,
      wordIDsSorted: ['1', '2', '3', '4'],
    };
    const action = wordListSelected(wordID, listID);
    const defaultState = [list];

    expect(listsReducer(defaultState, action)[0].wordIDs.length).toBe(
      wordIDs.length + 1
    );
  });

  it('removes word from list on WORD_LIST_SELECTED', () => {
    const listID = 'abc123',
      wordID = 'word1',
      wordIDs = ['1', '2', '3', wordID, '4'];
    const list = {
      id: listID,
      listName: 'list name',
      wordIDs,
      wordIDsSorted: ['1', '2', '3', '4'],
    };
    const action = wordListSelected(wordID, listID);
    const defaultState = [list];

    expect(listsReducer(defaultState, action)[0].wordIDs.length).toBe(
      wordIDs.length - 1
    );
  });
});
