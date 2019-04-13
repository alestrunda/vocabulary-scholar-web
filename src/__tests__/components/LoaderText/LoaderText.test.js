import React from 'react';
import { shallow } from 'enzyme';

import LoaderText from '../../../components/LoaderText';

it('renders correctly', () => {
  const loader = shallow(<LoaderText />);
  expect(loader).toMatchSnapshot();
});

it('renders correctly custom text', () => {
  const loader = shallow(<LoaderText text="My loader" />);
  expect(loader).toMatchSnapshot();
});
