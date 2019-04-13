import React from 'react';
import { shallow } from 'enzyme';

import WordSelectable from '../../../components/WordSelectable';

it('renders correctly', () => {
  const props = {
    id: 'school',
    word: 'school',
  };
  const root = shallow(<WordSelectable {...props} />);
  expect(root).toMatchSnapshot();
});

it('triggers onSelected', () => {
  const props = {
    id: 'school',
    word: 'school',
    checked: true,
  };
  const onSelected = jest.fn();
  const root = shallow(<WordSelectable onSelected={onSelected} {...props} />);
  root.simulate('click');
  expect(onSelected).toHaveBeenCalledWith(props.id, !props.checked);
});
