/*global document*/

import React from 'react';
import PropTypes from 'prop-types';
import { menuItems } from '../../menuItems';
import Menu from '../../components/Menu';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import classNames from 'classnames';

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = {
    isVisible: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(e) {
    //close menu when clicked outside the menu button
    if (this.buttonRef.current.contains(e.target)) return;
    this.closeMenu();
  }

  closeMenu = () => {
    this.setState({
      isVisible: false,
    });
  };

  handleMenuButtonClick = () => {
    this.setState({
      isVisible: !this.state.isVisible, //toggle visibility
    });
  };

  render() {
    const menuLinks = menuItems.map(item => ({
      name: item.name,
      path: item.path,
      icon: item.icon,
    }));
    return (
      <aside
        className={classNames('page-navigation', this.props.className)}
        style={this.props.style}
      >
        <div
          ref={this.buttonRef}
          className={classNames('page-navigation__btn', {
            active: this.state.isVisible,
          })}
        >
          <FloatingActionButton
            style={{ width: 40, height: 40 }}
            iconStyle={{ width: 40, height: 40 }}
            backgroundColor="#fff"
            onClick={this.handleMenuButtonClick}
          >
            <NavigationMenu
              style={{
                width: 26,
                fill: '#00adb5',
                opacity: this.state.isVisible ? 0 : 1,
              }}
            />
            <NavigationClose
              className="navigation-icon-close"
              style={{
                fill: '#00adb5',
                width: 28,
                opacity: this.state.isVisible ? 1 : 0,
              }}
            />
          </FloatingActionButton>
        </div>
        <Menu
          className="page-navigation__menu"
          isVisible={this.state.isVisible}
          links={menuLinks}
          onClose={this.closeMenu}
        />
      </aside>
    );
  }
}

MenuContainer.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default MenuContainer;
