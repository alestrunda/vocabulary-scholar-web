import React from 'react';
import PropTypes from 'prop-types';
import NavigationCheck from 'material-ui/svg-icons/navigation/check';
import classNames from 'classnames';

const ListSelect = props => {
  const handleClick = () => {
    props.onClick(props.list.id, props.isSelected);
  };

  return (
    <div
      className={classNames(
        'list-select',
        {
          active: props.isSelected,
        },
        props.className
      )}
      onClick={handleClick}
      style={props.style}
    >
      <div className="list-select__icon">
        {props.isSelected && <NavigationCheck color="#fff" />}
      </div>
      <h3 className="text-wrap">{props.list.name}</h3>
      <p>Words: {props.list.wordIDs.length}</p>
    </div>
  );
};

ListSelect.propTypes = {
  className: PropTypes.string,
  list: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    wordIDs: PropTypes.array.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default ListSelect;
