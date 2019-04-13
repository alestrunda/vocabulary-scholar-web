import React from 'react';
import PropTypes from 'prop-types';
import ToggleStar from 'material-ui/svg-icons/toggle/star';

const RatingStar = props => {
  const handleClick = () => {
    props.onClick && props.onClick(props.number);
  };

  const handleMouseEnter = () => {
    props.onMouseEnter && props.onMouseEnter(props.number);
  };

  const handleMouseLeave = () => {
    props.onMouseLeave && props.onMouseLeave(props.number);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`rating-stars__star rating-stars__star--${
        props.active ? 'active' : 'unactive'
      }`}
      style={props.style}
    >
      <ToggleStar
        className="rating-stars__icon"
        color={props.color}
        style={{
          width: props.size,
          height: props.size,
          ...props.styleStar,
        }}
      />
    </div>
  );
};

RatingStar.propTypes = {
  number: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  style: PropTypes.object,
  styleStar: PropTypes.object,
  active: PropTypes.bool,
};

RatingStar.defaultProps = {
  active: false,
};

export default RatingStar;
