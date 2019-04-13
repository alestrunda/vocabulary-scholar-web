import React from 'react';
import { shallow } from 'enzyme';

import QuestionWord from '../../../components/QuestionWord';

it('renders not available', () => {
  const root = shallow(<QuestionWord word="" wordID="school" />);
  expect(root).toMatchSnapshot();
});

it('renders correctly', () => {
  const root = shallow(<QuestionWord word="School" wordID="school" />);
  expect(root).toMatchSnapshot();
});
