import React from 'react';
import { shallow } from 'enzyme';

import WordListsEdit from '../../../components/WordListsEdit';

const wordID = 'school',
  lists = [
    {
      id: '1',
      name: 'List name',
      wordIDs: ['word1', 'word2'],
      dateCreated: 1544482800000,
      dateViewed: 1532028111990,
    },
    {
      id: '2',
      name: 'List 2 name',
      wordIDs: ['word2', 'word3'],
      dateCreated: 1544482800000,
      dateViewed: 1532028111990,
    },
  ];

it('renders correctly', () => {
  const onListSelected = jest.fn();
  const lists = [
    {
      id: '1',
      name: 'List name',
      wordIDs: ['word1', 'word2'],
      dateCreated: 1544482800000,
      dateViewed: 1532028111990,
    },
    {
      id: '2',
      name: 'List 2 name',
      wordIDs: ['word2', 'word3'],
      dateCreated: 1544482800000,
      dateViewed: 1532028111990,
    },
  ];
  const root = shallow(
    <WordListsEdit
      wordID={wordID}
      lists={lists}
      onListSelected={onListSelected}
    />
  );
  expect(root).toMatchSnapshot();
});

it('renders correctly opened popup', () => {
  const onListSelected = jest.fn();
  const root = shallow(
    <WordListsEdit
      wordID={wordID}
      lists={lists}
      onListSelected={onListSelected}
    />
  );
  root.find('RaisedButton').simulate('click');
  expect(root).toMatchSnapshot();
});

it('triggers onListSelected', () => {
  const onListSelected = jest.fn();
  const root = shallow(
    <WordListsEdit
      wordID={wordID}
      lists={lists}
      onListSelected={onListSelected}
    />
  );
  root.find('RaisedButton').simulate('click'); //opens popup
  root
    .find('ListSelect')
    .first()
    .simulate('click'); //selects list
  expect(onListSelected).toHaveBeenCalled();
});
