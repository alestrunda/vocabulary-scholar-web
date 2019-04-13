import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import { getScoreStr } from '../../../misc';

const LessonScore = ({ newScore, oldScore, onRestart, timerVal }) => (
  <React.Fragment>
    {oldScore >= 0 && (
      <p className="mb15">
        <span className="text-weight-bold">New top score</span> (was{' '}
        {getScoreStr(oldScore)})
      </p>
    )}
    <p className="text-score mb15">{getScoreStr(newScore)}</p>
    <p>in {timerVal} seconds</p>
    <div className="buttons-bottom">
      <div className="grid grid--small">
        <div className="grid__item grid__item--sm-span-7 text-left text-xs-center">
          <Link to="/lesson/">
            <RaisedButton label="Back to lessons" />
          </Link>
        </div>
        <div className="grid__item grid__item--sm-span-5 grid__item--break-xs-10 text-right text-xs-center">
          <RaisedButton primary onClick={onRestart} label="Run again" />
        </div>
      </div>
    </div>
  </React.Fragment>
);

LessonScore.propTypes = {
  newScore: PropTypes.number.isRequired,
  oldScore: PropTypes.number,
  onRestart: PropTypes.func.isRequired,
  timerVal: PropTypes.number.isRequired,
};

export default LessonScore;
