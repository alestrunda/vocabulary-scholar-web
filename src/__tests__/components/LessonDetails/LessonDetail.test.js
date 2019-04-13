import React from 'react';
import { shallow } from 'enzyme';

import LessonDetails from '../../../components/LessonDetails';

it('renders correctly', () => {
  const answers = [
    {
      word: {
        id: 'school',
        word: 'school',
      },
      answered: 'school',
    },
    {
      word: {
        id: 'car',
        word: 'car',
      },
      answered: 'bus',
    },
  ];
  const root = shallow(<LessonDetails answers={answers} />);
  expect(root).toMatchSnapshot();
});

it('renders correctly no items', () => {
  const answers = [];
  const root = shallow(<LessonDetails answers={answers} />);
  expect(root).toMatchSnapshot();
});
