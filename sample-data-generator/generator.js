/*global console*/
import { writeFile } from 'fs';
import englishWords from './english-words';
import { shuffle } from '../src/misc';
import { createLesson, createList, createWord } from './functions';

const lessonsToGenerate = 500,
  listsToGenerate = 500,
  wordsToGenerate = 5000,
  phrasesPerWordToGenerate = 5;

const randomEnglishWords = shuffle(englishWords).slice(0, wordsToGenerate);

const words = {};
for (let i = 0; i < wordsToGenerate; i++) {
  const randomWord = createWord(randomEnglishWords[i], englishWords, phrasesPerWordToGenerate);
  words[randomWord.id] = randomWord;
}

const lists = [];
for (let i = 0; i < listsToGenerate; i++) {
  lists.push(createList(words));
}

const lessons = [];
for (let i = 0; i < lessonsToGenerate; i++) {
  lessons.push(createLesson(lists));
}

const generatedContent = JSON.stringify({ lessons, lists, words });

writeFile('sample-data.json', generatedContent, err => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
  }
  console.log('File created'); // eslint-disable-line no-console
});
