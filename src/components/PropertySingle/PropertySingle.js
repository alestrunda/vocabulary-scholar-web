import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const PropertySingle = ({ align, children, className, label, style }) => (
  <div
    className={classNames(
      'property-single',
      { 'property-single--left': align === 'left' },
      { 'property-single--right': align === 'right' },
      className
    )}
    style={style}
  >
    <span className="property-single__value">{children}</span>
    <span className="property-single__label">{label}</span>
  </div>
);

PropertySingle.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  align: PropTypes.string,
  style: PropTypes.object,
};

export default PropertySingle;
