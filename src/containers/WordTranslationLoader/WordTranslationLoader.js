import React from 'react';
import PropTypes from 'prop-types';
import { getWordTranslation } from '../../api/api';
import { connect } from 'react-redux';

class wordTranslationLoader extends React.Component {
  state = {
    translation: '',
    isError: false,
  };

  componentDidMount() {
    this.loadTranslation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.word !== this.props.word) this.loadTranslation();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  async loadTranslation() {
    if (!this.props.language) {
      this.setState({
        isError: true,
        translation: '',
      });
      return;
    }
    try {
      const response = await getWordTranslation(
        this.props.word,
        this.props.language
      );
      if (this.isUnmounted) return;
      this.setState({
        translation: response.data,
        isError: false,
      });
    } catch (e) {
      this.setState({
        isError: true,
        translation: '',
      });
    }
    this.props.onReady && this.props.onReady();
  }

  render() {
    return this.props.render(this.state.translation, this.state.isError);
  }
}

wordTranslationLoader.propTypes = {
  word: PropTypes.string.isRequired,
  language: PropTypes.string,
  onReady: PropTypes.func,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  language: state.app.language,
});

export default connect(mapStateToProps)(wordTranslationLoader);
