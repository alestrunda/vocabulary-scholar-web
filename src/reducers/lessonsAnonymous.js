import { LESSON_ANONYMOUS_CREATE } from '../actions/lesson';

/** LessonAnonymous
 * id: '1',
 * listIDs: [ 'main', 'not-rated' ],
 * type: 'word',
 * rateBy: 'self-rating',
 * questionsCnt: 20,
 */

const initState = [];

const lessonsAnonymous = (state = initState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LESSON_ANONYMOUS_CREATE:
      return [
        ...state,
        {
          id: payload.lesson.id,
          listIDs: payload.lesson.listIDs,
          type: payload.lesson.type,
          rateBy: payload.lesson.rateBy,
          questionsCnt: payload.lesson.questionsCnt,
        },
      ];
    default:
      return state;
  }
};

export default lessonsAnonymous;
