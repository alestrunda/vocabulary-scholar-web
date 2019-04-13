/*global Set require*/

import dateFormat from 'dateformat';
import download from 'downloadjs';
import {
  APP_VERSION,
  QUESTION_TYPES,
  DATE_FORMAT,
  WEEK_IN_MS,
  MONTH_IN_MS,
  THREE_MONTHS_IN_MS,
  LIST_MAIN_ID,
} from './constants';

export const queryToWordID = query =>
  query
    .trim()
    .toLowerCase()
    .replace(/ /g, '_');

export const wordIDToQuery = query => query.replace(/_/g, ' ');

export const getBasicExportStructure = () => ({
  version: APP_VERSION,
  lessons: [],
  lists: [],
  words: {},
});

export const getQuestionTypeNameByID = id => {
  const questionType = QUESTION_TYPES.find(type => type.value === id);
  return questionType ? questionType.text : '';
};

//convert words object to array
export const wordsToArray = words => Object.entries(words).map(word => word[1]);

export const compareByName = (itemA, itemB) =>
  itemA.name.toLowerCase().localeCompare(itemB.name.toLowerCase());

//compare words by their property, if equal runs alternative sorting
//returns 1 if wordA is 'bigger', otherwise returns -1
export const compareWordsByProperty = (
  wordA,
  wordB,
  property,
  desc = false,
  alternativeSort = sortWordsById
) => {
  if (wordA[property] === undefined || wordA[property] < wordB[property])
    return desc ? 1 : -1;
  if (wordB[property] === undefined || wordA[property] > wordB[property])
    return desc ? -1 : 1;
  return alternativeSort(wordA, wordB);
};

export const sortWords = (words, sortBy, isDescOrdering = false) => {
  if (sortBy === 'random') return shuffle(JSON.parse(JSON.stringify(words)));
  else if (sortBy === 'recommended') return sortRecommended(words);

  //get sorting function and use array.sort for sorting
  let sortingFunction;
  switch (sortBy) {
    case 'rating':
      sortingFunction = isDescOrdering
        ? sortWordsByRating
        : sortWordsByRatingDesc;
      break;
    case 'date-added':
      sortingFunction = isDescOrdering
        ? sortWordsByDateAdded
        : sortWordsByDateAddedDesc;
      break;
    case 'date-rated':
      sortingFunction = isDescOrdering
        ? sortWordsByDateRated
        : sortWordsByDateRatedDesc;
      break;
    case 'date-viewed':
      sortingFunction = isDescOrdering
        ? sortWordsByDateViewed
        : sortWordsByDateViewedDesc;
      break;
    default:
      sortingFunction = isDescOrdering ? sortWordsByIdDesc : sortWordsById;
      break;
  }
  return [...words].sort(sortingFunction);
};

export const sortWordsByDateAdded = (wordA, wordB) => {
  return compareWordsByProperty(wordA, wordB, 'dateAdded');
};

export const sortWordsByDateAddedDesc = (wordA, wordB) => {
  const descOrder = true;
  return compareWordsByProperty(wordA, wordB, 'dateAdded', descOrder);
};

export const sortWordsByDateRated = (wordA, wordB) => {
  return compareWordsByProperty(wordA, wordB, 'dateRated');
};

export const sortWordsByDateRatedDesc = (wordA, wordB) => {
  const descOrder = true;
  return compareWordsByProperty(wordA, wordB, 'dateRated', descOrder);
};

export const sortWordsByDateViewed = (wordA, wordB) => {
  return compareWordsByProperty(wordA, wordB, 'dateViewed');
};

export const sortWordsByDateViewedDesc = (wordA, wordB) => {
  const descOrder = true;
  return compareWordsByProperty(wordA, wordB, 'dateViewed', descOrder);
};

export const sortWordsById = (wordA, wordB) => {
  return compareWordsByProperty(wordA, wordB, 'id');
};

export const sortWordsByIdDesc = (wordA, wordB) => {
  const descOrder = true;
  return compareWordsByProperty(wordA, wordB, 'id', descOrder);
};

export const sortWordsByRating = (wordA, wordB) => {
  const ratingA = getAverageFromArray(wordA.ratings);
  const ratingB = getAverageFromArray(wordB.ratings);
  if (!ratingA && !ratingB) return sortWordsById(wordA, wordB);
  if (!ratingA || ratingA < ratingB) return -1;
  if (!ratingB || ratingA > ratingB) return 1;
  return sortWordsById(wordA, wordB);
};

export const sortWordsByRatingDesc = (wordA, wordB) => {
  const ratingA = getAverageFromArray(wordA.ratings);
  const ratingB = getAverageFromArray(wordB.ratings);
  if (!ratingA && !ratingB) return sortWordsById(wordA, wordB);
  if (!ratingA || ratingA < ratingB) return 1;
  if (!ratingB || ratingA > ratingB) return -1;
  return sortWordsById(wordA, wordB);
};

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export const shuffle = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

export const sortRecommended = wordsArray => {
  //sort the lists by weight from highest - if word fits into more lists, it should be in the one with the highest priority
  let weightedLists = [
    { id: 'add-week', weight: 5, wordIDs: [] },
    { id: 'not-rated', weight: 3, wordIDs: [] },
    { id: 'rating-1', weight: 3, wordIDs: [] },
    { id: 'rating-2', weight: 3, wordIDs: [] },
    { id: 'rest', weight: 1, wordIDs: [] },
  ];

  //loop all words and sort them to the first list it matches, or put it in the 'rest' list
  let word;
  for (word of wordsArray) {
    for (let list of weightedLists) {
      if (list.id === 'rest' || isWordInPredefinedList(list.id, word)) {
        list.wordIDs.push(word);
        break;
      }
    }
  }

  //create array with list indexes according to list weight. Will be used for random pick
  let weightedArray = [];
  for (let i = 0; i < weightedLists.length; i++) {
    const list = weightedLists[i];
    if (list.wordIDs.length === 0) continue;
    shuffle(list.wordIDs);
    for (let j = 0; j < list.weight; j++) {
      weightedArray.push(i);
    }
  }

  let wordsSorted = [],
    pickedListID;
  for (let i = 0; i < wordsArray.length; i++) {
    pickedListID = getRandomItemFromArray(weightedArray);
    wordsSorted.push(weightedLists[pickedListID].wordIDs.pop()); //remove word from list's words and put it in the sorted words
    if (weightedLists[pickedListID].wordIDs.length === 0) {
      //if list's empty, remove listIDs from weighted lists so the list's ID is not picked again
      weightedArray = removeWeightFromWeightedArray(
        weightedArray,
        pickedListID
      );
    }
  }
  return wordsSorted;
};

//weighted array contains n items, each has m occurencies (respresenting weights),
//for example [1, 1, 1, 2, 2], those m occurencies are next to each other
//to remove the weights find the start and end index of the sequence and slice it out
export const removeWeightFromWeightedArray = (array, weight) => {
  let indexStart = -1,
    indexEnd = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === weight) {
      if (indexStart === -1) indexStart = i;
      indexEnd = i;
    } else if (indexEnd !== -1) break;
  }
  if (indexStart === -1) return array;
  return array
    .slice(0, indexStart)
    .concat(array.slice(indexEnd + 1, array.length));
};

export const getScoreStr = score => `${Math.round(score * 100)}%`;

export const getWordDataByID = (id, array) => {
  let word;
  for (word of array) {
    if (word.id === id) return word;
  }
  return null;
};

export const getListByID = (id, array) => {
  let list;
  for (list of array) {
    if (list.id === id) return list;
  }
  return null;
};

export const getAverageRatingByWordID = (
  wordIDs,
  words,
  averageMinimum = 1
) => {
  const average = Math.max(
    Math.round(
      wordIDs.reduce((total, wordID) => {
        const word = words[wordID];
        return (
          total + (word && word.ratings ? getAverageFromArray(word.ratings) : 0)
        );
      }, 0) / wordIDs.length
    ),
    averageMinimum
  );
  return isNaN(average) ? averageMinimum : average;
};

export const isWordInPredefinedList = (listID, word) => {
  let todayInSec, wordRating;
  switch (listID) {
    case LIST_MAIN_ID:
      return true;
    case 'not-rated':
      wordRating = Math.round(getAverageFromArray(word.ratings));
      return wordRating === 0;
    case 'rating-1':
      wordRating = Math.round(getAverageFromArray(word.ratings));
      return wordRating === 1;
    case 'rating-2':
      wordRating = Math.round(getAverageFromArray(word.ratings));
      return wordRating === 2;
    case 'rating-3':
      wordRating = Math.round(getAverageFromArray(word.ratings));
      return wordRating === 3;
    case 'rating-4':
      wordRating = Math.round(getAverageFromArray(word.ratings));
      return wordRating === 4;
    case 'rating-5':
      wordRating = Math.round(getAverageFromArray(word.ratings));
      return wordRating === 5;
    case 'view-week':
      todayInSec = new Date().getTime();
      return todayInSec - word.dateViewed <= WEEK_IN_MS;
    case 'view-month':
      todayInSec = new Date().getTime();
      return todayInSec - word.dateViewed <= MONTH_IN_MS;
    case 'view-three-months':
      todayInSec = new Date().getTime();
      return todayInSec - word.dateViewed <= THREE_MONTHS_IN_MS;
    case 'add-week':
      todayInSec = new Date().getTime();
      return todayInSec - word.dateAdded <= WEEK_IN_MS;
    case 'add-month':
      todayInSec = new Date().getTime();
      return todayInSec - word.dateAdded <= MONTH_IN_MS;
    case 'add-three-months':
      todayInSec = new Date().getTime();
      return todayInSec - word.dateAdded <= THREE_MONTHS_IN_MS;
    default:
      return false;
  }
};

export const populatePredefinedLists = (listsPredefined, wordsArray) => {
  let populatedLists = JSON.parse(JSON.stringify(listsPredefined)); //deep copy
  const listIDs = Object.entries(populatedLists).map(item => item[0]);
  let word, listID;
  for (word of wordsArray) {
    //loop all words and categorize them to the predefined lists
    for (listID of listIDs) {
      if (isWordInPredefinedList(listID, word))
        populatedLists[listID].wordIDs.push(word.id);
    }
  }
  return populatedLists;
};

export const findTheMostRecentAddedWord = wordsArray => {
  if (wordsArray.length === 0) return;
  let word,
    mostRecentWord = wordsArray[0];
  for (word of wordsArray) {
    if (word.dateAdded > mostRecentWord.dateAdded) {
      mostRecentWord = word;
    }
  }
  return mostRecentWord;
};

export const isCorrectAnswer = (answered, expected) => {
  return (
    answered && expected.trim().toLowerCase() === answered.trim().toLowerCase()
  );
};

export const objectToArray = object =>
  Object.entries(object).map(([key, value]) => value); // eslint-disable-line no-unused-vars

export const getDateStr = timeStamp =>
  dateFormat(new Date(timeStamp), DATE_FORMAT);

export const getWordsAverageRating = wordsArray => {
  return (
    wordsArray.reduce(
      (total, word) => total + getAverageFromArray(word.ratings),
      0
    ) / wordsArray.length
  );
};

export const getAverageFromArray = array => {
  if (!array || array.length === 0) return null;
  return array.reduce((total, current) => total + current) / array.length;
};

//https://gist.github.com/mathewbyrne/1280286
export const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text

//https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getRandomItemFromArray = array =>
  array[Math.floor(Math.random() * array.length)];

export const exportStoreToFile = (
  store,
  filename = 'vocabulary-scholar.json'
) => {
  download(JSON.stringify(store), filename, 'text/plain');
};

//two arrays of wordIDs, check if they contain same items
//concat the arrays together, then remove duplicants and check if the result has same length as the original arrays
export const checkWordIDsMatch = (wordIDsA, wordIDsB) => {
  if (wordIDsA.length !== wordIDsB.length) return false;
  const withoutDuplicants = [...new Set(wordIDsA.concat(wordIDsB))]; //using Set removed duplicants
  return withoutDuplicants.length === wordIDsA.length;
};

//split string by indexes on three substrings
export const splitString = (string, start, end) => {
  if (start === undefined || end === undefined) return string;
  if (start < 0) start = 0;
  if (end > string.length) end = string.length;
  return {
    start: string.substring(0, start),
    middle: string.substring(start, end),
    end: string.substring(end, string.length),
  };
};

//get list's sorted words if they are available and correct (no word has been added/removed since the last sorting)
export const listGetSortedWords = (
  listWordIDs,
  listWordIDsSorted,
  wordsAll
) => {
  const listWordIDsClean = listWordIDs.filter(
    wordID => wordsAll[wordID] !== undefined //filter words that might have been removed
  );
  //check if list has words sorted and if that sorting is still correct - whether some word has been added/remove
  // (it's fine to keep the sorting if some word has only been modified)
  if (
    listWordIDsSorted &&
    checkWordIDsMatch(listWordIDsSorted, listWordIDsClean)
  ) {
    return listWordIDsSorted;
  } else {
    return listWordIDsClean;
  }
};

export const getRandomBgPageImg = () => {
  const images = [
    require('./screens/images/ivo-rainha-764590-unsplash.jpg'),
    require('./screens/images/michael-d-beckwith-609520-unsplash.jpg'),
    require('./screens/images/photo-1520099078215-db50d947d060.jpg'),
    require('./screens/images/rob-bye-325768-unsplash.jpg'),
    require('./screens/images/sebas-ribas-310260-unsplash.jpg'),
  ];
  return images[Math.round(Math.random() * (images.length - 1))];
};
