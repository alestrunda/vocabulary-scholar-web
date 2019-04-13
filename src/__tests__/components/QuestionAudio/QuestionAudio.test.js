import React from 'react';
import { shallow } from 'enzyme';

import QuestionAudio from '../../../components/QuestionAudio';

it('renders correctly', () => {
  const root = shallow(<QuestionAudio audioSrc="file.mp3" wordID="school" />);
  expect(root).toMatchSnapshot();
});
