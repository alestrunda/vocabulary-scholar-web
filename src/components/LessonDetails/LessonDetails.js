import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AnswerPreview from '../AnswerPreview';

const LessonDetails = ({ answers, className, style }) => {
  return (
    <div className={classNames('lesson-details', className)} style={style}>
      <div className={classNames('lesson-details__head', `${className}__head`)}>
        <h3 className="mb10">Lesson details</h3>
      </div>
      {answers.map(answer => (
        <AnswerPreview
          key={answer.word.id}
          word={answer.word.word}
          answered={answer.answered}
        />
      ))}
    </div>
  );
};

LessonDetails.propTypes = {
  answers: PropTypes.array,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default LessonDetails;
