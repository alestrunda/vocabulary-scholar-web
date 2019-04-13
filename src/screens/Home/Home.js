import React from 'react';
import PropTypes from 'prop-types';
import FormSearch from '../../containers/FormSearch';
import ListWordsContainer from '../../containers/ListWordsContainer';
import PageFooter from '../../components/PageFooter';
import PageHeader from '../../containers/PageHeader';
import LoaderText from '../../components/LoaderText';
import PopupImportLists from './components/PopupImportLists';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { LIST_MAIN_ID, SNACKBAR_HIDE_DURATION } from '../../constants';
import { objectToArray, listGetSortedWords } from '../../misc';
import { getListsForImport, getUrl } from '../../api/api';
import { wordsImport } from '../../actions/word';

class Home extends React.Component {
  state = {
    isImportListLoading: false,
    listsForImport: [],
    listsImportedUrls: [],
    popupImportDisabled: false,
    snackBarInfoOpened: false,
    snackBarInfoText: '',
  };

  componentDidMount() {
    this.loadWordListsForImport();
    this.handleListImportClick = this.handleListImportClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    //lists for import should be showed only when state is loaded and is empty
    if (!prevProps.isAppStateLoaded && this.props.isAppStateLoaded)
      this.loadWordListsForImport();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handlePopupImportClose = () => {
    this.setState({
      popupImportDisabled: true,
      isImportListLoading: false,
    });
  };

  async loadWordListsForImport() {
    //do not proceed until app state is ready and contains no words
    if (!this.props.isAppStateLoaded || this.props.wordsAllIDs.length !== 0)
      return;
    this.setState({
      isImportListLoading: true,
    });
    try {
      const res = await getListsForImport();
      if (this.isUnmounted) return;
      this.setState({
        listsForImport: res.data,
      });
    } catch (e) {
      if (this.isUnmounted) return;
      //just reset listsForImport so the list import is not displayed, do not show any error
      this.setState({
        listsForImport: [],
      });
    }
  }

  async handleListImportClick(listUrl) {
    let message = '';
    //disable the import button that was just clicked, list should be imported only once
    this.setState({
      listsImportedUrls: [...this.state.listsImportedUrls, listUrl],
    });
    try {
      let { data } = await getUrl(listUrl);
      this.props.onWordsImport(data);
      message = 'Words imported';
    } catch (e) {
      message = 'Import failed';
    }
    this.setState({
      snackBarInfoOpened: true,
      snackBarInfoText: message,
    });
  }

  handleSnackBarInfoClose = () => {
    this.setState({
      snackBarInfoOpened: false,
    });
  };

  render() {
    return (
      <div className="page-all">
        <PageHeader>Vocabulary Scholar</PageHeader>
        <main className="page-content">
          <div className="container">
            <FormSearch />
          </div>
          {this.state.isImportListLoading && (
            <LoaderText style={{ marginTop: 60, marginBottom: 60 }} />
          )}
          {!this.state.isImportListLoading && (
            <ListWordsContainer
              listID={this.props.id}
              items={this.props.wordsSorted}
              itemsIDs={this.props.wordsAllIDs}
              sortBy={this.props.sortBy || 'recommended'}
              isDescSort={this.props.isDescSort}
              extraSortingOptions={[
                { title: 'Default', sortingFuncName: 'recommended' },
              ]}
            />
          )}
        </main>
        <PageFooter />
        <PopupImportLists
          isActive={
            !this.state.popupImportDisabled &&
            this.state.listsForImport.length > 0
          }
          onClose={this.handlePopupImportClose}
          onImport={this.handleListImportClick}
          lists={this.state.listsForImport}
          listsUrls={this.state.listsImportedUrls}
        />
        <Snackbar
          open={this.state.snackBarInfoOpened}
          message={this.state.snackBarInfoText}
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarInfoClose}
        />
      </div>
    );
  }
}

Home.propTypes = {
  id: PropTypes.string,
  sortBy: PropTypes.string,
  isDescSort: PropTypes.bool,
  isAppStateLoaded: PropTypes.bool,
  wordsAllIDs: PropTypes.array.isRequired,
  wordsSorted: PropTypes.array.isRequired,
  onWordsImport: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onWordsImport: wordsArray => {
    //transform words array to object
    const words = {};
    wordsArray.map(word => (words[word.id] = { ...word }));
    dispatch(wordsImport(words));
  },
});

const mapStateToProps = state => {
  const list = state.listsPredefined[LIST_MAIN_ID];
  const wordsAllArray = objectToArray(state.words);
  const wordsAllIDs = wordsAllArray.map(word => word.id);

  const listWordIDsSorted = listGetSortedWords(
    wordsAllIDs,
    list.wordIDsSorted,
    state.words
  );

  const listWordsWithDetailsSorted = listWordIDsSorted.map(
    wordID => state.words[wordID]
  ); //load all word's data

  return {
    ...list,
    wordsAllIDs,
    wordsSorted: listWordsWithDetailsSorted,
    isAppStateLoaded: state.app.isStateLoaded,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
