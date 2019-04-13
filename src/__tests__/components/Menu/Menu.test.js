import React from 'react';
import { shallow } from 'enzyme';

import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import Menu from '../../../components/Menu';

it('renders menu list', () => {
  const menuItems = [];
  const menu = shallow(<Menu links={menuItems} />);
  expect(menu.find('ul').length).toBe(1);
});

it('rendes menu items', () => {
  const menuItems = [
    {
      path: '/',
      name: 'Home',
      icon: <ActionFavorite />,
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: <ActionFavorite />,
    },
  ];
  const menu = shallow(<Menu links={menuItems} />);
  expect(menu.find('li').length).toBe(2);
});

it('switches active class', () => {
  const menuItems = [];
  const menu = shallow(<Menu links={menuItems} />);
  expect(menu.hasClass('active')).toBe(true);
  menu.setProps({ isVisible: false });
  expect(menu.hasClass('active')).toBe(false);
});

it('renders link', () => {
  const link = {
    path: '/',
    name: 'Home',
  };
  const menuItems = [link];
  const menu = shallow(<Menu links={menuItems} />);
  expect(menu.find('Link').props().to).toBe(link.path);
});
