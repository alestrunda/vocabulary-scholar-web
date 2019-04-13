/*global Audio*/

import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import VolumeUp from 'material-ui/svg-icons/av/volume-up';
import VolumeOff from 'material-ui/svg-icons/av/volume-off';
import Replay from 'material-ui/svg-icons/notification/sync';
import debounce from 'lodash.debounce';

class AudioIcon extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    //check audio availability only max once per 1sec
    const audioChangeDebounce = 1000;
    this.checkAudioAvailability = debounce(
      this.checkAudioAvailability,
      audioChangeDebounce
    );
    this.state = this.getDefaultState();
  }

  componentDidMount() {
    this.checkAudioAvailability();
  }

  componentWillUnmount() {
    //anti-pattern, should be refactored
    this.isUnmounted = true;
  }

  componentDidUpdate(prevProps) {
    //re-check audio availability if audio src changes
    if (this.props.src !== prevProps.src) {
      this.setState(this.getDefaultState(), () =>
        this.checkAudioAvailability()
      );
    }
  }

  getDefaultState() {
    return {
      isAudioAvailable: false,
      isError: false,
    };
  }

  checkAudioAvailability() {
    if (!this.props.src) {
      this.setState({
        isAudioAvailable: false,
        isError: true,
      });
    }
    const audioElement = new Audio();
    audioElement.onloadeddata = () => {
      if (this.isUnmounted) return;
      this.setState({
        isAudioAvailable: true,
        isError: false,
      });
      this.props.autoplay && this.play();
      this.props.onReady && this.props.onReady();
    };
    audioElement.onerror = () => {
      if (this.isUnmounted) return;
      this.setState({
        isAudioAvailable: false,
        isError: true,
      });
      this.props.onError && this.props.onError();
    };
    audioElement.src = this.props.src;
  }

  play = () => {
    if (!this.state.isAudioAvailable) return;
    this.audioRef.current.play();
    this.props.onPlay && this.props.onPlay();
  };

  render() {
    const { src, hideIfNoSource, size, sizeIcon, style } = this.props;
    const showSpinner =
      !this.state.isError &&
      (this.props.isSrcLoading || !this.state.isAudioAvailable);
    if (!src && hideIfNoSource) return null;
    return (
      <React.Fragment>
        <FloatingActionButton
          disabled={!this.state.isAudioAvailable}
          onClick={this.play}
          style={{
            width: size,
            height: size,
            lineHeight: `${size}px`,
            ...style,
          }}
          iconStyle={{ width: size, height: size }}
        >
          {showSpinner && (
            <Replay
              className="animation-spinning"
              style={{ width: sizeIcon }}
            />
          )}
          {!showSpinner && this.state.isAudioAvailable && (
            <VolumeUp style={{ width: sizeIcon }} />
          )}
          {!showSpinner && !this.state.isAudioAvailable && (
            <VolumeOff style={{ width: sizeIcon }} />
          )}
        </FloatingActionButton>
        {this.state.isAudioAvailable && ( //render audio element that will be used to play the audio
          <audio ref={this.audioRef}>
            <source src={src} type="audio/mpeg" />
          </audio>
        )}
      </React.Fragment>
    );
  }
}

AudioIcon.propTypes = {
  size: PropTypes.number,
  sizeIcon: PropTypes.number,
  src: PropTypes.string,
  onPlay: PropTypes.func,
  onReady: PropTypes.func,
  onError: PropTypes.func,
  style: PropTypes.object,
  hideIfNoSource: PropTypes.bool,
  isSrcLoading: PropTypes.bool,
  autoplay: PropTypes.bool,
};

AudioIcon.defaultProps = {
  size: 26,
  sizeIcon: 16,
  hideIfNoSource: true,
  isSrcLoading: false,
  autoplay: false,
};

export default AudioIcon;
