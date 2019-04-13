import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import ListWordLinks from '../../components/ListWordLinks';

const Autocomplete = ({
  className,
  error,
  hideIfEmpty,
  maxItemsCount,
  style,
  words,
}) => {
  if (hideIfEmpty && words.length === 0) return null;
  return (
    <Paper className={classNames('autocomplete', className)} style={style}>
      {error && <div className="autocomplete__empty">{error}</div>}
      {!error && (
        <React.Fragment>
          {words.length === 0 && (
            <div className="autocomplete__empty">Nothing found</div>
          )}
          {words.length > 0 && (
            <ListWordLinks
              className="list-links"
              words={words.slice(0, maxItemsCount)}
            />
          )}
        </React.Fragment>
      )}
    </Paper>
  );
};

Autocomplete.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  maxItemsCount: PropTypes.number,
  style: PropTypes.object,
  words: PropTypes.array,
  hideIfEmpty: PropTypes.bool,
};

Autocomplete.defaultProps = {
  words: [],
  maxItemsCount: 10,
  hideIfEmpty: false,
};

export default Autocomplete;
