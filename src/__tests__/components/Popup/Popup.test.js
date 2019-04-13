import React from 'react';
import { shallow } from 'enzyme';
import Popup from '../../../components/Popup';

it('renders correctly', () => {
  const popup = shallow(
    <Popup>
      <p>Lorem impsum</p>
    </Popup>
  );
  expect(popup).toMatchSnapshot();
});

it('closes when clicked outside', () => {
  const onClose = jest.fn();
  const popup = shallow(
    <Popup onClose={onClose}>
      <p>Lorem impsum</p>
    </Popup>
  );
  popup.find('Cover').simulate('click');
  expect(onClose).toHaveBeenCalled();
});

it('has active class', () => {
  const popup = shallow(
    <Popup isActive>
      <p>Lorem impsum</p>
    </Popup>
  );
  expect(popup.find('Paper').hasClass('active')).toBe(true);
});
