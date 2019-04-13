import React from 'react';
import PropTypes from 'prop-types';
import Hint from '../Hint';

class QuestionWord extends React.Component {
  componentDidMount() {
    this.handleQuestionReady();
  }

  componentDidUpdate(prevState) {
    if (this.props.word !== prevState.word) this.handleQuestionReady();
  }

  handleQuestionReady() {
    if (!this.props.word) return;
    this.props.onQuestionReady && this.props.onQuestionReady();
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.props.word ? (
          <React.Fragment>
            <p>{this.props.word}</p>
            <Hint
              className="mt10"
              hint={this.props.hint}
              hintType={this.props.hintType}
              wordID={this.props.wordID}
            />
          </React.Fragment>
        ) : (
          <p className="text-no-data">Not available</p>
        )}
      </div>
    );
  }
}

QuestionWord.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  word: PropTypes.string,
  wordID: PropTypes.string,
  onQuestionReady: PropTypes.func,
  hint: PropTypes.string,
  hintType: PropTypes.string,
};

export default QuestionWord;
