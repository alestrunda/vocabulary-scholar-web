import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '../Pagination';
import WordPreview from '../WordPreview';
import WordSelectable from '../WordSelectable';
import Snackbar from 'material-ui/Snackbar';
import WithWordSorting from '../../containers/WithWordSorting';
import { SNACKBAR_HIDE_DURATION } from '../../constants';

class ListWords extends React.Component {
  state = {
    lastRating: {},
    snackBarRatingOpened: false,
  };

  onWordSelected = wordID => {
    this.props.onSelected && this.props.onSelected(wordID);
  };

  handleOnRating = (wordID, word, rating) => {
    this.setState({
      lastRating: {
        word,
        rating,
      },
      snackBarRatingOpened: true,
    });
    this.props.onRating(wordID, rating);
  };

  handleSnackBarRatingClose = () => {
    this.setState({
      snackBarRatingOpened: false,
    });
  };

  handlePageChange = pageNumber => {
    this.props.onPageChange &&
      this.props.onPageChange(pageNumber, this.props.listID);
  };

  renderItems() {
    if (this.props.selectable) {
      return this.props.items.map(item => (
        <li key={item.id} className="list-borders__item">
          <WordSelectable
            checked={
              this.props.selectedWordsIDs.includes(item.id) ? true : false
            }
            onSelected={this.onWordSelected}
            {...item}
          />
        </li>
      ));
    } else {
      return this.props.items.map(item => (
        <li key={item.id} className="list-borders__item">
          <WordPreview onRating={this.handleOnRating} {...item} />
        </li>
      ));
    }
  }

  render() {
    const items = this.renderItems();

    return (
      <React.Fragment>
        <div className={this.props.className} style={this.props.style}>
          {items.length === 0 && (
            <div className="container">
              <p className="text-no-data mb60 mt60">No entries</p>
            </div>
          )}
          {items.length > 0 && (
            <React.Fragment>
              <Pagination
                activePage={this.props.activePage}
                listClassName="list-borders"
                paginationClassName="container mt20"
                onPageChange={this.handlePageChange}
                itemsPerPage={this.props.itemsPerPage}
              >
                {items}
              </Pagination>
            </React.Fragment>
          )}
        </div>
        <Snackbar
          open={this.state.snackBarRatingOpened}
          message={`Rating ${this.state.lastRating.rating} set for word '${
            this.state.lastRating.word
          }'`}
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarRatingClose}
        />
      </React.Fragment>
    );
  }
}

ListWords.propTypes = {
  listID: PropTypes.string,
  items: PropTypes.array,
  selectable: PropTypes.bool,
  className: PropTypes.string,
  onSelected: PropTypes.func,
  onRating: PropTypes.func.isRequired,
  selectedWordsIDs: PropTypes.array,
  style: PropTypes.object,
  activePage: PropTypes.number,
  onPageChange: PropTypes.func,
  itemsPerPage: PropTypes.number.isRequired,
};

ListWords.defaultProps = {
  items: [],
  selectable: false,
};

export default WithWordSorting(ListWords);
