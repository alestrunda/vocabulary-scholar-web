/* global document */

import React from 'react';
import PropTypes from 'prop-types';
import TextHighlight from '../../components/TextHighlight';
import Dropdown from '../../components/Dropdown';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import { Link } from 'react-router-dom';
import { appSetSelectedPhrase } from '../../actions/app';
import { queryToWordID } from '../../misc';
import { SNACKBAR_HIDE_DURATION } from '../../constants';

export class TextHighlightMenu extends React.Component {
  constructor(props) {
    super(props);
    this.rootRef = React.createRef();
  }

  state = {
    isMenuOpened: false,
    snackBarCopyOpened: false,
    snackBarCopyText: '',
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside = e => {
    //close the menu when clicked outside
    if (this.rootRef.current.contains(e.target)) return;
    this.setState({
      isMenuOpened: false,
    });
  };

  onHighlight = (start, end) => {
    if (start === end) return;
    this.setState({
      isMenuOpened: true,
      start,
      end,
    });
  };

  handleSnackBarCopyClose = () => {
    this.setState({
      snackBarCopyOpened: false,
    });
  };

  handleCopyClick = () => {
    const wasCopied = copy(this.getSelectedString());
    this.setState({
      snackBarCopyOpened: true,
      snackBarCopyText: wasCopied ? 'Text copied to clipboard' : 'Copy failed',
    });
  };

  getSelectedString() {
    return this.props.children.substring(this.state.start, this.state.end);
  }

  handleAddPhraseClick = () => {
    this.props.onPhraseSelected(this.getSelectedString());
  };

  render() {
    const { isPhraseDisabled, children } = this.props;
    return (
      <React.Fragment>
        <div
          className={classNames('el-relative', this.props.className)}
          ref={this.rootRef}
          style={this.props.style}
        >
          <TextHighlight onHighlight={this.onHighlight}>
            {children}
          </TextHighlight>
          {this.state.isMenuOpened && (
            <Dropdown>
              <Link
                to={`/word/${queryToWordID(
                  children.substring(this.state.start, this.state.end)
                )}`}
              >
                <MenuItem
                  style={{ minHeight: 40, lineHeight: '38px' }}
                  primaryText="Search"
                />
              </Link>
              {!isPhraseDisabled && (
                <MenuItem
                  style={{ minHeight: 40, lineHeight: '38px' }}
                  onClick={this.handleAddPhraseClick}
                  primaryText="Add as phrase"
                />
              )}
              <MenuItem
                style={{ minHeight: 40, lineHeight: '38px' }}
                onClick={this.handleCopyClick}
                primaryText="Copy"
              />
            </Dropdown>
          )}
        </div>
        <Snackbar
          open={this.state.snackBarCopyOpened}
          message={this.state.snackBarCopyText}
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarCopyClose}
        />
      </React.Fragment>
    );
  }
}

TextHighlightMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  isPhraseDisabled: PropTypes.bool,
  onPhraseSelected: PropTypes.func.isRequired,
  style: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  onPhraseSelected: phrase => dispatch(appSetSelectedPhrase(phrase)),
});

export default connect(
  null,
  mapDispatchToProps
)(TextHighlightMenu);
