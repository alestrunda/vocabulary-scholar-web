import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';

const Dropdown = ({ children, classname }) => (
  <Paper className={classNames('dropdown', classname)}>
    <Menu
      style={{ width: '100%' }}
      listStyle={{ paddingTop: 0, paddingBottom: 0 }}
    >
      {children.map((child, index) => (
        <span key={index} className="dropdown__item-wrapper">
          {child}
        </span>
      ))}
    </Menu>
  </Paper>
);

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  classname: PropTypes.string,
};

export default Dropdown;
