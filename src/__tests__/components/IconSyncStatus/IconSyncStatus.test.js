import React from 'react';
import { shallow } from 'enzyme';

import IconSyncStatus from '../../../components/IconSyncStatus';

it('renders correctly', () => {
  const root = shallow(<IconSyncStatus />);
  expect(root).toMatchSnapshot();
});
