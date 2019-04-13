import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';
import { slugify } from '../../misc';

const ListImport = ({ isDisabled, list, onImport }) => {
  const handleOnImport = () => {
    onImport(list.url);
  };

  return (
    <div className="row-option-btn" data-testid={slugify(list.name)}>
      <div className="row-option-btn__option">
        {list.name}
        {list.description && (
          <p className="text-xsmall text-weight-normal text-gray">
            {list.description}
          </p>
        )}
        {list.sourceName && (
          <p className="text-xsmall text-weight-normal text-gray">
            source:{' '}
            <a href={list.sourceUrl} className="link-underline">
              {list.sourceName}
            </a>
          </p>
        )}
      </div>
      <div className="row-option-btn__btn">
        <RaisedButton
          onClick={handleOnImport}
          disabled={isDisabled}
          primary
          label="Import list"
        />
      </div>
    </div>
  );
};
ListImport.propTypes = {
  list: PropTypes.object.isRequired,
  onImport: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default ListImport;
