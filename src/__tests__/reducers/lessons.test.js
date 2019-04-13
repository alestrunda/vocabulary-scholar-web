import lessonsReducer from '../../reducers/lessons';
import { appLoadState } from '../../actions/app';
import {
  lessonCreate,
  lessonListRemove,
  lessonRemove,
  lessonResetScore,
  lessonSetScore,
  lessonView,
  lessonsDelete,
  lessonsImport,
} from '../../actions/lesson';

it('correct app initial state', () => {
  const action = { type: '' }; //passing no action should return initial state
  const initialState = [];
  const defaultState = undefined;

  expect(lessonsReducer(defaultState, action)).toEqual(initialState);
});

it('does not modify state if action not recognized', () => {
  const action = { type: 'unknown', payload: { someProp: 'some value' } };
  const defaultState = [
    {
      testProp: 'test value',
    },
  ];

  expect(lessonsReducer(defaultState, action)).toEqual(defaultState);
});

describe('APP_LOAD_STATE', () => {
  it('handles APP_LOAD_STATE', () => {
    const stateToLoad = {
        lessons: ['data'],
      },
      storageType = 'local-storage';
    const action = appLoadState(stateToLoad, storageType);
    const defaultState = [];

    expect(lessonsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LESSON_CREATE', () => {
  it('handles LESSON_CREATE', () => {
    const name = 'lesson',
      listIDs = ['a1', 'b2'],
      questionsCnt = 30,
      type = 'phrase',
      rateBy = 'type-in';
    const action = lessonCreate({
      id: 'dfg564adfg564adf',
      name,
      listIDs,
      questionsCnt,
      dateCreated: 1532979984020,
      type,
      rateBy,
    });
    const defaultState = [];

    expect(lessonsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LESSON_LIST_REMOVE', () => {
  it('handles LESSON_LIST_REMOVE', () => {
    const lessonID = 'lesson1',
      listID = 'list1';
    const action = lessonListRemove(lessonID, listID);
    const defaultState = [
      {
        id: lessonID,
        name: 'lesson name',
        listIDs: [listID, 'list2', 'list3'],
        questionsCnt: 20,
      },
    ];

    expect(lessonsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LESSON_REMOVE', () => {
  it('handles LESSON_REMOVE', () => {
    const lessonID = 'lesson1';
    const action = lessonRemove(lessonID);
    const defaultState = [
      {
        id: lessonID,
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
      },
    ];

    expect(lessonsReducer(defaultState, action)).toEqual([]);
  });
});

describe('LESSON_RESET_SCORE', () => {
  it('handles LESSON_RESET_SCORE', () => {
    const lessonID = 'lesson1';
    const action = lessonResetScore(lessonID);
    const defaultState = [
      {
        id: lessonID,
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
        bestScore: 0.5,
        finishedIn: 150,
      },
    ];

    expect(lessonsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LESSON_SET_SCORE', () => {
  it('handles LESSON_SET_SCORE', () => {
    const lessonID = 'lesson1',
      score = 0.5,
      finishedIn = 150;
    const action = lessonSetScore(lessonID, score, finishedIn);
    const defaultState = [
      {
        id: lessonID,
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
      },
    ];

    expect(lessonsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LESSON_VIEW', () => {
  it('handles LESSON_VIEW', () => {
    const lessonID = 'lesson1',
      dateViewed = 1532979984020;
    const action = lessonView(lessonID, 1532979984031);
    const defaultState = [
      {
        id: lessonID,
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
        dateViewed,
      },
    ];

    expect(lessonsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('LESSONS_DELETE', () => {
  it('handles LESSONS_DELETE', () => {
    const action = lessonsDelete();
    const defaultState = [
      {
        id: 'lesson1',
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
      },
      {
        id: 'lesson2',
        name: 'lesson 2 name',
        listIDs: ['list3', 'list4', 'list5'],
        questionsCnt: 10,
      },
    ];

    expect(lessonsReducer(defaultState, action)).toEqual([]);
  });
});

describe('LESSONS_IMPORT', () => {
  it('handles LESSONS_IMPORT', () => {
    const defaultState = [
      {
        id: 'lesson1',
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
      },
      {
        id: 'lesson2',
        name: 'lesson 2 name',
        listIDs: ['list3', 'list4', 'list5'],
        questionsCnt: 10,
      },
    ];
    const lessonsToImport = [
      {
        id: 'lesson2',
        name: 'lesson 2 name',
        listIDs: ['list3', 'list4', 'list5'],
        questionsCnt: 10,
      },
      {
        id: 'lesson3',
        name: 'lesson 3 name',
        listIDs: ['list10', 'list11', 'list12'],
        questionsCnt: 500,
      },
    ];
    const dateCreated = 1532979984020;
    const action = lessonsImport(lessonsToImport, dateCreated);

    expect(lessonsReducer(defaultState, action)).toMatchSnapshot();
  });

  it("replaces old lesson's props on LESSONS_IMPORT", () => {
    const defaultState = [
      {
        id: 'lesson1',
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
      },
    ];
    const lessonsToImport = [
      {
        id: 'lesson1',
        name: 'new lesson name',
        listIDs: ['list3', 'list4'],
        questionsCnt: 25,
      },
    ];
    const dateCreated = 1532979984020;
    const action = lessonsImport(lessonsToImport, dateCreated);
    const result = lessonsReducer(defaultState, action);

    expect(result).toEqual(lessonsToImport);
  });

  it('sets new dateCreated for imported lessons on LESSONS_IMPORT', () => {
    const dateCreated = 1530825000000;
    const defaultState = [
      {
        id: 'lesson1',
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
        dateCreated,
      },
    ];
    const lessonsToImport = [
      {
        id: 'lesson1',
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
      },
    ];
    const action = lessonsImport(lessonsToImport);

    expect(lessonsReducer(defaultState, action)[0].dateCreated).not.toBe(
      dateCreated
    );
  });

  it('does not affect other lessons on LESSONS_IMPORT', () => {
    const defaultState = [
      {
        id: 'lesson1',
        name: 'lesson name',
        listIDs: ['list1', 'list2', 'list3'],
        questionsCnt: 20,
      },
      {
        id: 'lesson2',
        name: 'lesson 2 name',
        listIDs: ['list3', 'list4', 'list5'],
        questionsCnt: 10,
      },
    ];
    const lessonsToImport = [
      {
        id: 'lesson3',
        name: 'lesson 3 name',
        listIDs: ['list10', 'list11', 'list12'],
        questionsCnt: 500,
        dateCreated: 1530825000000,
      },
    ];
    const action = lessonsImport(lessonsToImport, 1530826000000);
    expect(lessonsReducer(defaultState, action)).toMatchSnapshot();
  });
});
