import { WORD_RATINGS_CNT } from '../constants';
import { APP_LOAD_STATE } from '../actions/app';
import {
  WORD_ADD_PHRASE,
  WORD_EDIT_PHRASE,
  WORD_REMOVE_PHRASE,
  WORD_SET_FAVORITE,
  WORD_SET_AUDIO_SRC,
  WORD_SET_CUSTOM_FIELD,
  WORD_SET_IMAGE_SRC,
  WORD_SET_RATING,
  WORD_VIEW,
  WORDS_DELETE,
  WORDS_IMPORT,
} from '../actions/word';

/** Word structure
 * id: 'school',
 * word: 'school',
 * dateRated: 1543878000000,
 * dateViewed: 1530828000000,
 * dateAdded: 1530828000000,
 * ratings: [4, 1, 5, 2, 3],
 * phrases: [
 *  {
 *    id: abc123,
 *    phrase: 'Lorem ipsum',
 *    startIndex: 0,
 *    endIndex: 10,
 *  }
 * ]
 */

const initState = {};

const words = (state = initState, action) => {
  let newWords, wordsToImport;
  const { payload, type } = action;
  switch (type) {
    case APP_LOAD_STATE:
      return payload.stateToLoad.words;
    case WORD_ADD_PHRASE:
      if (!state.hasOwnProperty(payload.wordID)) return state;
      newWords = { ...state };
      if (!newWords[payload.wordID].phrases) {
        //init empty array for phrases
        newWords[payload.wordID].phrases = [];
      } else {
        newWords[payload.wordID].phrases = [
          ...newWords[payload.wordID].phrases,
        ];
      }
      newWords[payload.wordID].phrases.push({
        id: payload.id,
        phrase: payload.phrase,
        startIndex: payload.startIndex,
        endIndex: payload.endIndex,
      });
      return newWords;
    case WORD_EDIT_PHRASE:
      if (!state.hasOwnProperty(payload.wordID)) return state;
      newWords = { ...state };
      newWords[payload.wordID].phrases = newWords[payload.wordID].phrases.map(
        phrase => {
          if (phrase.id !== payload.phraseID) return phrase;
          return {
            ...phrase,
            phrase: payload.phrase,
            startIndex: payload.startIndex,
            endIndex: payload.endIndex,
          };
        }
      );
      return newWords;
    case WORD_REMOVE_PHRASE:
      if (!state.hasOwnProperty(payload.wordID)) return state;
      return {
        ...state,
        [payload.wordID]: {
          ...state[payload.wordID],
          phrases: state[payload.wordID].phrases.filter(
            phrase => phrase.id !== payload.phraseID
          ),
        },
      };
    case WORD_SET_FAVORITE:
      newWords = { ...state };
      if (!payload.isSettingAsFavorite) delete newWords[payload.wordID];
      else
        newWords[payload.wordID] = {
          id: payload.wordID,
          word: payload.word,
          dateAdded: payload.dateAdded,
        };
      return newWords;
    case WORD_SET_AUDIO_SRC:
      if (!state.hasOwnProperty(payload.wordID)) return state;
      return {
        ...state,
        [payload.wordID]: {
          ...state[payload.wordID],
          audioSrc: payload.audioSrc,
        },
      };
    case WORD_SET_CUSTOM_FIELD:
      if (!state.hasOwnProperty(payload.wordID)) return state;
      return {
        ...state,
        [payload.wordID]: {
          ...state[payload.wordID],
          customField: payload.customField,
        },
      };
    case WORD_SET_IMAGE_SRC:
      if (!state.hasOwnProperty(payload.wordID)) return state;
      return {
        ...state,
        [payload.wordID]: {
          ...state[payload.wordID],
          imageSrc: payload.imageSrc,
        },
      };
    case WORD_SET_RATING:
      if (!state.hasOwnProperty(payload.wordID)) return state;
      newWords = { ...state };
      if (!newWords[payload.wordID].ratings) {
        //no rating yet, set up an empty array
        newWords[payload.wordID].ratings = [];
      } else {
        //clone original array so it can be mutated
        newWords[payload.wordID].ratings = [
          ...newWords[payload.wordID].ratings,
        ];
      }
      if (newWords[payload.wordID].ratings.length === WORD_RATINGS_CNT) {
        //rating array is full, remove least recent rating
        newWords[payload.wordID].ratings.shift();
      }
      newWords[payload.wordID].ratings.push(payload.rating); //add rating
      newWords[payload.wordID].dateRated = payload.dateRated;
      return newWords;
    case WORD_VIEW:
      if (!state.hasOwnProperty(payload.wordID)) return state;
      return {
        ...state,
        [payload.wordID]: {
          ...state[payload.wordID],
          dateViewed: payload.dateViewed,
        },
      };
    case WORDS_DELETE:
      return initState;
    case WORDS_IMPORT:
      newWords = JSON.parse(JSON.stringify(state)); //deep clone
      wordsToImport = JSON.parse(JSON.stringify(payload.words));
      //set new dateAdded
      Object.keys(wordsToImport).forEach(
        wordID => (wordsToImport[wordID].dateAdded = payload.dateAdded)
      );
      return { ...newWords, ...wordsToImport };
    default:
      return state;
  }
};

export default words;
