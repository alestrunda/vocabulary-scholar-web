import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import classNames from 'classnames';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';
import Thumbup from 'material-ui/svg-icons/action/thumb-up';

const RatingIcons = props => {
  return (
    <div
      className={classNames('rating-icons', props.className)}
      style={props.style}
    >
      <FloatingActionButton
        onClick={props.onWrong}
        backgroundColor="#f00"
        mini={props.mini}
        className="rating-icons__btn rating-icons__btn--wrong"
      >
        <ThumbDown style={{ width: props.iconSize }} />
      </FloatingActionButton>
      <FloatingActionButton
        onClick={props.onCorrect}
        backgroundColor="#0f0"
        mini={props.mini}
        className="rating-icons__btn rating-icons__btn--correct"
      >
        <Thumbup style={{ width: props.iconSize }} />
      </FloatingActionButton>
    </div>
  );
};

RatingIcons.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  onCorrect: PropTypes.func.isRequired,
  onWrong: PropTypes.func.isRequired,
  iconSize: PropTypes.number,
  mini: PropTypes.bool,
};

RatingIcons.defaultProps = {
  iconSize: 20,
  mini: true,
};

export default RatingIcons;
