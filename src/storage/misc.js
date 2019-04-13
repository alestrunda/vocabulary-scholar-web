export const hasDataChanged = (newData, oldData) => {
  for (let key in newData) {
    //data come from immutable redux store, so just compare the references
    if (newData[key] !== oldData[key]) return true;
  }
  return false;
};

export const getInitState = () => ({
  lessons: [],
  lists: [],
  words: {},
});

export const processDataFromStoreToSave = state =>
  //get the parts of store containing persistent data
  JSON.stringify(getPartsOfStoreToSave(state));

export const getPartsOfStoreToSave = state => {
  //get the parts of store containing persistent data
  return {
    app: {
      language: state.app.language,
      itemsPerPage: state.app.itemsPerPage,
    },
    words: state.words,
    lists: state.lists,
    lessons: state.lessons,
  };
};
