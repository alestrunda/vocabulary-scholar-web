import React from 'react';
import { shallow } from 'enzyme';

import PageFooter from '../../../components/PageFooter';

it('renders correctly', () => {
  const root = shallow(<PageFooter />);
  expect(root).toMatchSnapshot();
});
