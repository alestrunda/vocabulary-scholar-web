import React from 'react';
import { shallow } from 'enzyme';

import Hint from '../../../components/Hint';
import { HINT } from '../../../constants';

it('renders nothing', () => {
  const hint = shallow(<Hint />);
  expect(hint.children().length).toEqual(0);
});

it('renders image', () => {
  const imageSrc = 'image_src';
  const hint = shallow(
    <Hint hint={imageSrc} hintType={HINT.IMAGE} word="car" wordID="car" />
  );
  expect(hint.find(`img[src="${imageSrc}"]`).length).toEqual(1);
});

it('renders audio', () => {
  const hint = shallow(
    <Hint hint={'audioSrc'} hintType={HINT.AUDIO} word="car" wordID="car" />
  );
  expect(hint.find('AudioIconApiLoad').length).toEqual(1);
});
