import React from 'react';
import { shallow } from 'enzyme';

import PhraseWordSettings from '../../../components/PhraseWordSettings';

it('renders correctly', () => {
  const wordID = 'school',
    word = 'School',
    onSubmit = jest.fn();
  const root = shallow(
    <PhraseWordSettings wordID={wordID} word={word} onSubmit={onSubmit} />
  );
  expect(root).toMatchSnapshot();
});

it('renders correctly with phrase data passed', () => {
  const wordID = 'school',
    word = 'School',
    onSubmit = jest.fn();
  const phrase = {
    phrase: 'Lorem ipsum',
    startIndex: 0,
    endIndex: 10,
  };
  const root = shallow(
    <PhraseWordSettings
      wordID={wordID}
      word={word}
      phrase={phrase}
      onSubmit={onSubmit}
    />
  );
  expect(root).toMatchSnapshot();
});

it('triggers onSubmit', () => {
  const wordID = 'school',
    word = 'School',
    onSubmit = jest.fn();
  const phrase = {
    phrase: 'Lorem ipsum',
    startIndex: 0,
    endIndex: 10,
  };
  const root = shallow(
    <PhraseWordSettings
      wordID={wordID}
      word={word}
      phrase={phrase}
      onSubmit={onSubmit}
    />
  );
  root.find('RaisedButton').simulate('click');
  expect(onSubmit).toHaveBeenCalledWith(
    phrase.phrase,
    phrase.startIndex,
    phrase.endIndex
  );
});
