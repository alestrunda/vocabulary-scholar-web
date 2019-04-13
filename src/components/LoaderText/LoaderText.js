import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LoaderText = ({ className, style, text }) => (
  <div className={classNames('text-loading', className)} style={style}>
    {text}
    <span className="loader-dots">
      <span />
      <span />
      <span />
    </span>
  </div>
);

LoaderText.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string,
};

LoaderText.defaultProps = {
  text: 'Loading',
};

export default LoaderText;
