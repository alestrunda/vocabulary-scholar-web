import React from 'react';
import PropTypes from 'prop-types';

const IconOpening = ({ children, icon, ...restProps }) => {
  return (
    <div className="icon-opening" {...restProps}>
      <div className="icon-opening__icon">{icon}</div>
      <div className="icon-opening__content">{children}</div>
    </div>
  );
};

IconOpening.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  icon: PropTypes.element,
};

export default IconOpening;
