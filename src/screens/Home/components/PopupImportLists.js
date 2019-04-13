import React from 'react';
import PropTypes from 'prop-types';
import Popup from '../../../components/Popup';
import ListImport from '../../../components/ListImport';

const PopupImportLists = ({
  isActive,
  lists,
  listsUrls,
  onClose,
  onImport,
}) => (
  <Popup title="Import words" isActive={isActive} onClose={onClose}>
    <div className="text-center mb25">
      <p className="text-big mb25">
        Looks like your vocabulary is empty, would you like to import some
        words?
      </p>
      {lists.map(list => (
        <ListImport
          list={list}
          key={list.name}
          onImport={onImport}
          isDisabled={listsUrls.includes(list.url)}
        />
      ))}
    </div>
  </Popup>
);

PopupImportLists.propTypes = {
  isActive: PropTypes.bool,
  lists: PropTypes.array,
  listsUrls: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
};

PopupImportLists.defaultProps = {
  lists: [],
  listsUrls: [],
};

export default PopupImportLists;
