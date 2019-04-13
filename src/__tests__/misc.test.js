import {
  compareWordsByProperty,
  sortWords,
  getAverageRatingByWordID,
  objectToArray,
  findTheMostRecentAddedWord,
  getAverageFromArray,
  getWordsAverageRating,
  isCorrectAnswer,
  removeWeightFromWeightedArray,
  splitString,
  checkWordIDsMatch,
} from '../misc';

const wordsObject = {
  school: {
    id: 'school',
    word: 'school',
    dateRated: 1532958391807,
    dateViewed: 1530828000000,
    dateAdded: 1530828000000,
    ratings: [1, 1, 1, 1, 5],
  },
  house: {
    id: 'house',
    word: 'house',
    dateRated: 1532894913656,
    dateViewed: 1532360186956,
    dateAdded: 1543506400000,
    ratings: [5, 5, 5, 5, 5],
  },
  computer: {
    id: 'computer',
    word: 'computer',
    dateRated: 1538776800000,
    dateViewed: 1541458800000,
    dateAdded: 1530828000000,
    ratings: [5, 4],
  },
  holiday: {
    id: 'holiday',
    word: 'holiday',
    dateRated: 1532894470664,
    dateViewed: 1544137200000,
    dateAdded: 1530828000000,
    ratings: [1, 5, 5, 4, 5],
  },
  car: {
    id: 'car',
    word: 'car',
    dateRated: 1538776800000,
    dateViewed: 1541458800000,
    dateAdded: 1530828000000,
    ratings: [1],
  },
  travel: {
    id: 'travel',
    word: 'travel',
    dateRated: 1544396400000,
    dateAdded: 1530828000000,
    ratings: [3, 4, 5],
  },
};

const wordsArray = objectToArray(wordsObject);

describe('compareWordsByProperty', () => {
  const wordA = {
    id: 'school',
    word: 'school',
    dateRated: 1543878000000,
    dateViewed: 1430828000000,
    dateAdded: 1530828000000,
  };
  const wordB = {
    id: 'car',
    word: 'car',
    dateRated: 1443878000000,
    dateViewed: 1530828000000,
    dateAdded: 1430828000000,
  };
  it('by id', () => {
    const property = 'id';
    expect(compareWordsByProperty(wordA, wordB, property)).toBe(1);
  });
  it('by id desc', () => {
    const property = 'id';
    const desc = true;
    expect(compareWordsByProperty(wordA, wordB, property, desc)).toBe(-1);
  });
  it('by word', () => {
    const property = 'word';
    expect(compareWordsByProperty(wordA, wordB, property)).toBe(1);
  });
  it('by dateRated', () => {
    const property = 'dateRated';
    expect(compareWordsByProperty(wordA, wordB, property)).toBe(1);
  });
  it('by dateViewed', () => {
    const property = 'dateViewed';
    expect(compareWordsByProperty(wordA, wordB, property)).toBe(-1);
  });
  it('by dateAdded', () => {
    const property = 'dateAdded';
    expect(compareWordsByProperty(wordA, wordB, property)).toBe(1);
  });
});

describe('sortWords', () => {
  it('by rating', () => {
    const sorted = sortWords(wordsArray, 'rating');
    expect(sorted[0].id).toBe('house');
    expect(sorted[1].id).toBe('computer');
    expect(sorted[2].id).toBe('holiday');
    expect(sorted[3].id).toBe('travel');
    expect(sorted[4].id).toBe('school');
    expect(sorted[5].id).toBe('car');
  });
});

describe('getAverageRatingByWordID', () => {
  it('no data', () => {
    const wordIDs = [],
      words = [],
      averageMinimum = 0;
    expect(getAverageRatingByWordID(wordIDs, words, averageMinimum)).toBe(
      averageMinimum
    );
  });
  it('no ratings', () => {
    const wordIDs = ['school', 'house'],
      averageMinimum = 0;
    const words = [
      {
        id: 'school',
        word: 'school',
        dateRated: 1532958391807,
        dateViewed: 1530828000000,
        dateAdded: 1530828000000,
        ratings: [],
      },
      {
        id: 'house',
        word: 'house',
        dateRated: 1532894913656,
        dateViewed: 1532360186956,
        dateAdded: 1533506400000,
      },
    ];
    expect(getAverageRatingByWordID(wordIDs, words, averageMinimum)).toBe(
      averageMinimum
    );
  });
  it('average', () => {
    const wordIDs = ['school', 'house', 'computer', 'holiday', 'car', 'travel'];
    expect(getAverageRatingByWordID(wordIDs, wordsObject)).toBe(3);
  });
});

describe('findTheMostRecentAddedWord', () => {
  it('no data', () => {
    expect(findTheMostRecentAddedWord(wordsArray).id).toBe('house');
  });
});

describe('getAverageFromArray', () => {
  it('no data', () => {
    const array = [];
    expect(getAverageFromArray(array)).toBe(null);
  });
  it('average', () => {
    const array = [1, 2, 3, 4, 5];
    expect(getAverageFromArray(array)).toBe(3);
  });
});

describe('getWordsAverageRating', () => {
  it('no data', () => {
    const result = getWordsAverageRating([]);
    expect(isNaN(result)).toBe(true);
  });
  it('average', () => {
    expect(Math.round(getWordsAverageRating(wordsArray) * 1000) / 1000).toBe(
      3.383
    );
  });
});

describe('isCorrectAnswer', () => {
  it('same words are correct', () => {
    expect(isCorrectAnswer('school', 'school')).toBe(true);
  });
  it('big letters do not matter', () => {
    expect(isCorrectAnswer('School', 'sChOoL')).toBe(true);
  });
  it('different words are wrong', () => {
    expect(isCorrectAnswer('school', 'car')).toBe(false);
  });
  it('white space around the word does not matter', () => {
    expect(isCorrectAnswer('  school    ', 'school')).toBe(true);
  });
});

describe('removeWeightFromWeightedArray', () => {
  it('do not remove if not found', () => {
    const array = [0, 0, 0, 1, 2, 2];
    expect(removeWeightFromWeightedArray(array, 3)).toEqual(array);
  });
  it('remove from beginning', () => {
    const array = [0, 0, 0, 1, 2, 2];
    expect(removeWeightFromWeightedArray(array, 0)).toEqual([1, 2, 2]);
  });
  it('remove from end', () => {
    const array = [0, 0, 0, 1, 2, 2];
    expect(removeWeightFromWeightedArray(array, 2)).toEqual([0, 0, 0, 1]);
  });
  it('remove only one item', () => {
    const array = [0, 0, 0, 1, 2, 2];
    expect(removeWeightFromWeightedArray(array, 1)).toEqual([0, 0, 0, 2, 2]);
  });
});

describe('splitString', () => {
  const string = 'abc dfg jjght podiu kasd ll wqwekl';
  it('highlights nothing', () => {
    const resultStrings = splitString(string, 0, 0);
    expect(resultStrings.start).toBe('');
    expect(resultStrings.middle).toBe('');
    expect(resultStrings.end).toBe(string);
  });
  it('highlights nothing', () => {
    const start = 4;
    const end = 4;
    const resultStrings = splitString(string, start, end);
    expect(resultStrings.start).toBe(string.substring(0, start));
    expect(resultStrings.middle).toBe(string.substring(start, end));
    expect(resultStrings.end).toBe(string.substring(end, string.length));
  });
  it('highlights one character', () => {
    const start = 4;
    const end = 5;
    const resultStrings = splitString(string, start, end);
    expect(resultStrings.start).toBe(string.substring(0, start));
    expect(resultStrings.middle).toBe(string.substring(start, end));
    expect(resultStrings.end).toBe(string.substring(end, string.length));
  });
  it('highlights multiple characters', () => {
    const start = 4;
    const end = 10;
    const resultStrings = splitString(string, start, end);
    expect(resultStrings.start).toBe(string.substring(0, start));
    expect(resultStrings.middle).toBe(string.substring(start, end));
    expect(resultStrings.end).toBe(string.substring(end, string.length));
  });
  it('highlights whole string', () => {
    const start = 0;
    const end = string.length;
    const resultStrings = splitString(string, start, end);
    expect(resultStrings.start).toBe(string.substring(0, start));
    expect(resultStrings.middle).toBe(string.substring(start, end));
    expect(resultStrings.end).toBe(string.substring(end, string.length));
  });
  it('highlights from start', () => {
    const start = 0;
    const end = 5;
    const resultStrings = splitString(string, start, end);
    expect(resultStrings.start).toBe(string.substring(0, start));
    expect(resultStrings.middle).toBe(string.substring(start, end));
    expect(resultStrings.end).toBe(string.substring(end, string.length));
  });
  it('highlights to end', () => {
    const start = 10;
    const end = string.length;
    const resultStrings = splitString(string, start, end);
    expect(resultStrings.start).toBe(string.substring(0, start));
    expect(resultStrings.middle).toBe(string.substring(start, end));
    expect(resultStrings.end).toBe(string.substring(end, string.length));
  });
  it('handles arguments out of string length', () => {
    const resultStrings = splitString(string, -5, 500);
    expect(resultStrings.start).toBe('');
    expect(resultStrings.middle).toBe(string);
    expect(resultStrings.end).toBe('');
  });
});

describe('checkWordIDsMatch', () => {
  it('matches empty arrays', () => {
    expect(checkWordIDsMatch([], [])).toBe(true);
  });
  it('matches same arrays', () => {
    const items = [
      'developers',
      'ill',
      'magic',
      'active',
      'sci',
      'accept',
      'arbitrary',
      'discusses',
      'matthew',
      'scales',
      'enlargement',
      'pushing',
      'plant',
      'cv',
      'degree',
      'agricultural',
      'levels',
      'festival',
      'animal',
      'pregnancy',
      'vice',
      'resumes',
      'loves',
      'complaints',
      'gmt',
      'accountability',
      'consistently',
      'charms',
      'sail',
      'passion',
      'funding',
      'restore',
      'tri',
      'likes',
      'clocks',
      'scheduled',
      'mime',
      'nationwide',
      'recipient',
    ];
    expect(checkWordIDsMatch(items, items)).toBe(true);
  });
  it('does not matches different arrays', () => {
    const itemsA = ['abc', 'def'],
      itemsB = ['abc', 'ghi'];
    expect(checkWordIDsMatch(itemsA, itemsB)).toBe(false);
  });
});
