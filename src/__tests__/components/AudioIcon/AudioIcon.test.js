import React from 'react';
import { shallow } from 'enzyme';

import AudioIcon from '../../../components/AudioIcon';

it('renders correctly', () => {
  const root = shallow(<AudioIcon src="audio.mp3" />);
  expect(root).toMatchSnapshot();
});
