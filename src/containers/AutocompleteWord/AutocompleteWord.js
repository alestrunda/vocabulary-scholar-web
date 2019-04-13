import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '../../components/Autocomplete';
import { querySearch, parseSearchResponse } from '../../api/api';
import debounce from 'lodash.debounce';
import { MIN_WORD_LENGTH_SEARCH } from '../../constants';

class AutocompleteWord extends React.Component {
  constructor(props) {
    super(props);
    this.loadWords = debounce(this.loadWords, 2000);
  }

  state = {
    words: [],
    error: '',
    resultsReady: false,
  };

  componentDidMount() {
    this.loadWords(this.props.query);
    this.props.onLoadingStart && this.props.onLoadingStart();
  }

  componentDidUpdate(prevProps) {
    //update results when search query changes
    if (prevProps.query === this.props.query) return;
    this.setState({
      resultsReady: false,
    });
    this.loadWords(this.props.query);
    this.props.onLoadingStart && this.props.onLoadingStart();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  loadWords = async query => {
    let words,
      error = '';
    if (query.length < this.props.minWordTreshold) {
      words = [];
      error = 'Query too short';
    } else {
      try {
        const data = await querySearch(query);
        words = parseSearchResponse(data);
      } catch (e) {
        words = [];
        if (e.response && e.response.status === 403)
          error = 'Max number of queries reached, try again later';
        else error = 'Service not available';
      }
    }
    //do not update if component already unmounted - though it's an anti-pattern, found no 'clean' way how to solve it in async function
    if (this.isUnmounted) return;
    this.setState({
      words,
      error,
      resultsReady: true,
    });
    this.props.onLoadingDone && this.props.onLoadingDone();
  };

  render() {
    if (
      (!this.state.resultsReady && this.state.words.length === 0) || //results from current search are not ready yet and there are no words from previous search
      this.props.query.length < this.props.minWordTreshold //search query too short
    )
      return null;
    return (
      <Autocomplete
        className={this.props.className}
        error={this.state.error}
        style={this.props.style}
        words={this.state.words}
      />
    );
  }
}

AutocompleteWord.propTypes = {
  className: PropTypes.string,
  query: PropTypes.string.isRequired,
  minWordTreshold: PropTypes.number,
  style: PropTypes.object,
  onLoadingDone: PropTypes.func,
  onLoadingStart: PropTypes.func,
};

AutocompleteWord.defaultProps = {
  minWordTreshold: MIN_WORD_LENGTH_SEARCH,
};

export default AutocompleteWord;
