# Vocabulary scholar - Web

`Project for my bachelor's thesis.`

The whole *vocabulary scholar* project consists of 3 parts:

- Mobile app made with react native

- Web app (current) made with react

- Server API made with node.js

Web and mobile apps are quite the same.

## Application details

Vocabulary scholar is personal educational application for learning english words. It uses Oxford Dictionaries and/or Wordnet (Princeton University) to get word definitions including examples and audio files with pronunciation. For translation service is uses Microsoft Azure. All that traffic goes through the server part. Then to sync web and mobile parts apps use Google Drive.

You can search for a `word`, save it as favorite, set your own word rating, even add various word data, like phrases. Having lots of words in one place can get a bit messy, that's why you can use `lists` to separate the words and focus on what you want to learn. To enhance learning experience app allows to create `lessons`, where you can browse the words automatically. For each of your lessons app also stores your best scrore and time, so you can track your progress.

Build as SPA using react, redux, material-ui, sass...

[User guide](http://vocabulary-scholar-user-guide.alestrunda.cz)

[Documentation](http://vocabulary-scholar-docs.alestrunda.cz/)

## Scripts

### `npm start`

starts the App

### `npm run build`

builds the App

### `npm test`

tests the App using `Jest`

### `npm run cypress:open`

(make sure the app it running locally)

opens cypress test manager for E2E testing

### `npm run cypress:run`

(make sure the app it running locally)

runs cypress headless browser for E2E testing

### `npm run generate-sample`

generates sample data from 10k english words, random ratings, phrases, lists... Data makes no sense, just for testing purposes to see how app handles different amounts of data. Saved in file *sample-data.json*.
