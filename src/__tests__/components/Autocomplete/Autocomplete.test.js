import React from 'react';
import { shallow } from 'enzyme';

import Autocomplete from '../../../components/Autocomplete';

it('renders error', () => {
  const error = 'error message';
  const root = shallow(<Autocomplete error={error} />);
  expect(root.find('.autocomplete__empty').text()).toBe(error);
});

it('renders empty', () => {
  const root = shallow(<Autocomplete />);
  expect(root.find('.autocomplete__empty').text()).toBe('Nothing found');
});

it('renders words', () => {
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
  const root = shallow(<Autocomplete words={words} />);
  expect(root.find('ListWordLinks').length).toEqual(1);
});
