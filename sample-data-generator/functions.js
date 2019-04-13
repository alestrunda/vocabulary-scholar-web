import uniqid from 'uniqid';
import { shuffle, objectToArray, getRandomItemFromArray } from '../src/misc';
import { LESSON_TYPES } from '../src/settings';

const MAX_NUMBER_OF_QUESTIONS = 100,
  MAX_FINISH_IN_TIME = 1000,
  DATE_START = new Date(2012, 1, 1), //start date - since when to generate random dates
  DATE_END = new Date(),
  MAX_CHANCE_LIST_IN_LESSON = 15, //max X% of total lists can be in one lesson
  MAX_CHANCE_WORD_IN_LIST = 10, //max X% of total words can be in one list
  MIN_WORDS_IN_PHRASE = 3,
  MAX_WORDS_IN_PHRASE = 10,
  TEXT_CHARS = "abcdefghijklmnopqrstuvwxyz' ";

// https://stackoverflow.com/questions/9035627/elegant-method-to-generate-array-of-random-dates-within-two-dates
export const randomDate = () => {
  return new Date(
    DATE_START.getTime() +
      Math.random() * (DATE_END.getTime() - DATE_START.getTime())
  );
};

//create random string (making no sense) from possible characters
export const randomString = length => {
  const charsLength = TEXT_CHARS.length;
  let i,
    out = '';
  for (i = 0; i < length; i++) {
    out += TEXT_CHARS.charAt(Math.floor(Math.random() * charsLength));
  }
  return out;
};

//get random part of array of items and return their IDs
export const randomItemsIDs = (array, count) => {
  return shuffle(array)
    .slice(0, count)
    .map(item => item.id);
};

export const randomRatings = (ratingLength = 5, ratingMax = 5) => {
  let ratings = [];
  const randomRatingLength = Math.floor(Math.random() * (ratingLength + 1)); //0-5
  for (let i = 0; i < randomRatingLength; i++) {
    ratings.push(Math.floor(Math.random() * ratingMax) + 1); //1-5
  }
  return ratings;
};

//generate random phrase (making no sence) including selected word
export const randomWordPhrases = (currentWord, wordsAll, numberOfPhrases) => {
  let phrase,
    phraseWordsCount,
    currentWordIndex,
    currentWordPosition,
    phrases = [];
  //generate phrases
  for (let i = 0; i < numberOfPhrases; i++) {
    phrase = '';
    phraseWordsCount =
      Math.floor(Math.random() * (MAX_WORDS_IN_PHRASE - MIN_WORDS_IN_PHRASE)) +
      MIN_WORDS_IN_PHRASE; //get random number of words in the phrase
    currentWordPosition = Math.floor(Math.random() * phraseWordsCount); //get random position of the selected word in the phrase
    for (let j = 0; j < phraseWordsCount; j++) {
      //fill the phrase with random words, set the selected word on the picked position
      if (j === currentWordPosition) phrase += ' ' + currentWord;
      else phrase += ' ' + getRandomItemFromArray(wordsAll);
    }
    currentWordIndex = phrase.indexOf(currentWord) - 1; //get position of the selected word in the phrase
    phrases.push({
      id: uniqid(),
      phrase: phrase.trim(),
      startIndex: currentWordIndex,
      endIndex: currentWordIndex + currentWord.length,
    });
  }
  return phrases;
};

const getRandomLessonType = () => {
  return LESSON_TYPES[Math.round(Math.random() * (LESSON_TYPES.length - 1))].value;
};

export const createLesson = lists => {
  return {
    id: uniqid(),
    name: randomString(10),
    listIDs: randomItemsIDs(
      lists,
      Math.floor(Math.random() * (lists.length / MAX_CHANCE_LIST_IN_LESSON))
    ),
    type: getRandomLessonType(),
    selfRating: true,
    questionsCnt: Math.floor(Math.random() * (MAX_NUMBER_OF_QUESTIONS - 1)) + 1,
    bestScore: Math.floor(Math.random() * 100) / 100, //percents
    finishedIn: Math.floor(Math.random() * MAX_FINISH_IN_TIME),
    dateCreated: randomDate().getTime(),
    dateViewed: randomDate().getTime(),
  };
};

export const createList = words => {
  const wordsArray = objectToArray(words);
  return {
    id: uniqid(),
    name: randomString(10),
    wordIDs: randomItemsIDs(
      wordsArray,
      Math.floor(Math.random() * (wordsArray.length / MAX_CHANCE_WORD_IN_LIST))
    ),
    dateCreated: randomDate().getTime(),
    dateViewed: randomDate().getTime(),
  };
};

export const createWord = (word, wordsAll, numberOfPhrases) => {
  return {
    id: slugifyWord(word),
    word: word,
    dateRated: randomDate().getTime(),
    dateViewed: randomDate().getTime(),
    dateAdded: randomDate().getTime(),
    ratings: randomRatings(),
    phrases: randomWordPhrases(word, wordsAll, numberOfPhrases),
  };
};

export const slugifyWord = word => word.toLowerCase().replace(' ', '_');
