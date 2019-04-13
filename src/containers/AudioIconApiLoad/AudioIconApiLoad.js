import React from 'react';
import PropTypes from 'prop-types';
import AudioIcon from '../../components/AudioIcon';
import { getWordData, parseWordResponse } from '../../api/api';

class AudioIconApiLoad extends React.Component {
  state = {
    src: '',
    isLoading: false,
  };

  componentDidMount() {
    !this.props.src && this.loadAudioFromApi(this.props.wordID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.wordID !== prevProps.wordID) {
      this.setState({
        src: '',
        isLoading: false,
      });
      !this.props.src && this.loadAudioFromApi(this.props.wordID);
    }
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  async loadAudioFromApi(wordID) {
    if (!this.props.loadFromApiIfNotAvailable) return;
    this.setState({
      isLoading: true,
    });
    try {
      const res = await getWordData(wordID);
      //do not update if component already unmounted - though it's an anti-pattern, found no 'clean' way how to solve it in async function
      if (this.isUnmounted) return;
      const wordData = parseWordResponse(res);
      this.setState({
        src: wordData.lexicalEntries[0].pronunciations.audio,
      });
    } catch (e) {
      if (this.isUnmounted) return;
      this.setState({
        src: '',
      });
      this.props.onError && this.props.onError();
    } finally {
      if (!this.isUnmounted) {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  setLoaded() {
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const src = this.state.src || this.props.src;
    const { showLoading, ...restProps } = this.props;
    const isSrcLoading = showLoading && this.state.isLoading;
    return <AudioIcon isSrcLoading={isSrcLoading} {...restProps} src={src} />;
  }
}

AudioIconApiLoad.propTypes = {
  wordID: PropTypes.string.isRequired,
  src: PropTypes.string,
  onError: PropTypes.func,
  loadFromApiIfNotAvailable: PropTypes.bool,
  showLoading: PropTypes.bool,
};

AudioIconApiLoad.defaultProps = {
  loadFromApiIfNotAvailable: true,
};

export default AudioIconApiLoad;
