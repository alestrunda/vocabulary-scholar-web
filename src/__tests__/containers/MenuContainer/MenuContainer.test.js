import React from 'react';
import { shallow } from 'enzyme';

import MenuContainer from '../../../containers/MenuContainer';

it('renders correctly', () => {
  const root = shallow(<MenuContainer />);
  expect(root).toMatchSnapshot();
});

it('opens on button click', () => {
  const root = shallow(<MenuContainer />);
  expect(root.state('isVisible')).toBe(false);
  root.find('FloatingActionButton').simulate('click');
  expect(root.state('isVisible')).toBe(true);
});
