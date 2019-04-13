import React from 'react';
import { shallow } from 'enzyme';

import Cover from '../../../components/Cover';

it('renders correct rate', () => {
  const rate = 0.75;
  const cover = shallow(<Cover rate={rate} />);
  expect(cover.prop('style')).toHaveProperty(
    'backgroundColor',
    'rgba(0, 0, 0, 0.75)'
  );
});

it('triggers click event', () => {
  const onClick = jest.fn();
  const cover = shallow(<Cover onClick={onClick} />);
  cover.simulate('click');
  expect(onClick).toHaveBeenCalled();
});

it('renders correctly', () => {
  const cover = shallow(<Cover />);
  expect(cover).toMatchSnapshot();
});

it('has active class', () => {
  const cover = shallow(<Cover isActive />);
  expect(cover.hasClass('active')).toBe(true);
});
