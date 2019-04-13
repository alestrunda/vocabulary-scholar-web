import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import PageHeader from '../../containers/PageHeader';
import PageFooter from '../../components/PageFooter';
import ListWordsContainer from '../../containers/ListWordsContainer';
import ListSearch from '../../components/ListSearch';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import {
  objectToArray,
  isWordInPredefinedList,
  listGetSortedWords,
} from '../../misc';
import { SNACKBAR_HIDE_DURATION } from '../../constants';

class ListPredefiend extends React.Component {
  state = {
    snackBarListRemoveOpened: false,
    words: [],
    wordsIDs: [],
  };

  handleSnackBarListRemoveClose = () => {
    this.setState({
      snackBarListRemoveOpened: false,
    });
  };

  handleRemoveListClick = () => {
    this.setState({
      snackBarListRemoveOpened: true,
    });
  };

  render() {
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
              </div>
              <ListWordsContainer
                listID={this.props.id}
                items={this.props.wordsSorted}
                itemsIDs={this.props.wordsIDs}
              />
              <div className="container">
                <div className="text-right">
                  <span onClick={this.handleRemoveListClick}>
                    <RaisedButton disabled label="Remove list" />
                  </span>
                </div>
              </div>
            </React.Fragment>
          )}
        </main>
        <Snackbar
          open={this.state.snackBarListRemoveOpened}
          message="Predefined lists cannot be removed"
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarWordsRemovedClose}
        />
        <PageFooter />
      </div>
    );
  }
}

ListPredefiend.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  wordsAll: PropTypes.object,
  wordsSorted: PropTypes.array,
  wordsIDs: PropTypes.array,
  listNotFound: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const urlID = ownProps.match.params.id; //get id part from url
  const list = state.listsPredefined[urlID];
  if (!list) return { listNotFound: true };

  //find words for current list
  const listWords = objectToArray(state.words).filter(word =>
    isWordInPredefinedList(list.id, word)
  );
  const listWordIDs = listWords.map(word => word.id);

  //get list's sorted words or not-sorted if sorted not available or not up to date
  const listWordIDsSorted = listGetSortedWords(
    listWordIDs,
    list.wordIDsSorted,
    state.words
  );

  const listWordsWithDetailsSorted = listWordIDsSorted.map(
    wordID => state.words[wordID] //load all word's details
  );

  return {
    ...list,
    wordsSorted: listWordsWithDetailsSorted,
    wordsIDs: listWordIDs,
  };
};

export default connect(mapStateToProps)(ListPredefiend);
