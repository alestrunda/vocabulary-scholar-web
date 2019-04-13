import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import classNames from 'classnames';
import { capitalizeFirstLetter, getAverageFromArray } from '../../misc';
import RatingStars from '../RatingStars';

class WordSelectable extends React.Component {
  state = {
    checked: false,
  };

  componentDidMount() {
    this.setState({
      checked: this.props.checked,
    });
  }

  handleCheck = () => {
    this.setState(
      {
        checked: !this.state.checked,
      },
      () => {
        this.props.onSelected &&
          this.props.onSelected(this.props.id, this.state.checked);
      }
    );
  };

  render() {
    return (
      <div
        className={classNames(
          'word-preview word-selectable',
          this.props.className
        )}
        onClick={this.handleCheck}
        style={this.props.style}
      >
        <div className="word-selectable__check">
          <Checkbox checked={this.state.checked} />
        </div>
        <div className="word-preview__inner word-preview__inner--left-big">
          <div className="el-full">
            <h3 className="word-preview__title">
              {capitalizeFirstLetter(this.props.word)}
            </h3>
          </div>
        </div>
        {this.props.ratings && (
          <div className="word-selectable__rating">
            <RatingStars stars={getAverageFromArray(this.props.ratings)} />
          </div>
        )}
      </div>
    );
  }
}

WordSelectable.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  ratings: PropTypes.array,
  onSelected: PropTypes.func,
  checked: PropTypes.bool,
  style: PropTypes.object,
};

WordSelectable.defaultProps = {
  checked: false,
};

export default WordSelectable;
