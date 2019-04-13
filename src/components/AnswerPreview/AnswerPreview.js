import React from 'react';
import PropTypes from 'prop-types';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import classNames from 'classnames';
import { isCorrectAnswer } from '../../misc';

const AnswerPreview = props => {
  const isCorrect = isCorrectAnswer(props.answered, props.word);

  return (
    <div
      className={classNames(
        'answer-preview',
        { 'answer-preview--correct': isCorrect },
        { 'answer-preview--wrong': !isCorrect },
        props.className
      )}
    >
      <div className="answer-preview__icon">
        {isCorrect && (
          <NavigationCheck color="#0f0" style={{ display: 'block' }} />
        )}
        {!isCorrect && (
          <NavigationClose color="#f00" style={{ display: 'block' }} />
        )}
      </div>
      <div className="answer-preview__answer">{props.word}</div>
      {props.answered && !isCorrect && (
        <div className="answer-preview__answered">
          You answered: <span className="text-italic">{props.answered}</span>
        </div>
      )}
    </div>
  );
};

AnswerPreview.propTypes = {
  className: PropTypes.string,
  word: PropTypes.string,
  answered: PropTypes.string,
};

export default AnswerPreview;
