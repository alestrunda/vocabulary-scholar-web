import React from 'react';
import PropTypes from 'prop-types';
import WordTranslationLoader from '../../containers/WordTranslationLoader';
import Hint from '../Hint';
import LoaderText from '../LoaderText';

class QuestionWord extends React.Component {
  handleQuestionReady = () => {
    this.props.onQuestionReady && this.props.onQuestionReady();
  };

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        <WordTranslationLoader
          onReady={this.handleQuestionReady}
          word={this.props.word}
          render={(translation, isError) => {
            return (
              <div className="mt20">
                {isError ? (
                  <p className="text-no-data">Not available</p>
                ) : (
                  <React.Fragment>
                    {translation ? (
                      <React.Fragment>
                        <p>{translation}</p>
                        <Hint
                          className="mt10"
                          hint={this.props.hint}
                          hintType={this.props.hintType}
                          wordID={this.props.wordID}
                        />
                      </React.Fragment>
                    ) : (
                      <LoaderText />
                    )}
                  </React.Fragment>
                )}
              </div>
            );
          }}
        />
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
