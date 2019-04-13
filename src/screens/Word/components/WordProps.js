import React from 'react';
import PropTypes from 'prop-types';
import PropertySingle from '../../../components/PropertySingle';
import { getDateStr } from '../../../misc';

const WordProps = ({ dateAdded, dateRated, dateViewed }) => (
  <div className="grid">
    {dateViewed && (
      <div className="grid__item grid__item--md-span-4 text-center">
        <PropertySingle label="Last viewed">
          {getDateStr(dateViewed)}
        </PropertySingle>
      </div>
    )}
    {dateRated && (
      <div className="grid__item grid__item--md-span-4 text-center">
        <PropertySingle label="Last rated">
          {getDateStr(dateRated)}
        </PropertySingle>
      </div>
    )}
    {dateAdded && (
      <div className="grid__item grid__item--md-span-4 text-center">
        <PropertySingle label="Date added">
          {getDateStr(dateAdded)}
        </PropertySingle>
      </div>
    )}
  </div>
);

WordProps.propTypes = {
  dateAdded: PropTypes.number,
  dateRated: PropTypes.number,
  dateViewed: PropTypes.number,
};

export default WordProps;
