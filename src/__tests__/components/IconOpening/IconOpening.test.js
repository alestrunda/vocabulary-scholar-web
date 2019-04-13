import React from 'react';
import { shallow } from 'enzyme';

import IconOpening from '../../../components/IconOpening';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

it('renders icon', () => {
  const iconOpening = shallow(<IconOpening icon={<ActionFavorite />} />);
  expect(iconOpening).toMatchSnapshot();
});

it('renders content', () => {
  const iconOpeningContent = 'Lorem Ipsum';
  const iconOpening = shallow(
    <IconOpening icon={<ActionFavorite />}>{iconOpeningContent}</IconOpening>
  );
  expect(iconOpening).toMatchSnapshot();
});
