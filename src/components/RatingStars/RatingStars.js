import React from 'react';
import PropTypes from 'prop-types';
import Star from './Star';
import classNames from 'classnames';

class RatingStars extends React.Component {
  state = {
    starNumberHovered: 0,
  };

  handleStarClick = starNumber => {
    this.props.onStarClick && this.props.onStarClick(starNumber);
  };

  handleStarMouseEnter = starNumber => {
    this.setState({
      starNumberHovered: starNumber,
    });
  };

  handleStarMouseLeave = () => {
    this.setState({
      starNumberHovered: 0,
    });
  };

  getStarColor = (starNumber, isActiveStar) => {
    const normalColor = isActiveStar
      ? this.props.colorActive
      : this.props.colorUnactive;
    const hoverColor = this.props.hoverColor;
    return this.props.hoverColor && this.state.starNumberHovered >= starNumber
      ? hoverColor
      : normalColor;
  };

  renderStar(number, isActive) {
    const testid = isActive ? 'rating-star-active' : 'rating-star-unactive';
    const color = this.getStarColor(number, isActive);
    return (
      <Star
        data-testid={testid}
        onMouseLeave={this.handleStarMouseLeave}
        onMouseEnter={this.handleStarMouseEnter}
        onClick={this.handleStarClick}
        key={number}
        size={this.props.iconSize}
        number={number}
        color={color}
        active={isActive}
      />
    );
  }

  render() {
    const starsActiveCount = Math.round(this.props.stars);

    //create active stars
    let isStarActive = true;
    let starsActive;
    if (this.props.stars === 0) {
      starsActive = [];
    } else {
      starsActive = Array.apply(null, Array(starsActiveCount)); //init empty array for the active stars
      starsActive = starsActive.map((item, index) => {
        const starNumber = index + 1;
        return this.renderStar(starNumber, isStarActive);
      });
    }

    //create unactive stars
    isStarActive = false;
    let starsUnactive = Array.apply(
      //init empty array for the unactive stars
      null,
      Array(this.props.length - starsActiveCount)
    );
    starsUnactive = starsUnactive.map((item, index) => {
      const starNumber = starsActiveCount + index + 1;
      return this.renderStar(starNumber, isStarActive);
    });

    return (
      <div
        className={classNames('rating-stars', this.props.className)}
        style={{
          width: this.props.iconSize * this.props.length,
          height: this.props.iconSize,
          lineHeight: `${this.props.iconSize}px`,
          ...this.props.style,
        }}
      >
        <div className="rating-stars__active">{starsActive}</div>
        <div className="rating-stars__unactive">{starsUnactive}</div>
      </div>
    );
  }
}

RatingStars.propTypes = {
  className: PropTypes.string,
  length: PropTypes.number,
  stars: PropTypes.number,
  iconSize: PropTypes.number,
  colorActive: PropTypes.string,
  colorUnactive: PropTypes.string,
  onStarClick: PropTypes.func,
  style: PropTypes.object,
  hoverColor: PropTypes.string,
};

RatingStars.defaultProps = {
  length: 5,
  stars: 0,
  iconSize: 15,
  colorActive: '#00adb5',
  colorUnactive: '#ccc',
};

export default RatingStars;
