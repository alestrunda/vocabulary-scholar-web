import React from 'react';
import { shallow } from 'enzyme';

import QuestionImage from '../../../components/QuestionImage';

it('renders loading', () => {
  const root = shallow(<QuestionImage imageSrc="file.mp3" wordID="school" />);
  expect(root).toMatchSnapshot();
});

it('renders error', () => {
  const root = shallow(<QuestionImage imageSrc="file.mp3" wordID="school" />);
  root.setState({
    error: true,
  });
  expect(root).toMatchSnapshot();
});

it('renders correctly', () => {
  const root = shallow(<QuestionImage imageSrc="file.mp3" wordID="school" />);
  root.setState({
    loaded: true,
  });
  expect(root).toMatchSnapshot();
});
