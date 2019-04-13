/*global document*/

import React from 'react';
import PropTypes from 'prop-types';
import ActionSearch from 'material-ui/svg-icons/action/search';
import CircularProgress from 'material-ui/CircularProgress';
import classNames from 'classnames';
import AutocompleteWord from '../AutocompleteWord';
import { Redirect } from 'react-router';
import { queryToWordID } from '../../misc';

class FormSearch extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  state = {
    query: '',
    isAutocompleteLoading: false,
    isAutocompleteVisible: true,
    isFormSubmitted: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(e) {
    //hide autocomplete when clicked outside the root element
    if (this.rootRef.current.contains(e.target)) return;
    this.setState({
      isAutocompleteVisible: false,
    });
  }

  handleInputChange = e => {
    const value = e.target.value;
    this.setState({
      query: value,
      isAutocompleteVisible: true,
    });
    this.props.onSearch && this.props.onSearch(value);
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query) {
      this.setState({
        isFormSubmitted: true,
      });
    }
  };

  onAutocompleteLoading = () => {
    this.setState({
      isAutocompleteLoading: true,
    });
  };

  onAutocompleteDone = () => {
    this.setState({
      isAutocompleteLoading: false,
    });
  };

  render() {
    //submit event is prevented so use Redirect to navigate user to the word page
    if (this.state.isFormSubmitted)
      return <Redirect push to={`/word/${queryToWordID(this.state.query)}`} />;

    return (
      <form
        data-testid="search-form"
        onSubmit={this.handleSubmit}
        ref={this.rootRef}
        className={classNames('el-relative', this.props.className)}
        style={this.props.style}
      >
        <div className="form-icon">
          <ActionSearch data-testid="form-icon" className="form-icon__icon" />
          <input
            className="form-icon__input input-text input-text--left-big input-text--right-big"
            onChange={this.handleInputChange}
            type="text"
            value={this.state.query}
            placeholder={this.props.placeholder}
          />
        </div>
        {this.state.query && this.state.isAutocompleteVisible && (
          <AutocompleteWord
            onLoadingStart={this.onAutocompleteLoading}
            onLoadingDone={this.onAutocompleteDone}
            query={this.state.query}
          />
        )}
        {this.state.isAutocompleteLoading && (
          <div className="search-form__loader">
            <CircularProgress
              style={{ display: 'block' }}
              size={24}
              color="#00adb5"
              innerStyle={{ display: 'block' }}
            />
          </div>
        )}
      </form>
    );
  }
}

FormSearch.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object,
};

FormSearch.defaultProps = {
  placeholder: 'Search for...',
};

export default FormSearch;
