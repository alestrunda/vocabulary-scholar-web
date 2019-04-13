import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  getDateStr,
  capitalizeFirstLetter,
  getAverageFromArray,
} from '../../misc';

import RatingIcons from '../RatingIcons';
import RatingStars from '../RatingStars';

class WordPreview extends React.Component {
  handleCorrectRating = () => {
    const maxRating = 5;
    this.props.onRating(this.props.id, this.props.word, maxRating);
  };

  handleWrongRating = () => {
    const minRating = 1;
    this.props.onRating(this.props.id, this.props.word, minRating);
  };

  render() {
    const { id, word, dateRated, dateViewed, ratings } = this.props;
    const avgRating = getAverageFromArray(ratings);
    const hasDetails = this.props.dateRated || this.props.dateViewed;
    return (
      <div
        className={classNames('word-preview', this.props.className)}
        style={this.props.style}
      >
        <Link to={`/word/${id}`} className="word-preview__inner">
          <div className="word-preview__content">
            <h3 className="word-preview__title">
              {capitalizeFirstLetter(word)}
            </h3>
            {hasDetails && (
              <div className="word-preview__details">
                {dateViewed && (
                  <span className="word-preview__meta">
                    Last viewed:{' '}
                    <span className="word-preview__meta--last-viewed text-weight-normal text-nowrap">
                      {getDateStr(dateViewed)}
                    </span>
                  </span>
                )}
                {dateRated && (
                  <span className="word-preview__meta">
                    Last rated:{' '}
                    <span className="word-preview__meta--last-rated text-weight-normal text-nowrap">
                      {getDateStr(dateRated)}
                    </span>
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="word-preview__value">
            {avgRating ? (
              <div className="word-preview__value-inner text-huge text-font-alt text-weight-bold">
                <RatingStars stars={avgRating} />
              </div>
            ) : (
              'not rated yet'
            )}
          </div>
        </Link>
        <div className="word-preview__rating">
          <RatingIcons
            onCorrect={this.handleCorrectRating}
            onWrong={this.handleWrongRating}
          />
        </div>
      </div>
    );
  }
}

WordPreview.propTypes = {
  id: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  dataAdded: PropTypes.number,
  dateRated: PropTypes.number,
  dateViewed: PropTypes.number,
  ratings: PropTypes.arrayOf(PropTypes.number),
  onRating: PropTypes.func.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default WordPreview;
