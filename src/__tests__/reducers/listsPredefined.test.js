import listsPredefinedReducer from '../../reducers/listsPredefined';
import { appLoadState } from '../../actions/app';
import { listSort, listSortReset } from '../../actions/list';

it('does not modify state if action not recognized', () => {
  const action = { type: 'unknown', payload: { someProp: 'some value' } };
  const defaultState = {
    testProp: 'test value',
  };

  expect(listsPredefinedReducer(defaultState, action)).toEqual(defaultState);
});

it('handles APP_LOAD_STATE', () => {
  const stateToLoad = {},
    storageType = 'local-storage';
  const action = appLoadState(stateToLoad, storageType);
  const defaultState = {
    main: {
      id: 'main',
      name: 'Main',
      wordIDs: ['1', '2'],
      wordIDsSorted: ['2', '1'],
    },
  };

  expect(listsPredefinedReducer(defaultState, action).main.wordIDsSorted).toBe(
    undefined
  );
});

it('handles LIST_SORT', () => {
  const listID = 'main',
    sortBy = 'rating',
    isDescSort = false,
    words = ['word1', 'word2'];
  const action = listSort(listID, sortBy, isDescSort, words);
  const defaultState = {
    main: {
      id: 'main',
      name: 'Main',
      wordIDs: ['1', '2'],
      wordIDsSorted: ['2', '1'],
    },
  };

  expect(listsPredefinedReducer(defaultState, action)).toMatchSnapshot();
});

it('handles LIST_SORT_RESET', () => {
  const listID = 'main';
  const action = listSortReset(listID);
  const defaultState = {
    main: {
      id: 'main',
      name: 'Main',
      wordIDs: ['1', '2'],
      wordIDsSorted: ['2', '1'],
    },
  };

  expect(listsPredefinedReducer(defaultState, action).main.wordIDsSorted).toBe(
    undefined
  );
});
