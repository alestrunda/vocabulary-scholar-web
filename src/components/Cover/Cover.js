import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Cover = ({ className, isActive, onClick, rate, style }) => {
  const handleClick = () => {
    onClick && onClick();
  };

  const bgColor = `rgba(0, 0, 0, ${rate})`;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        ...style,
      }}
      className={classNames('cover-screen', className, { active: isActive })}
      onClick={handleClick}
    />
  );
};

Cover.propTypes = {
  rate: PropTypes.number,
  isActive: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

Cover.defaultProps = {
  isActive: false,
  rate: 0.5,
};

export default Cover;
