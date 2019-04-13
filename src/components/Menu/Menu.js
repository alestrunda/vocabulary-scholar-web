import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import IconOpening from '../IconOpening';

const Menu = ({ className, isVisible, links, style }) => {
  const menuItems = links.map((link, index) => (
    <li className="navigation__item" key={index}>
      <Link
        className="navigation__link"
        to={link.path}
        data-testid={`menu-${link.path.substring(1, link.path.length)}`}
      >
        <IconOpening icon={link.icon}>{link.name}</IconOpening>
      </Link>
    </li>
  ));

  return (
    <div className={classNames(className, { active: isVisible })} style={style}>
      <div className={`${className}__content`}>
        <nav className="navigation">
          <ul className="navigation__list">{menuItems}</ul>
        </nav>
      </div>
    </div>
  );
};

Menu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
  className: PropTypes.string,
  isVisible: PropTypes.bool,
  style: PropTypes.object,
};

Menu.defaultProps = {
  isVisible: true,
};

export default Menu;
