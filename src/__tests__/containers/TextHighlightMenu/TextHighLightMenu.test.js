import React from 'react';
import { shallow } from 'enzyme';

import { TextHighlightMenu } from '../../../containers/TextHighlightMenu/TextHighlightMenu';

it('renders correctly', () => {
  const onPhraseSelected = jest.fn();
  const root = shallow(
    <TextHighlightMenu onPhraseSelected={onPhraseSelected} />
  );
  expect(root).toMatchSnapshot();
});
