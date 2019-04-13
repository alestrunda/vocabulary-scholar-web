import React from 'react';
import { shallow } from 'enzyme';

import WordPreview from '../../../components/WordPreview';

const propsRequired = {
  id: 'school',
  word: 'school',
  onRating: jest.fn(),
};

const propsAll = {
  ...propsRequired,
  dateRated: 1533506400000,
  dateViewed: 1536184800000,
  dateAdded: 1530828000000,
  ratings: [4, 1, 5, 2, 3],
};

it('renders required props', () => {
  const word = shallow(<WordPreview {...propsRequired} />);
  expect(word).toMatchSnapshot();
});

it('renders all props', () => {
  const word = shallow(<WordPreview {...propsAll} />);
  expect(word).toMatchSnapshot();
});
