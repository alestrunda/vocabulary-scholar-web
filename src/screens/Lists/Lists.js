import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import PageHeader from '../../containers/PageHeader';
import PageFooter from '../../components/PageFooter';
import ListPreviewContainer from '../../containers/ListPreviewContainer';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { listCreate } from '../../actions/list';
import { SNACKBAR_HIDE_DURATION } from '../../constants';
import {
  populatePredefinedLists,
  objectToArray,
  compareByName,
  getAverageRatingByWordID,
  wordsToArray,
} from '../../misc';

class Lists extends React.Component {
  state = {
    snackBarListCreatedOpened: false,
    formNewListOpened: false,
    newListName: '',
    newListNameCreated: '',
    newListError: '',
    sortBy: 'name',
  };

  handleNewListClick = () => {
    this.setState({
      formNewListOpened: !this.state.formNewListOpened,
    });
  };

  handleNewListNameChange = event => {
    this.setState({
      newListName: event.target.value,
    });
  };

  handleCreateListClick = () => {
    this.createNewList();
  };

  handleCreateListSubmit = e => {
    e.preventDefault();
    this.createNewList();
  };

  handleSortByChange = (event, index, value) => {
    this.setState({
      sortBy: value,
    });
  };

  createNewList() {
    if (!this.state.newListName) {
      this.setState({
        newListError: 'This field is required',
      });
      return;
    }
    this.props.onNewListCreated(this.state.newListName);
    this.setState({
      newListName: '',
      newListNameCreated: this.state.newListName,
      formNewListOpened: false,
      snackBarListCreatedOpened: true,
      newListError: '',
    });
  }

  handleSnackBarListCreatedClose = () => {
    this.setState({
      snackBarListCreatedOpened: false,
      newListNameCreated: '',
    });
  };

  render() {
    const wordsArray = wordsToArray(this.props.words);
    const listsPredefinedPopulated = objectToArray(
      populatePredefinedLists(this.props.listsPredefined, wordsArray)
    );
    const sortingOptions = [
      { title: 'Average Rating', value: 'average-rating' },
      { title: 'Date Created', value: 'date-created' },
      { title: 'Least Recently Viewed', value: 'least-recently-viewed' },
      { title: 'Name', value: 'name' },
    ];

    //sort lists
    let listsSorted = [...this.props.lists];
    if (this.state.sortBy === 'name') {
      listsSorted.sort((itemA, itemB) => compareByName(itemA, itemB));
    } else if (this.state.sortBy === 'least-recently-viewed') {
      listsSorted.sort((itemA, itemB) => {
        if (!itemA.dateViewed) return -1;
        if (!itemB.dateViewed) return 1;
        const compare = itemA.dateViewed - itemB.dateViewed;
        //if equal sort by name
        if (compare === 0) return compareByName(itemA, itemB);
        return compare;
      });
    } else if (this.state.sortBy === 'date-created') {
      listsSorted.sort((itemA, itemB) => {
        if (!itemA.dateCreated) return 1;
        if (!itemB.dateCreated) return -1;
        const compare = itemB.dateCreated - itemA.dateCreated;
        //if equal sort by name
        if (compare === 0) return compareByName(itemA, itemB);
        return compare;
      });
    } else if (this.state.sortBy === 'average-rating') {
      listsSorted.sort((itemA, itemB) => {
        const ratingMinimum = 0;
        const avgRatingA = getAverageRatingByWordID(
          itemA.wordIDs,
          this.props.words,
          ratingMinimum
        );
        const avgRatingB = getAverageRatingByWordID(
          itemB.wordIDs,
          this.props.words,
          ratingMinimum
        );
        const compare = avgRatingB - avgRatingA;
        //if equal sort by name
        if (compare === 0) return compareByName(itemA, itemB);
        return compare;
      });
    }

    return (
      <div className="page-all">
        <PageHeader>Your lists</PageHeader>
        <main className="page-content">
          <div className="container">
            <div className="grid grid--mid">
              {listsSorted.map(list => (
                <div
                  className="grid__item grid__item--xxxl-span-2 grid__item--xl-span-3 grid__item--lg-span-4 grid__item--md-span-6"
                  key={list.id}
                >
                  <Link
                    data-testid="user-list"
                    style={{ display: 'block' }}
                    to={`/list/${list.id}`}
                  >
                    <ListPreviewContainer list={list} />
                  </Link>
                </div>
              ))}
            </div>
            <div className="grid grid--items-center">
              <div className="grid__item grid__item--sm-span-6">
                <SelectField
                  style={{ width: '100%', maxWidth: 300 }}
                  floatingLabelText="Sort by"
                  value={this.state.sortBy}
                  onChange={this.handleSortByChange}
                >
                  {sortingOptions.map(option => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      primaryText={option.title}
                    />
                  ))}
                </SelectField>
              </div>
              <div className="grid__item grid__item--sm-span-6 text-right">
                <RaisedButton
                  className="mb15 mt15"
                  data-testid="button-new-list"
                  onClick={this.handleNewListClick}
                  primary
                  label="New list"
                />
                <p>
                  Total:{' '}
                  <span className="text-weight-bold">{listsSorted.length}</span>
                </p>
              </div>
            </div>
            {this.state.formNewListOpened && (
              <Paper className="mt30 wrapper-width-small el-center">
                <div className="container">
                  <div className="m15" />
                  <h3 className="mb0 text-center">New list</h3>
                  <form
                    onSubmit={this.handleCreateListSubmit}
                    data-testid="form-new-list"
                    className="grid grid--items-bottom"
                  >
                    <div className="grid__item grid__item--md-span-7">
                      <TextField
                        style={{ width: '100%', marginBottom: 0 }}
                        className="mb10"
                        floatingLabelText="List name"
                        onChange={this.handleNewListNameChange}
                        value={this.state.newListName}
                        errorText={this.state.newListError}
                      />
                    </div>
                    <div className="grid__item grid__item--md-span-5 text-right">
                      <RaisedButton
                        className="mb10 mt10"
                        primary
                        onClick={this.handleCreateListClick}
                        label="Create list"
                      />
                    </div>
                  </form>
                  <div className="m5" />
                </div>
              </Paper>
            )}
            <div className="m30" />
          </div>
          <div className="bg-light">
            <div className="m30" />
            <div className="container">
              <h2 className="mb15">Default lists</h2>
              <div className="grid grid--mid">
                {listsPredefinedPopulated.map(list => (
                  <div
                    className="grid__item grid__item--xxxl-span-2 grid__item--xl-span-3 grid__item--lg-span-4 grid__item--md-span-6"
                    key={list.id}
                  >
                    <Link
                      data-testid="predefined-list"
                      style={{ display: 'block' }}
                      to={`/list/predefined/${list.id}`}
                    >
                      <ListPreviewContainer compact list={list} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Snackbar
          open={this.state.snackBarListCreatedOpened}
          message={`List '${this.state.newListNameCreated}' created`}
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarListCreatedClose}
        />
        <PageFooter />
      </div>
    );
  }
}

Lists.propTypes = {
  lists: PropTypes.array,
  listsPredefined: PropTypes.object,
  words: PropTypes.object,
  onNewListCreated: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lists: state.lists,
  words: state.words,
  listsPredefined: state.listsPredefined,
});

const mapDispatchToProps = dispatch => ({
  onNewListCreated: name => dispatch(listCreate({ name })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists);
