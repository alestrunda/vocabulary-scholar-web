import React from 'react';
import { shallow } from 'enzyme';

import BackgroundImage from '../../../components/BackgroundImage';

it('renders correctly', () => {
  const root = shallow(<BackgroundImage src="image.jpg" />);
  expect(root).toMatchSnapshot();
});
