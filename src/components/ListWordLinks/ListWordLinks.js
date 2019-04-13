import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListWordLinks = ({ className, style, words }) => {
  return (
    <ul className={className} style={style}>
      {words.map(item => {
        return (
          <li key={item.id} className={`${className}__item`}>
            <Link to={`/word/${item.id}`} className={`${className}__link`}>
              {item.word}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

ListWordLinks.propTypes = {
  className: PropTypes.string,
  words: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      word: PropTypes.string,
    })
  ),
  style: PropTypes.object,
};

export default ListWordLinks;
