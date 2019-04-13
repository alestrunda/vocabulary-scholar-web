import uniqid from 'uniqid';

export const LESSON_CREATE = 'LESSON_CREATE',
  LESSON_ANONYMOUS_CREATE = 'LESSON_ANONYMOUS_CREATE',
  LESSON_LIST_REMOVE = 'LESSON_LIST_REMOVE',
  LESSON_REMOVE = 'LESSON_REMOVE',
  LESSON_RESET_SCORE = 'LESSON_RESET_SCORE',
  LESSON_SET_SCORE = 'LESSON_SET_SCORE',
  LESSON_VIEW = 'LESSON_VIEW',
  LESSONS_DELETE = 'LESSONS_DELETE',
  LESSONS_IMPORT = 'LESSONS_IMPORT';

export const lessonCreate = ({
  id = uniqid(),
  name = '',
  listIDs = [],
  questionsCnt = 0,
  dateCreated = new Date().getTime(),
  type,
  rateBy,
} = {}) => ({
  type: LESSON_CREATE,
  payload: { id, name, listIDs, questionsCnt, dateCreated, type, rateBy },
});

export const lessonAnonymousCreate = lesson => ({
  type: LESSON_ANONYMOUS_CREATE,
  payload: { lesson },
});

export const lessonListRemove = (lessonID, listID) => ({
  type: LESSON_LIST_REMOVE,
  payload: { lessonID, listID },
});

export const lessonRemove = lessonID => ({
  type: LESSON_REMOVE,
  payload: { lessonID },
});

export const lessonResetScore = lessonID => ({
  type: LESSON_RESET_SCORE,
  payload: { lessonID },
});

export const lessonSetScore = (lessonID, score, finishedIn) => ({
  type: LESSON_SET_SCORE,
  payload: { lessonID, score, finishedIn },
});

export const lessonView = (lessonID, dateViewed = new Date().getTime()) => ({
  type: LESSON_VIEW,
  payload: { lessonID, dateViewed },
});

export const lessonsDelete = () => ({
  type: LESSONS_DELETE,
});

export const lessonsImport = (lessons, dateCreated = new Date().getTime()) => ({
  type: LESSONS_IMPORT,
  payload: { lessons, dateCreated },
});
