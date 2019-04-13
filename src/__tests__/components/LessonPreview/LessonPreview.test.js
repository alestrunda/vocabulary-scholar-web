import React from 'react';
import { shallow } from 'enzyme';

import LessonPreview from '../../../components/LessonPreview';

it('renders correctly', () => {
  const root = shallow(
    <LessonPreview
      type="audio"
      name="lesson name"
      questionsCnt={30}
      bestScore={0.65}
      dateViewed={1544482800000}
    />
  );
  expect(root).toMatchSnapshot();
});
