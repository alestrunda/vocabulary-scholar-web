import React from 'react';
import { shallow } from 'enzyme';

import ListSelect from '../../../components/ListSelect';

it('renders correctly', () => {
  const list = {
    id: '1',
    name: 'List 1',
    wordIDs: ['vigorous', 'travel', 'car'],
    dateCreated: 1544482800000,
    dateViewed: 1544482800000,
  };
  const onClick = jest.fn();
  const root = shallow(<ListSelect isSelected onClick={onClick} list={list} />);
  expect(root).toMatchSnapshot();
});

it('triggers onClick', () => {
  const list = {
    id: '1',
    name: 'List 1',
    wordIDs: ['vigorous', 'travel', 'car'],
    dateCreated: 1544482800000,
    dateViewed: 1544482800000,
  };
  const isSelected = true;
  const onClick = jest.fn();
  const root = shallow(
    <ListSelect isSelected={isSelected} onClick={onClick} list={list} />
  );
  root.simulate('click');
  expect(onClick).toHaveBeenCalledWith(list.id, isSelected);
});
