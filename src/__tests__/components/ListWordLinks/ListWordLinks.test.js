import React from 'react';
import { shallow } from 'enzyme';

import ListWordLinks from '../../../components/ListWordLinks';

it('renders correctly', () => {
  const words = [
    {
      id: 'school',
      word: 'school',
    },
    {
      id: 'car',
      word: 'car',
    },
    {
      id: 'travel',
      word: 'travel',
    },
  ];
  const root = shallow(<ListWordLinks words={words} />);
  expect(root).toMatchSnapshot();
});
