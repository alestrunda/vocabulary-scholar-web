/*global Image*/

import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Hint';
import LoaderText from '../LoaderText';

class QuestionImage extends React.Component {
  state = {
    isLoaded: false,
    isError: false,
  };

  componentDidMount() {
    this.loadImage(this.props.imageSrc);
  }

  componentDidUpdate(prevProps) {
    if (this.props.wordID !== prevProps.wordID) {
      this.setState({
        isLoaded: false,
        isError: false,
      });
      this.loadImage(this.props.imageSrc);
    }
  }

  handleQuestionReady() {
    this.props.onQuestionReady && this.props.onQuestionReady();
  }

  loadImage(imgSrc) {
    if (!imgSrc) {
      this.setState({
        isError: true,
      });
      return;
    }
    const imageElement = new Image();
    imageElement.onload = () => {
      this.setState({
        isLoaded: true,
      });
      this.handleQuestionReady();
    };
    imageElement.onerror = () => {
      this.setState({
        isError: true,
      });
    };
    imageElement.src = imgSrc;
  }

  render() {
    return (
      <div>
        <div className={this.props.className} style={this.props.style}>
          {!this.state.isLoaded && !this.state.isError && <LoaderText />}
          {this.state.isError && (
            <p className="text-no-data">Image not available</p>
          )}
          {this.state.isLoaded && <img alt="" src={this.props.imageSrc} />}
        </div>
        {this.state.isLoaded && (
          <Hint
            className="mt10"
            hint={this.props.hint}
            hintType={this.props.hintType}
            wordID={this.props.wordID}
          />
        )}
      </div>
    );
  }
}

QuestionImage.propTypes = {
  className: PropTypes.string,
  word: PropTypes.string,
  wordID: PropTypes.string,
  style: PropTypes.object,
  imageSrc: PropTypes.string,
  onQuestionReady: PropTypes.func,
  hint: PropTypes.string,
  hintType: PropTypes.string,
};

export default QuestionImage;
