import React from 'react';
import { shallow } from 'enzyme';

import PropertySingle from '../../../components/PropertySingle';

it('renders correctly', () => {
  const detail = 'detail';
  const content = <span>content</span>;
  const root = shallow(
    <PropertySingle detail={detail}>{content}</PropertySingle>
  );
  expect(root).toMatchSnapshot();
});
