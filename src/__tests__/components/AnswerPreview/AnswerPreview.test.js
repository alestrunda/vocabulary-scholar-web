import React from 'react';
import { shallow } from 'enzyme';

import AnswerPreview from '../../../components/AnswerPreview';

it('renders correctly if correct', () => {
  const props = {
    word: 'school',
    answered: 'school',
  };
  const root = shallow(<AnswerPreview {...props} />);
  expect(root).toMatchSnapshot();
});

it('renders correctly if wrong', () => {
  const props = {
    word: 'school',
    answered: 'car',
  };
  const root = shallow(<AnswerPreview {...props} />);
  expect(root).toMatchSnapshot();
});

it('renders correctly when no answer', () => {
  const props = {
    word: 'school',
    answered: '',
  };
  const root = shallow(<AnswerPreview {...props} />);
  expect(root).toMatchSnapshot();
});
