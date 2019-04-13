import React from 'react';
import { shallow } from 'enzyme';

import AutocompleteWord from '../../../containers/AutocompleteWord';

it('renders correctly', () => {
  const query = 'query';
  const root = shallow(<AutocompleteWord query={query} />);
  expect(root).toMatchSnapshot();
});
