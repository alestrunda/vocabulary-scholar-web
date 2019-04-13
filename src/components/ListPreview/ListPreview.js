import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import classNames from 'classnames';
import RatingStars from '../../components/RatingStars';
import PropertySingle from '../../components/PropertySingle';
import { getDateStr, getAverageRatingByWordID } from '../../misc';

const ListPreview = props => {
  const ratingMinimum = 0;
  const avgRating = getAverageRatingByWordID(
    props.list.wordIDs,
    props.words,
    ratingMinimum
  );

  const handleClick = e => {
    props.onClick && props.onClick(e);
  };

  const hideDateViewed = props.compact && !props.list.dateViewed;
  const hideRating = props.compact && !avgRating;

  return (
    <div
      className={classNames('item-preview', props.className)}
      onClick={handleClick}
      style={props.style}
    >
      <Paper>
        <div className="item-preview__inner">
          <div className="item-preview__head">
            <h2 className="heading-mid">{props.list.name}</h2>
          </div>
          <div className="item-preview__content">
            <PropertySingle label="Items">
              <span>{props.list.wordIDs.length}</span>
            </PropertySingle>
            {!hideDateViewed && (
              <PropertySingle label="Last viewed">
                {props.list.dateViewed
                  ? getDateStr(props.list.dateViewed)
                  : 'N/A'}
              </PropertySingle>
            )}
            {!hideRating && (
              <PropertySingle label="Average rating">
                {props.list.wordIDs.length > 0 ? (
                  <RatingStars
                    iconSize={24}
                    className="el-center"
                    stars={avgRating}
                  />
                ) : (
                  'N/A'
                )}
              </PropertySingle>
            )}
          </div>
        </div>
      </Paper>
    </div>
  );
};

ListPreview.propTypes = {
  className: PropTypes.string,
  words: PropTypes.object.isRequired,
  list: PropTypes.shape({
    name: PropTypes.string.isRequired,
    wordIDs: PropTypes.array.isRequired,
    dateCreated: PropTypes.number,
    dateViewed: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func,
  compact: PropTypes.bool,
  style: PropTypes.object,
};

ListPreview.defaultProps = {
  compact: false,
};

export default ListPreview;
