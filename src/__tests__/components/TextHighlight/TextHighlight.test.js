import React from 'react';
import { shallow } from 'enzyme';

import TextHighlight from '../../../components/TextHighlight';

it('renders correctly', () => {
  const onHighlight = jest.fn();
  const root = shallow(
    <TextHighlight onHighlight={onHighlight}>Lorem Ipsum</TextHighlight>
  );
  expect(root).toMatchSnapshot();
});

it('renders correctly highlighted part', () => {
  const onHighlight = jest.fn();
  const root = shallow(
    <TextHighlight start={0} end={5} onHighlight={onHighlight}>
      Lorem Ipsum
    </TextHighlight>
  );
  expect(root).toMatchSnapshot();
});
