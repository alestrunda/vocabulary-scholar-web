import React from 'react';
import { shallow } from 'enzyme';

import RatingIcons from '../../../components/RatingIcons';

it('renders correctly', () => {
  const onCorrect = jest.fn();
  const onWrong = jest.fn();
  const ratingIcons = shallow(
    <RatingIcons onCorrect={onCorrect} onWrong={onWrong} />
  );
  expect(ratingIcons).toMatchSnapshot();
});

it('handles correct click', () => {
  const onCorrect = jest.fn();
  const onWrong = jest.fn();
  const ratingIcons = shallow(
    <RatingIcons onCorrect={onCorrect} onWrong={onWrong} />
  );
  ratingIcons.find('.rating-icons__btn--correct').simulate('click');
  expect(onCorrect).toHaveBeenCalled();
});

it('handles wrong click', () => {
  const onCorrect = jest.fn();
  const onWrong = jest.fn();
  const ratingIcons = shallow(
    <RatingIcons onCorrect={onCorrect} onWrong={onWrong} />
  );
  ratingIcons.find('.rating-icons__btn--wrong').simulate('click');
  expect(onWrong).toHaveBeenCalled();
});
