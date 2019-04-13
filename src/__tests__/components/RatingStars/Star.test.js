import React from 'react';
import { shallow } from 'enzyme';

import Star from '../../../components/RatingStars/Star';

it('rendes correctly', () => {
  const star = shallow(<Star />);
  expect(star).toMatchSnapshot();
});

it('renders star', () => {
  const size = 20,
    color = '#f00';
  const star = shallow(<Star size={size} color={color} />);
  expect(star.find('ToggleStar').prop('style')).toHaveProperty('width', size);
  expect(star.find('ToggleStar').prop('color')).toBe(color);
});

it('triggers onClick', () => {
  const starNumber = 3,
    onClick = jest.fn();
  const star = shallow(<Star onClick={onClick} number={starNumber} />);
  star.simulate('click');
  expect(onClick).toHaveBeenCalledWith(starNumber);
});

it('triggers onMouseEnter', () => {
  const starNumber = 4,
    onMouseEnter = jest.fn();
  const star = shallow(
    <Star onMouseEnter={onMouseEnter} number={starNumber} />
  );
  star.simulate('mouseenter');
  expect(onMouseEnter).toHaveBeenCalledWith(starNumber);
});

it('triggers onMouseLeave', () => {
  const starNumber = 2,
    onMouseLeave = jest.fn();
  const star = shallow(
    <Star onMouseLeave={onMouseLeave} number={starNumber} />
  );
  star.simulate('mouseleave');
  expect(onMouseLeave).toHaveBeenCalledWith(starNumber);
});
