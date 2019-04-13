import React from 'react';
import { shallow } from 'enzyme';

import FormSearch from '../../../containers/FormSearch';

it('renders input field', () => {
  const formSearch = shallow(<FormSearch />);
  expect(formSearch.find('input[type="text"]').length).toBe(1);
});

it('renders search icon', () => {
  const formSearch = shallow(<FormSearch />);
  expect(formSearch.find('ActionSearch').exists()).toBe(true);
});

it('sets custom placeholder', () => {
  const placeholderText = 'My placeholder';
  const formSearch = shallow(<FormSearch placeholder={placeholderText} />);
  expect(formSearch.find('input[type="text"]').props().placeholder).toBe(
    placeholderText
  );
});

it('changes search text', () => {
  const searchText = 'Hello';
  const onSearch = jest.fn();
  const formSearch = shallow(<FormSearch onSearch={onSearch} />);
  formSearch
    .find('input[type="text"]')
    .simulate('change', { target: { value: searchText } });
  expect(formSearch.state('query')).toBe(searchText);
});

it('triggers onSearch', () => {
  const searchText = 'Hello';
  const onSearch = jest.fn();
  const formSearch = shallow(<FormSearch onSearch={onSearch} />);
  formSearch
    .find('input[type="text"]')
    .simulate('change', { target: { value: searchText } });
  expect(onSearch).toHaveBeenCalledWith(searchText);
});
