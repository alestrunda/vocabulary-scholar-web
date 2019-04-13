import React from 'react';
import PropTypes from 'prop-types';
import ActionSearch from 'material-ui/svg-icons/action/search';
import Autocomplete from '../../components/Autocomplete';

class ListSearch extends React.Component {
  state = {
    searchQuery: '',
    autocompleteWords: [],
  };

  handleSearchChange = e => {
    const searchQuery = e.target.value;
    const searchQueryLen = searchQuery.length;
    let autocompleteWords;
    if (searchQueryLen) {
      const searchQueryNorm = searchQuery.toLowerCase();
      autocompleteWords = this.props.words.filter(
        word =>
          word.word.slice(0, searchQueryLen).toLowerCase() === searchQueryNorm
      );
    } else {
      autocompleteWords = [];
    }
    this.setState({
      searchQuery,
      autocompleteWords,
    });
  };

  render() {
    return (
      <form className="el-relative">
        <div className="form-icon form-icon--small">
          <ActionSearch className="form-icon__icon" />
          <input
            className="form-icon__input input-text input-text--small input-text--left-mid"
            onChange={this.handleSearchChange}
            type="text"
            value={this.state.searchQuery}
            placeholder="Search list"
          />
        </div>
        <Autocomplete hideIfEmpty words={this.state.autocompleteWords} />
      </form>
    );
  }
}

ListSearch.propTypes = {
  words: PropTypes.array,
};

ListSearch.defaultProps = {
  words: [],
};

export default ListSearch;
