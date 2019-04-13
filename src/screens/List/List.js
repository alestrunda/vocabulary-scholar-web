import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import PageHeader from '../../containers/PageHeader';
import ListWordsContainer from '../../containers/ListWordsContainer';
import PropertySingle from '../../components/PropertySingle';
import PageFooter from '../../components/PageFooter';
import ListSearch from '../../components/ListSearch';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { listRemove, listView, listSetWords } from '../../actions/list';
import { SNACKBAR_HIDE_DURATION, LIST_MAIN_ID } from '../../constants';

import {
  getDateStr,
  exportStoreToFile,
  objectToArray,
  listGetSortedWords,
} from '../../misc';

class List extends React.Component {
  state = {
    isDialogRemoveOpened: false,
    isSnackBarWordsRemovedOpened: false,
    wasListRemoved: false,
    isSelectableMode: false,
    wordsRemovedCnt: 0,
    selectedWordsIDs: [],
    searchQuery: '',
    autocompleteWords: [],
  };

  componentDidMount() {
    this.props.onListViewed(this.props.id);
  }

  handleEditWordsButton = () => {
    this.setState({
      isSelectableMode: !this.state.isSelectableMode,
      //filter out leftover words that have been deleted
      selectedWordsIDs: this.props.wordIDs.filter(wordID =>
        this.props.wordsAllIDs.includes(wordID)
      ),
    });
  };

  handleSnackBarWordsRemovedClose = () => {
    this.setState({
      isSnackBarWordsRemovedOpened: false,
    });
  };

  handleSelectableDone = () => {
    this.props.onSetListWords(this.props.id, this.state.selectedWordsIDs);
    this.setState({
      words: this.state.selectedWordsIDs,
      wordsRemovedCnt:
        this.props.wordIDs.length - this.state.selectedWordsIDs.length,
      isSelectableMode: false,
      isSnackBarWordsRemovedOpened: true,
      selectedWordsIDs: [],
    });
  };

  handleOnWordSelected = wordID => {
    let selectedWordsIDs = [...this.state.selectedWordsIDs];
    const index = selectedWordsIDs.indexOf(wordID);
    if (index > -1) selectedWordsIDs.splice(index, 1);
    else selectedWordsIDs.push(wordID);
    this.setState({
      selectedWordsIDs,
    });
  };

  handleDialogRemoveClose = () => {
    this.setState({
      isDialogRemoveOpened: false,
    });
  };

  handleDialogRemoveConfirm = () => {
    this.props.onListRemoved(this.props.id);
    this.setState({
      wasListRemoved: true,
    });
  };

  handleRemoveListClick = () => {
    this.setState({
      isDialogRemoveOpened: true,
    });
  };

  handleExportListClick = () => {
    const exportData = {
      lists: this.props.lists.filter(list => list.id === this.props.id),
    };
    exportStoreToFile(exportData);
  };

  renderRemoveDialog() {
    const dialogActions = [
      <RaisedButton
        className="ml10"
        key="btn-cancel"
        label="Cancel"
        onClick={this.handleDialogRemoveClose}
      />,
      <RaisedButton
        className="ml10"
        key="btn-remove"
        label="Remove"
        secondary
        onClick={this.handleDialogRemoveConfirm}
      />,
    ];
    return (
      <Dialog
        className="text-weight-bold text-big"
        actions={dialogActions}
        modal={false}
        open={this.state.isDialogRemoveOpened}
        onRequestClose={this.handleDialogRemoveClose}
      >
        Remove the list?
      </Dialog>
    );
  }

  handleRemoveLeftoverWords = () => {
    const existingWordsIDs = this.props.wordsAllIDs.filter(wordID =>
      this.props.wordIDs.includes(wordID)
    );
    this.setState({
      isSnackBarWordsRemovedOpened: true,
      wordsRemovedCnt: this.props.wordIDs.length - existingWordsIDs,
    });
    this.props.onSetListWords(this.props.id, existingWordsIDs);
  };

  render() {
    if (this.state.wasListRemoved) return <Redirect push to="/list" />;

    let hasLeftOverWords;
    if (!this.props.listNotFound) {
      hasLeftOverWords =
        this.props.wordIDs.findIndex(
          wordID => !this.props.wordsAllIDs.includes(wordID)
        ) !== -1;
    }

    return (
      <div className="page-all">
        <PageHeader>
          {this.props.listNotFound
            ? 'List not found'
            : `List: ${this.props.name}`}
        </PageHeader>
        <main className="page-content">
          {this.props.listNotFound && (
            <div className="container">
              <p className="text-error">List not found</p>
            </div>
          )}
          {!this.props.listNotFound && (
            <React.Fragment>
              <div className="container">
                <ListSearch words={this.props.wordsSorted} />
                {hasLeftOverWords && (
                  <div className="mt30 mb50 text-center">
                    <p className="mb15">
                      There appear to be some leftover words, that are no longer
                      in your favorites, would you like to remove them from the
                      list?
                    </p>
                    <RaisedButton
                      onClick={this.handleRemoveLeftoverWords}
                      label="Remove leftover words"
                      primary
                    />
                  </div>
                )}
              </div>
              <ListWordsContainer
                listID={
                  this.state.isSelectableMode ? LIST_MAIN_ID : this.props.id
                }
                selectable={this.state.isSelectableMode}
                items={
                  this.state.isSelectableMode
                    ? this.props.wordsAllSorted
                    : this.props.wordsSorted
                }
                itemsIDs={
                  this.state.isSelectableMode
                    ? this.props.wordsAllIDs
                    : this.props.wordIDs
                }
                onSelected={this.handleOnWordSelected}
                selectedWordsIDs={this.state.selectedWordsIDs}
                sortBy={this.props.sortBy}
                isDescSort={this.props.isDescSort}
              />
              <div className="container mt15">
                <div className="grid mb30">
                  <div className="grid__item grid__item--sm-span-6 text-xs-center">
                    <RaisedButton
                      onClick={this.handleEditWordsButton}
                      label={
                        this.state.isSelectableMode
                          ? 'Cancel editing'
                          : 'Edit words'
                      }
                      primary={!this.state.isSelectableMode}
                    />
                  </div>
                  <div className="grid__item grid__item--sm-span-6 grid__item--break-xs-10 text-right text-xs-center">
                    {this.state.isSelectableMode && (
                      <RaisedButton
                        primary
                        onClick={this.handleSelectableDone}
                        label="Done editing"
                      />
                    )}
                    {!this.state.isSelectableMode && (
                      <div>
                        <RaisedButton
                          onClick={this.handleExportListClick}
                          label="Export list"
                        />
                        <div className="m10" />
                        <RaisedButton
                          onClick={this.handleRemoveListClick}
                          label="Remove list"
                          secondary
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid">
                  <div className="grid__item grid__item--md-span-6">
                    <PropertySingle align="left" label="Last viewed">
                      {this.props.dateViewed
                        ? getDateStr(this.props.dateViewed)
                        : 'N/A'}
                    </PropertySingle>
                  </div>
                  <div className="grid__item grid__item--md-span-6">
                    <PropertySingle align="right" label="Date created">
                      {this.props.dateCreated
                        ? getDateStr(this.props.dateCreated)
                        : 'N/A'}
                    </PropertySingle>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </main>
        {this.renderRemoveDialog()}
        <Snackbar
          open={this.state.isSnackBarWordsRemovedOpened}
          message={`${
            this.state.wordsRemovedCnt > 0 ? 'Removed' : 'Added'
          } ${Math.abs(this.state.wordsRemovedCnt)} words`}
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarWordsRemovedClose}
        />
        <PageFooter />
      </div>
    );
  }
}

List.propTypes = {
  id: PropTypes.string,
  lists: PropTypes.array,
  wordIDs: PropTypes.array,
  wordsSorted: PropTypes.array,
  wordsAllIDs: PropTypes.array,
  wordsAllSorted: PropTypes.array,
  name: PropTypes.string,
  dateCreated: PropTypes.number,
  dateViewed: PropTypes.number,
  sortBy: PropTypes.string,
  isDescSort: PropTypes.bool,
  onListRemoved: PropTypes.func.isRequired,
  onSetListWords: PropTypes.func.isRequired,
  onListViewed: PropTypes.func.isRequired,
  listNotFound: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const urlID = ownProps.match.params.id; //get id part from url

  //find current list
  const currentList = state.lists.find(list => list.id === urlID);
  if (!currentList) {
    return { listNotFound: true };
  }

  const wordsAllArray = objectToArray(state.words);
  const wordsAllIDs = wordsAllArray.map(word => word.id);

  //get list's sorted words or not-sorted if sorted not available or not up to date
  const listWordIDsSorted = listGetSortedWords(
    currentList.wordIDs,
    currentList.wordIDsSorted,
    state.words
  );
  const listWordsWithDetailsSorted = listWordIDsSorted.map(
    wordID => state.words[wordID] //load all word's details
  );

  //user can add new words to current list, so we need to pass also all available words, possible with sorting
  const wordsAllIDsSorted = listGetSortedWords(
    wordsAllIDs,
    state.listsPredefined[LIST_MAIN_ID].wordIDsSorted,
    state.words
  );
  const wordsAllWithDetailsSorted = wordsAllIDsSorted.map(
    wordID => state.words[wordID] //load all word's details
  );

  return {
    lists: state.lists,
    ...currentList,
    wordsSorted: listWordsWithDetailsSorted,
    wordsAllIDs,
    wordsAllSorted: wordsAllWithDetailsSorted,
  };
};

const mapDispatchToProps = dispatch => ({
  onListRemoved: listID => dispatch(listRemove(listID)),
  onListViewed: listID => dispatch(listView(listID)),
  onSetListWords: (listID, selectedWordIDs) =>
    dispatch(listSetWords(listID, selectedWordIDs)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
