import React from 'react';
import { shallow } from 'enzyme';

import PhraseWordPreview from '../../../components/PhraseWordPreview';

it('renders correctly', () => {
  const phrase = {
    id: 'abc123',
    phrase: 'Lorem ipsum dolor',
    startIndex: 6,
    endIndex: 11,
  };
  const root = shallow(<PhraseWordPreview {...phrase} />);
  expect(root).toMatchSnapshot();
});

it('triggers onEdit', () => {
  const phrase = {
    id: 'abc123',
    phrase: 'Lorem ipsum dolor',
    startIndex: 6,
    endIndex: 11,
  };
  const onEdit = jest.fn();
  const root = shallow(<PhraseWordPreview onEdit={onEdit} {...phrase} />);
  root.find('[data-testid="btn-edit"]').simulate('click');
  expect(onEdit).toHaveBeenCalledWith(phrase.id);
});

it('triggers onRemove', () => {
  const phrase = {
    id: 'abc123',
    phrase: 'Lorem ipsum dolor',
    startIndex: 6,
    endIndex: 11,
  };
  const onRemove = jest.fn();
  const root = shallow(<PhraseWordPreview onRemove={onRemove} {...phrase} />);
  root.find('[data-testid="btn-remove"]').simulate('click');
  expect(onRemove).toHaveBeenCalledWith(phrase.id);
});
