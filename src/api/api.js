import axios from 'axios';
import { API_URL } from '../settings';

export const getWordData = entry => {
  return axios.get(`${API_URL}/entries/${entry}`);
};

export const getWordTranslation = (entry, targetLanguage) => {
  return axios.get(`${API_URL}/translate?word=${entry}&to=${targetLanguage}`);
};

export const querySearch = query => {
  return axios.get(`${API_URL}/search/${query}`);
};

export const getListsForImport = () => {
  return axios.get(`${API_URL}/lists`);
};

export const getUrl = url => {
  return axios.get(url);
};

export const getSupportedLanguages = () => {
  return axios.get(`${API_URL}/translate/languages`);
};

export const logError = (error, description) => {
  return axios.post(`${API_URL}/errors/`, { error, description });
};

export const parseSearchResponse = response => {
  if (!response.data) return [];
  return response.data.map(item => ({
    id: item.id,
    word: item.word,
  }));
};

export const parseWordResponse = response => {
  const result = response.data[0];
  const lexicalEntries = result.lexicalEntries.map(lexicalEntry => {
    const pronunciations = lexicalEntry.pronunciations
      ? {
          audio: lexicalEntry.pronunciations[0].audioFile,
          spelling: lexicalEntry.pronunciations[0].phoneticSpelling,
          dialects: lexicalEntry.pronunciations[0].dialects,
        }
      : {};
    let entries = lexicalEntry.entries.map(entry => {
      if (!entry.senses) return [];
      return entry.senses.map(sense => ({
        definitions: sense.definitions ? [...sense.definitions] : [],
        etymologies: sense.etymologies ? [...sense.etymologies] : [],
        shortDefinitions: [
          ...(sense.short_definitions ? sense.short_definitions : []),
          ...(sense.crossReferenceMarkers ? sense.crossReferenceMarkers : []),
        ],
        examples: sense.examples ? [...sense.examples] : [],
      }));
    });
    if (entries.every(entry => !entry.length) && lexicalEntry.derivativeOf) {
      //word has no definition entries, but some 'derivative of' data
      entries = lexicalEntry.derivativeOf.map(deriv => [
        {
          definitions: [],
          etymologies: [],
          shortDefinitions: [`derivative of ${deriv.text}`],
          examples: [],
        },
      ]);
    }
    return {
      entries: entries,
      category: lexicalEntry.lexicalCategory.text,
      pronunciations: pronunciations,
    };
  });
  return {
    id: result.id,
    word: result.word,
    lexicalEntries: lexicalEntries,
  };
};
