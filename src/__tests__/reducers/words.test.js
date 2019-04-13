/*global describe, expect, it*/
import wordsReducer from '../../reducers/words';
import {
  wordAddPhrase,
  wordEditPhrase,
  wordRemovePhrase,
  wordSetAudioSrc,
  wordSetCustomField,
  wordSetImageSrc,
  wordSetRating,
  wordView,
  wordsDelete,
  wordSetFavorite,
  wordsImport,
} from '../../actions/word';

it('correct app initial state', () => {
  const action = { type: '' }; //passing no action should return initial state
  const initialState = {};
  const defaultState = undefined;

  expect(wordsReducer(defaultState, action)).toEqual(initialState);
});

it('does not modify state if action not recognized', () => {
  const action = { type: 'unknown', payload: { someProp: 'some value' } };
  const defaultState = {
    someword: {
      testProp: 'test value',
    },
  };

  expect(wordsReducer(defaultState, action)).toEqual(defaultState);
});

describe('APP_LOAD_STATE', () => {
  it('handles APP_LOAD_STATE', () => {
    const wordID = 'word_id',
      word = 'word';
    const stateToLoad = { words: {} },
      storageType = 'local-storage';
    stateToLoad.words[wordID] = {
      id: wordID,
      word,
    };
    const action = {
      type: 'APP_LOAD_STATE',
      payload: { stateToLoad, storageType },
    };
    const defaultState = {};

    expect(wordsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('WORD_ADD_PHRASE', () => {
  it('adds phrase on WORD_ADD_PHRASE', () => {
    const wordID = 'word_id';
    const action = wordAddPhrase({
      id: '30of2dfsju405enx',
      wordID,
      phrase: 'Lorem ipsum dolor',
      startIndex: 6,
      endIndex: 10,
    });
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      word: 'test',
    };

    expect(wordsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('WORD_EDIT_PHRASE', () => {
  it('edits phrase on WORD_EDIT_PHRASE', () => {
    const wordID = 'word_id';
    const phraseID = 'abc123';
    const newPhrase = {
      phrase: 'New phrase',
      startIndex: 1,
      endIndex: 2,
    };
    const action = wordEditPhrase({ wordID, phraseID, ...newPhrase });
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      phrases: [
        {
          id: 'abc123',
          phrase: 'Lorem ipsum dolor',
          startIndex: 0,
          endIndex: 5,
        },
        {
          id: 'abc456',
          phrase: 'Lorem ipsum dolor sit 2',
          startIndex: 6,
          endIndex: 11,
        },
      ],
    };

    expect(wordsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('WORD_REMOVE_PHRASE', () => {
  it('removes phrase on WORD_REMOVE_PHRASE', () => {
    const wordID = 'word_id',
      phraseID = 'abc123';
    const action = wordRemovePhrase(wordID, phraseID);
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      phrases: [
        {
          id: 'abc123',
          phrase: 'Lorem ipsum dolor',
          startIndex: 0,
          endIndex: 5,
        },
        {
          id: 'abc456',
          phrase: 'Lorem ipsum dolor sit 2',
          startIndex: 6,
          endIndex: 11,
        },
      ],
    };

    expect(wordsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('WORD_SET_FAVORITE', () => {
  it('adds word on WORD_SET_FAVORITE', () => {
    const wordID = 'word_id',
      word = 'word';
    const action = wordSetFavorite({
      dateAdded: 1530828000000,
      wordID,
      word,
      isSettingAsFavorite: true,
    });
    const defaultState = {};

    expect(wordsReducer(defaultState, action)[wordID]).toMatchSnapshot();
  });

  it('removes word on WORD_SET_FAVORITE', () => {
    const wordID = 'word_id',
      word = 'word';
    const action = wordSetFavorite({ wordID, word });
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      word,
    };

    expect(wordsReducer(defaultState, action)[wordID]).toBe(undefined);
  });
});

describe('WORD_SET_AUDIO_SRC', () => {
  it('handles WORD_SET_AUDIO_SRC', () => {
    const wordID = 'word_id',
      word = 'word',
      audioSrc = 'file.mp3';
    const action = wordSetAudioSrc(wordID, audioSrc);
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      word,
    };

    expect(wordsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('WORD_SET_CUSTOM_FIELD', () => {
  it('handles WORD_SET_CUSTOM_FIELD', () => {
    const wordID = 'word_id',
      word = 'word',
      customField = 'my data';
    const action = wordSetCustomField(wordID, customField);
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      word,
    };

    expect(wordsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('WORD_SET_IMAGE_SRC', () => {
  it('handles WORD_SET_IMAGE_SRC', () => {
    const wordID = 'word_id',
      word = 'word',
      imageSrc = 'file.jpg';
    const action = wordSetImageSrc(wordID, imageSrc);
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      word,
    };

    expect(wordsReducer(defaultState, action)).toMatchSnapshot();
  });
});

describe('WORD_SET_RATING', () => {
  it('adds new rating on WORD_SET_RATING', () => {
    const wordID = 'word_id',
      word = 'word',
      rating = 5;
    const action = wordSetRating({ wordID, rating });
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      word,
    };

    expect(wordsReducer(defaultState, action)[wordID].ratings[0]).toBe(rating);
  });

  it('replaces rating on WORD_SET_RATING', () => {
    const wordID = 'word_id',
      word = 'word',
      rating = 5;
    const action = wordSetRating({ wordID, rating });
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      word,
      ratings: [2, 3, 4, 4, 1],
    };

    expect(wordsReducer(defaultState, action)[wordID].ratings.length).toBe(
      defaultState[wordID].ratings.length
    );
    expect(
      wordsReducer(defaultState, action)[wordID].ratings[
        defaultState[wordID].ratings.length - 1
      ]
    ).toBe(rating);
  });
});

describe('WORD_VIEW', () => {
  it('handles WORD_VIEW', () => {
    const wordID = 'word_id',
      word = 'word',
      dateViewed = 1530828000000;
    const action = wordView(wordID);
    const defaultState = {};
    defaultState[wordID] = {
      id: wordID,
      word,
      ratings: [2, 3, 4, 4, 1],
      dateViewed,
    };

    expect(wordsReducer(defaultState, action)[wordID].dateViewed).not.toBe(
      dateViewed
    );
  });
});

describe('WORDS_DELETE', () => {
  it('handles WORDS_DELETE', () => {
    const action = wordsDelete();
    const defaultState = {};
    defaultState['word_id'] = {
      id: 'word_id',
      word: 'word',
      ratings: [2, 3, 4, 4, 1],
      dateViewed: 1530828000000,
    };
    defaultState['word2_id'] = {
      id: 'word2_id',
      word: 'word 2',
      ratings: [2, 1],
      dateViewed: 1530828000000,
    };

    expect(wordsReducer(defaultState, action)['word_id']).toBe(undefined);
    expect(wordsReducer(defaultState, action)['word2_id']).toBe(undefined);
  });
});

describe('WORDS_IMPORT', () => {
  it('handles WORDS_IMPORT', () => {
    const defaultState = {
      word_id: {
        id: 'word_id',
        word: 'word',
        ratings: [2, 3, 4, 4, 1],
        dateViewed: 1530828000000,
      },
    };
    const wordsToImport = {
      word_id: {
        id: 'word_id',
        word: 'word',
        ratings: [2, 3, 4, 4, 1],
        dateViewed: 1530828000000,
      },
      word2_id: {
        id: 'word2_id',
        word: 'word 2',
        ratings: [2, 1],
        dateViewed: 1530828000000,
      },
      word3_id: {
        id: 'word3_id',
        word: 'word 3',
        ratings: [1, 1],
        dateViewed: 1530828000000,
      },
    };
    const action = wordsImport(wordsToImport, 1530828000000);
    const result = wordsReducer(defaultState, action);

    expect(result).toMatchSnapshot();
  });

  it("replaces old word's props on WORDS_IMPORT", () => {
    const defaultState = {
      word_id: {
        id: 'word_id',
        word: 'word',
        ratings: [2, 3, 4, 4, 1],
        dateViewed: 1530828000000,
      },
    };
    const wordsToImport = {
      word_id: {
        id: 'word_id',
        word: 'word',
        ratings: [2, 5],
        dateViewed: 1530825000000,
      },
    };
    const action = wordsImport(wordsToImport);
    expect(wordsReducer(defaultState, action)['word_id'].ratings.length).toBe(
      2
    );
    expect(wordsReducer(defaultState, action)['word_id'].dateViewed).toBe(
      1530825000000
    );
  });

  it('sets new dateAdded for imported words on WORDS_IMPORT', () => {
    const dateAddedChange = 1530828000000;
    const dateAddedKeep = 1530825000000;
    const defaultState = {
      word_id: {
        id: 'word_id',
        word: 'word',
        ratings: [2, 3, 4, 4, 1],
        dateViewed: 1530825000000,
        dateAdded: dateAddedChange,
      },
      word2_id: {
        id: 'word2_id',
        word: 'word 2',
        ratings: [2, 1],
        dateViewed: 1530828000000,
        dateAdded: dateAddedKeep,
      },
    };
    const wordsToImport = {
      word_id: {
        id: 'word_id',
        word: 'word',
        ratings: [2, 5],
        dateViewed: 1530825000000,
      },
    };
    const action = wordsImport(wordsToImport);
    const result = wordsReducer(defaultState, action);

    expect(result['word_id'].dateAdded).not.toBe(dateAddedChange);
    expect(result['word2_id'].dateAdded).toBe(dateAddedKeep);
  });

  it('does not affect other words on WORDS_IMPORT', () => {
    const defaultState = {
      word_id: {
        id: 'word_id',
        word: 'word',
        ratings: [2, 3, 4, 4, 1],
        dateViewed: 1530825000000,
      },
      word2_id: {
        id: 'word2_id',
        word: 'word 2',
        ratings: [2, 1],
        dateViewed: 1530828000000,
      },
    };
    const dateAdded = 1530828000000;
    const wordsToImport = {
      word3_id: {
        id: 'word3_id',
        word: 'word 3',
        ratings: [1, 1],
        dateAdded,
        dateViewed: 1530828000000,
      },
    };
    const action = wordsImport(wordsToImport, dateAdded);
    const result = wordsReducer(defaultState, action);

    expect(result['word_id']).toEqual(defaultState['word_id']);
    expect(result['word2_id']).toEqual(defaultState['word2_id']);
    expect(result['word3_id']).toEqual(wordsToImport['word3_id']);
  });
});
