import React from 'react';
import { shallow } from 'enzyme';

import PageBackground from '../../../containers/PageBackground';

it('renders correct', () => {
  const root = shallow(
    <PageBackground>
      <div className="children">text</div>
    </PageBackground>
  );
  expect(root.hasClass('bg-page')).toBe(true);
  expect(root.children('BackgroundImage').length).toEqual(1);
  expect(root.children('.children').length).toEqual(1);
});
