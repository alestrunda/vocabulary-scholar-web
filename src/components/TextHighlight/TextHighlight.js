/*global window*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { splitString } from '../../misc';

const TextHightlight = props => {
  const handleClick = () => {
    //check if user selected any part of the string passed as children
    if (window.getSelection().rangeCount) {
      //get indexes of the selected part
      const range = window.getSelection().getRangeAt(0);
      props.onHighlight(range.startOffset, range.endOffset);
    }
  };

  const { start, middle, end } = splitString(
    props.children,
    props.start,
    props.end
  );

  return (
    <div onClick={handleClick} className={'highlighting-text'}>
      <div className={classNames('highlighting-text__text', props.className)}>
        {props.children}
      </div>
      {middle && (
        <div className="highlighting-text__over">
          <span data-testid="part-1">{start}</span>
          <span data-testid="part-2" className={props.classNameHighlighted}>
            {middle}
          </span>
          <span data-testid="part-3">{end}</span>
        </div>
      )}
    </div>
  );
};

TextHightlight.propTypes = {
  className: PropTypes.string,
  classNameHighlighted: PropTypes.string,
  children: PropTypes.string,
  onHighlight: PropTypes.func.isRequired,
  start: PropTypes.number,
  end: PropTypes.number,
};

TextHightlight.defaultProps = {
  classNameHighlighted: 'text-highlight',
  children: '',
};

export default TextHightlight;
