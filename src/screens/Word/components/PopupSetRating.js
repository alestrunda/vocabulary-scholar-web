import React from 'react';
import PropTypes from 'prop-types';
import Popup from '../../../components/Popup';
import RatingStars from '../../../components/RatingStars';

const PopupSetRating = ({
  avgRating,
  isActive,
  onClose,
  onStarClick,
  ratings,
}) => (
  <Popup isActive={isActive} onClose={onClose} title="Set rating">
    <div className="text-center">
      {ratings && (
        <React.Fragment>
          {ratings.length > 0 && <p>Last ratings:</p>}
          {ratings.map((rating, index) => (
            <RatingStars
              key={`rating-${index}`}
              className="el-center"
              iconSize={20}
              stars={rating}
            />
          ))}
        </React.Fragment>
      )}
      <div data-testid="word-rating-stars-active">
        <RatingStars
          className="el-center mb25 mt25"
          hoverColor="#f00"
          onStarClick={onStarClick}
          iconSize={40}
          stars={avgRating}
        />
      </div>
    </div>
  </Popup>
);

PopupSetRating.propTypes = {
  avgRating: PropTypes.number,
  isActive: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onStarClick: PropTypes.func.isRequired,
  ratings: PropTypes.array,
};

export default PopupSetRating;
