import React from 'react';
import PropTypes from 'prop-types';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { isCorrectAnswer } from '../../../misc';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames';

const QuestionEval = ({ answer, onContinue }) => {
  const isCorrect = isCorrectAnswer(answer.answered, answer.word.word);
  const iconSize = 50;

  return (
    <div
      className={classNames(
        'question-eval',
        { 'question-eval--correct': isCorrect },
        { 'question-eval--wrong': !isCorrect }
      )}
      onClick={onContinue}
    >
      <div className="question-eval__content text-enorm text-weight-bold">
        {isCorrect && (
          <NavigationCheck
            color="#000"
            style={{ width: iconSize, height: iconSize }}
          />
        )}
        {!isCorrect && (
          <React.Fragment>
            <ContentClear
              color="#000"
              style={{ width: iconSize, height: iconSize }}
            />
            <p className="mt30">{answer.word.word}</p>
          </React.Fragment>
        )}
      </div>
      <div className="buttons-bottom text-right">
        <RaisedButton label="Continue" />
      </div>
    </div>
  );
};

QuestionEval.propTypes = {
  answer: PropTypes.object.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default QuestionEval;
