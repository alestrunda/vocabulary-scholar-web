import React from 'react';
import PropTypes from 'prop-types';
import PropertySingle from '../PropertySingle';
import Paper from 'material-ui/Paper';
import classNames from 'classnames';
import { getDateStr, getScoreStr, getQuestionTypeNameByID } from '../../misc';

const LessonPreview = ({
  bestScore,
  className,
  dateViewed,
  questionsCnt,
  name,
  style,
  type,
}) => {
  const lessonType = getQuestionTypeNameByID(type);
  return (
    <div className={classNames('item-preview', className)} style={style}>
      <Paper>
        <div className="item-preview__inner">
          <div className="item-preview__head">
            <h2 className="heading-mid">{name}</h2>
          </div>
          <div className="item-preview__content">
            {lessonType && (
              <PropertySingle label="Question type">
                <span>{lessonType}</span>
              </PropertySingle>
            )}
            <PropertySingle label="Questions">
              <span>{questionsCnt}</span>
            </PropertySingle>
            <PropertySingle label="Last viewed">
              {dateViewed ? getDateStr(dateViewed) : 'N/A'}
            </PropertySingle>
            <PropertySingle label="Top score">
              {bestScore >= 0 ? getScoreStr(bestScore) : 'N/A'}
            </PropertySingle>
          </div>
        </div>
      </Paper>
    </div>
  );
};

LessonPreview.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  questionsCnt: PropTypes.number.isRequired,
  bestScore: PropTypes.number,
  dateViewed: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.string,
};

export default LessonPreview;
