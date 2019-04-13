import { APP_LOAD_STATE } from '../actions/app';
import {
  LESSON_CREATE,
  LESSON_LIST_REMOVE,
  LESSON_REMOVE,
  LESSON_RESET_SCORE,
  LESSON_SET_SCORE,
  LESSON_VIEW,
  LESSONS_DELETE,
  LESSONS_IMPORT,
} from '../actions/lesson';
import { LIST_REMOVE } from '../actions/list';

/** Lesson structure
 * id: '1',
 * name: 'Lesson name',
 * listIDs: [ '1', '2' ],
 * type: 'word',
 * rateBy: 'self-rating',
 * questionsCnt: 20,
 * bestScore: 0.65,
 * finishedIn: 25,
 * dateCreated: 1544482800000,
 * dateViewed: 1544482800000
 */

const initState = [];

const lessons = (state = initState, action) => {
  let lessonsToImport,
    lessonsToImportIDs,
    lesson,
    targetLesson,
    targetListIndex,
    newLessons,
    originalLessons;
  const { payload, type } = action;
  switch (type) {
    case APP_LOAD_STATE:
      return payload.stateToLoad.lessons;
    case LESSON_CREATE:
      return [
        ...state,
        {
          id: payload.id,
          name: payload.name,
          listIDs: payload.listIDs,
          questionsCnt: payload.questionsCnt,
          dateCreated: payload.dateCreated,
          type: payload.type,
          rateBy: payload.rateBy,
        },
      ];
    case LESSON_LIST_REMOVE:
      newLessons = [...state];
      for (lesson of newLessons) {
        if (lesson.id === payload.lessonID) {
          targetLesson = lesson;
          break;
        }
      }
      if (!targetLesson) return state;
      targetListIndex = targetLesson.listIDs.indexOf(payload.listID);
      if (targetListIndex === -1) return state;
      targetLesson.listIDs = [
        ...targetLesson.listIDs.slice(0, targetListIndex),
        ...targetLesson.listIDs.slice(targetListIndex + 1),
      ];
      return newLessons;
    case LESSON_REMOVE:
      return state.filter(lesson => lesson.id !== payload.lessonID);
    case LESSON_RESET_SCORE:
      newLessons = [...state];
      //cannot use array.find because that would return new item, we want the modyfied item to stay inside the array, so it can be simply returned
      for (lesson of newLessons) {
        if (lesson.id === payload.lessonID) {
          targetLesson = lesson;
          break;
        }
      }
      if (!targetLesson) return state;
      //make sure it's not reseted to null, because it's compared to 0 - surprisingly (null >= 0) is true
      delete targetLesson.bestScore;
      delete targetLesson.finishedIn;
      return newLessons;
    case LESSON_SET_SCORE:
      newLessons = [...state];
      //cannot use array.find because that would return new item, we want the modyfied item to stay inside the array, so it can be simply returned
      for (lesson of newLessons) {
        if (lesson.id === payload.lessonID) {
          targetLesson = lesson;
          break;
        }
      }
      if (!targetLesson) return state;
      targetLesson.bestScore = payload.score;
      targetLesson.finishedIn = payload.finishedIn;
      return newLessons;
    case LESSON_VIEW:
      newLessons = [...state];
      //cannot use array.find because that would return new item, we want the modyfied item to stay inside the array, so it can be simply returned
      for (lesson of newLessons) {
        if (lesson.id === payload.lessonID) {
          targetLesson = lesson;
          break;
        }
      }
      if (!targetLesson) return state;
      targetLesson.dateViewed = payload.dateViewed;
      return newLessons;
    case LESSONS_DELETE:
      return initState;
    case LESSONS_IMPORT:
      //set new dateCreated
      lessonsToImport = payload.lessons.map(lesson => {
        lesson.dateCreated = payload.dateCreated;
        return lesson;
      });
      //filter out all lessons where ID would collide with the imported ones
      lessonsToImportIDs = lessonsToImport.map(lesson => lesson.id);
      originalLessons = state.filter(
        lesson => !lessonsToImportIDs.includes(lesson.id)
      );
      return [...originalLessons, ...lessonsToImport];
    case LIST_REMOVE:
      return state.map(lesson => ({
        ...lesson,
        listIDs: lesson.listIDs.filter(listID => listID !== payload.listID),
      }));
    default:
      return state;
  }
};

export default lessons;
