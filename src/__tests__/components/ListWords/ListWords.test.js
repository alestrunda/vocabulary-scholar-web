import React from 'react';
import { shallow } from 'enzyme';

import ListWords from '../../../components/ListWords';

it('renders correctly', () => {
  const listID = 'abc',
    itemsIDs = ['school', 'computer'],
    onSortChange = jest.fn(),
    onRating = jest.fn();
  const words = [
    {
      id: 'school',
      word: 'school',
      dateRated: 1544482800000,
      dateViewed: 1544569200000,
      dateAdded: 1544569200000,
      ratings: [4, 1, 5, 2, 3],
    },
    {
      id: 'computer',
      word: 'computer',
      dateRated: 1544482800000,
      dateViewed: 1544655600000,
      dateAdded: 1544655600000,
      ratings: [4],
    },
  ];
  const root = shallow(
    <ListWords
      onRating={onRating}
      onSortChange={onSortChange}
      listID={listID}
      itemsIDs={itemsIDs}
      items={words}
      itemsPerPage={10}
    />
  );
  const list = root.find('ListWords');
  expect(list).not.toBe(undefined);
});
