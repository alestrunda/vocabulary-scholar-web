import React from 'react';
import PropTypes from 'prop-types';
import RatingIcons from '../../components/RatingIcons';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import classNames from 'classnames';
import QuestionAudio from '../../components/QuestionAudio';
import QuestionPhrase from '../../components/QuestionPhrase';
import QuestionImage from '../../components/QuestionImage';
import QuestionTranslation from '../../components/QuestionTranslation';
import QuestionWord from '../../components/QuestionWord';
import { wordSetRating } from '../../actions/word';
import { connect } from 'react-redux';
import { getRandomItemFromArray, isCorrectAnswer } from '../../misc';
import { QUESTION, HINT, RATE_BY } from '../../constants';

export class Question extends React.Component {
  constructor(props) {
    super(props);
    this.inputAnswerRef = React.createRef();
  }

  state = {
    answerText: '',
    answerTextError: '',
    questionReady: false,
    phrase: {},
  };

  componentDidMount() {
    this.props.type === QUESTION.PHRASE && this.loadPhrase();
  }

  componentDidUpdate(prevProps) {
    if (this.props.wordID !== prevProps.wordID) {
      //phrase is stored is state so when word's ID changes new phrase has to be loaded
      if (this.props.type === QUESTION.PHRASE) this.loadPhrase();
    }
  }

  loadPhrase() {
    let phrase = {};
    //randomly pick one of the word's phrases
    const phrases = this.props.words[this.props.wordID].phrases;
    if (phrases && phrases.length > 0) {
      phrase = getRandomItemFromArray(phrases);
    }
    this.setState({
      phrase,
    });
  }

  handleAnswerTextChange = value => {
    this.setState({
      answerText: value,
    });
  };

  handleAnswerTextFieldChange = event => {
    this.handleAnswerTextChange(event.target.value);
  };

  handleQuestionReady = () => {
    this.setState({
      questionReady: true,
    });
    if (this.inputAnswerRef.current) this.inputAnswerRef.current.focus();
    this.props.onQuestionReady && this.props.onQuestionReady();
  };

  handleAnswerSubmit = e => {
    e.preventDefault();
    if (!this.state.answerText) {
      this.setState({
        answerTextError: 'Field cannot be empty',
      });
      return;
    }
    this.setAnswer(this.state.answerText);
    this.resetQuestion();
  };

  resetQuestion() {
    this.setState({
      answerText: '',
      answerTextError: '',
      questionReady: false,
    });
  }

  handleCorrectAnswer = () => {
    this.setAnswer(this.props.word);
    this.resetQuestion();
  };

  handleWrongAnswer = () => {
    this.setAnswer(undefined);
    this.resetQuestion();
  };

  setAnswer(answer) {
    const maxRating = 5,
      minRating = 1;
    //set word rating whether the answer was correct or not
    if (isCorrectAnswer(answer, this.props.word)) {
      this.props.onWordSetRating(this.props.word, maxRating);
    } else {
      this.props.onWordSetRating(this.props.word, minRating);
    }
    this.props.onAnswer(answer);
  }

  getHint() {
    if (this.props.hintType === HINT.AUDIO) return this.props.audioSrc;
    if (this.props.hintType === HINT.IMAGE) return this.props.imageSrc;
    if (this.props.hintType === HINT.CUSTOM_FIELD)
      return this.props.customField;
    if (this.props.hintType === HINT.TRANSLATION) return this.props.word;
    if (this.props.hintType === HINT.WORD_FIRST_LETTER)
      return this.props.word[0];
    if (this.props.hintType === HINT.WORD_LENGTH)
      return this.props.word.length.toString();
  }

  renderTheQuestion() {
    switch (this.props.type) {
      case QUESTION.AUDIO:
        return (
          <QuestionAudio
            onQuestionReady={this.handleQuestionReady}
            audioSrc={this.props.audioSrc}
            wordID={this.props.wordID}
          />
        );
      case QUESTION.PHRASE:
        return (
          <QuestionPhrase
            onQuestionReady={this.handleQuestionReady}
            word={this.props.word}
            wordID={this.props.wordID}
            onSubmit={this.handleAnswerSubmit}
            onFieldChange={this.handleAnswerTextChange}
            error={this.state.answerTextError}
            {...this.state.phrase}
            hintType={this.props.hintType}
            hint={this.getHint()}
          />
        );
      case QUESTION.IMAGE:
        return (
          <QuestionImage
            className="question__image"
            onQuestionReady={this.handleQuestionReady}
            imageSrc={this.props.imageSrc}
            word={this.props.word}
            wordID={this.props.wordID}
            hintType={this.props.hintType}
            hint={this.getHint()}
          />
        );
      case QUESTION.TRANSLATION:
        return (
          <QuestionTranslation
            onQuestionReady={this.handleQuestionReady}
            word={this.props.word}
            wordID={this.props.wordID}
            hintType={this.props.hintType}
            hint={this.getHint()}
          />
        );
      case QUESTION.CUSTOM_FIELD:
        return (
          <QuestionWord
            onQuestionReady={this.handleQuestionReady}
            word={this.props.customField}
            wordID={this.props.wordID}
            hintType={this.props.hintType}
            hint={this.getHint()}
          />
        );
      default:
        return (
          <QuestionWord
            onQuestionReady={this.handleQuestionReady}
            word={this.props.word}
          />
        );
    }
  }

  render() {
    return (
      <div
        className={classNames('question', this.props.className)}
        style={this.props.style}
      >
        <div className="question__content">{this.renderTheQuestion()}</div>
        <div className="m15" />
        {this.props.rateBy === RATE_BY.SELF_RATING && (
          //for self-rating render just thumb-up thumb-down icons
          <RatingIcons
            className="rating-icons--big mt25"
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            iconSize={30}
            mini={false}
            onCorrect={this.handleCorrectAnswer}
            onWrong={this.handleWrongAnswer}
          />
        )}
        {this.props.rateBy === RATE_BY.TYPE_IN && (
          //for type-in render form with input for answer and buttons skip, continue
          <form onSubmit={this.handleAnswerSubmit}>
            {this.props.type !== QUESTION.PHRASE && (
              <TextField
                ref={this.inputAnswerRef}
                floatingLabelText="Your answer"
                onChange={this.handleAnswerTextFieldChange}
                value={this.state.answerText}
                disabled={!this.state.questionReady}
                errorText={this.state.answerTextError}
                autoComplete="off"
              />
            )}
            <div className="lesson-running__btns">
              <div className="grid">
                <div className="grid__item grid__item--sm-span-6 text-left text-xs-center">
                  <RaisedButton onClick={this.handleWrongAnswer} label="Skip" />
                </div>
                <div className="grid__item grid__item--sm-span-6 grid__item--break-xs-10 text-right text-xs-center">
                  {this.state.questionReady && (
                    <RaisedButton
                      primary
                      onClick={this.handleAnswerSubmit}
                      label="Continue"
                    />
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

Question.propTypes = {
  className: PropTypes.string,
  onAnswer: PropTypes.func.isRequired,
  rateBy: PropTypes.string,
  type: PropTypes.string,
  audioSrc: PropTypes.string,
  imageSrc: PropTypes.string,
  customField: PropTypes.string,
  word: PropTypes.string,
  words: PropTypes.object.isRequired,
  wordID: PropTypes.string,
  onQuestionReady: PropTypes.func,
  onWordSetRating: PropTypes.func.isRequired,
  hintType: PropTypes.string,
  style: PropTypes.object,
};

Question.defaultProps = {
  rateBy: RATE_BY.SELF_RATING,
  type: QUESTION.WORD,
};

const mapStateToProps = state => ({
  words: state.words,
});

const mapDispatchToProps = dispatch => ({
  onWordSetRating: (wordID, rating) =>
    dispatch(wordSetRating({ wordID, rating })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Question);
