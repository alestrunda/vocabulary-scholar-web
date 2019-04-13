import React from 'react';
import { shallow } from 'enzyme';

import { PageHeader } from '../../../containers/PageHeader/PageHeader';

it('renders correctly', () => {
  const root = shallow(
    <PageHeader isStateLoaded={false} isStoreLoadedFromDrive={false}>
      Page Title
    </PageHeader>
  );
  expect(root).toMatchSnapshot();
});
