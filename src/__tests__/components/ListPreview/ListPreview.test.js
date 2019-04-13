import React from 'react';
import { shallow } from 'enzyme';

import ListPreview from '../../../components/ListPreview';

it('renders correctly', () => {
  const words = {
    vigorous: {
      id: 'vigorous',
      word: 'vigorous',
      ratings: [4, 1, 5, 2, 3],
    },
    travel: {
      id: 'travel',
      word: 'travel',
    },
    car: {
      id: 'car',
      word: 'car',
      ratings: [1, 2],
    },
  };
  const list = {
    id: 1,
    name: 'List 1',
    wordIDs: ['vigorous', 'travel', 'car'],
    dateCreated: 1544482800000,
    dateViewed: 1544482800000,
  };
  const root = shallow(<ListPreview words={words} list={list} />);
  expect(root).toMatchSnapshot();
});
