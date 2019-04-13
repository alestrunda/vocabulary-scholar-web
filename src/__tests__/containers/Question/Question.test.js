import React from 'react';
import { shallow } from 'enzyme';

import { Question } from '../../../containers/Question/Question';

it('renders correctly', () => {
  const onAnswer = jest.fn();
  const onWordSetRating = jest.fn();
  const root = shallow(
    <Question
      onAnswer={onAnswer}
      onWordSetRating={onWordSetRating}
      words={{}}
    />
  );
  expect(root).toMatchSnapshot();
});
