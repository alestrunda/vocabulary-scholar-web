import React from 'react';
import { shallow } from 'enzyme';

import { PhrasesWord } from '../../../containers/PhrasesWord/PhrasesWord';

const onWordRemovePhrase = jest.fn(),
  onAddPhrase = jest.fn(),
  onEditPhrase = jest.fn(),
  onPhraseSelected = jest.fn();

it('renders correctly', () => {
  const root = shallow(
    <PhrasesWord
      word="car"
      wordID="car"
      phraseSelected="Lorem ipsum"
      onWordRemovePhrase={onWordRemovePhrase}
      onAddPhrase={onAddPhrase}
      onEditPhrase={onEditPhrase}
      onPhraseSelected={onPhraseSelected}
    />
  );
  expect(root).toMatchSnapshot();
});

it('popup new phrase opened when phrase selected', () => {
  const root = shallow(
    <PhrasesWord
      word="car"
      wordID="car"
      onWordRemovePhrase={onWordRemovePhrase}
      phraseSelected="Lorem ipsum"
      onAddPhrase={onAddPhrase}
      onEditPhrase={onEditPhrase}
      onPhraseSelected={onPhraseSelected}
    />
  );
  expect(root.find('[data-test-id="popup-new-phrase"]').props().isActive).toBe(
    true
  );
});

it('opens new phrase popup', () => {
  const root = shallow(
    <PhrasesWord
      word="car"
      wordID="car"
      onWordRemovePhrase={onWordRemovePhrase}
      phraseSelected=""
      onAddPhrase={onAddPhrase}
      onEditPhrase={onEditPhrase}
      onPhraseSelected={onPhraseSelected}
    />
  );
  expect(root.find('[data-test-id="popup-new-phrase"]').props().isActive).toBe(
    false
  );
  root.find('[data-test-id="btn-new-phrase"]').simulate('click');
  expect(root.find('[data-test-id="popup-new-phrase"]').props().isActive).toBe(
    true
  );
});
