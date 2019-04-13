import React from 'react';
import { shallow } from 'enzyme';

import QuestionPhrase from '../../../components/QuestionPhrase';

it('renders not available', () => {
  const word = 'abc',
    wordID = 'abc_123',
    phrase = 'Lorem ipsum dolor';
  const root = shallow(
    <QuestionPhrase word={word} wordID={wordID} phrase={phrase} />
  );
  expect(root).toMatchSnapshot();
});

it('renders correctly', () => {
  const word = 'abc',
    wordID = 'abc_123',
    phrase = 'Lorem ipsum dolor',
    startIndex = 6,
    endIndex = 11;
  const root = shallow(
    <QuestionPhrase
      word={word}
      wordID={wordID}
      phrase={phrase}
      startIndex={startIndex}
      endIndex={endIndex}
    />
  );
  expect(root).toMatchSnapshot();
});

it('renders correctly when disabled', () => {
  const word = 'abc',
    wordID = 'abc_123',
    phrase = 'Lorem ipsum dolor',
    startIndex = 6,
    endIndex = 11;
  const root = shallow(
    <QuestionPhrase
      word={word}
      wordID={wordID}
      phrase={phrase}
      startIndex={startIndex}
      endIndex={endIndex}
      disabled
    />
  );
  expect(root).toMatchSnapshot();
});
