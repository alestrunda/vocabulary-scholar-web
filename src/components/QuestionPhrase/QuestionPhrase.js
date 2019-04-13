import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Hint from '../Hint';

class QuestionPhrase extends React.Component {
  constructor(props) {
    super(props);
    this.inputAnswerRef = React.createRef();
  }

  state = {
    field: '',
    error: '',
  };

  componentDidMount() {
    this.handleQuestionReady();
  }

  componentDidUpdate(prevProps) {
    //it's important to trigger questionReady, do it when word changes and when phrase is set - it could be set later, that's why comparing with prevProps
    if (
      this.props.wordID !== prevProps.wordID ||
      (!prevProps.phrase && this.props.phrase)
    ) {
      this.setState(
        {
          field: '',
        },
        () => this.handleQuestionReady()
      );
    }
  }

  handleQuestionReady() {
    if (!this.props.phrase) return;
    if (this.inputAnswerRef.current) this.inputAnswerRef.current.focus();
    this.props.onQuestionReady && this.props.onQuestionReady();
  }

  handleFieldChange = event => {
    this.setState({
      field: event.target.value,
    });
    this.props.onFieldChange && this.props.onFieldChange(event.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit && this.props.onSubmit(e);
  };

  renderPhrase() {
    return (
      <form className="phrase-word-question" onSubmit={this.handleSubmit}>
        {//render first part of the phrase
        this.props.phrase.substring(0, this.props.startIndex)}
        <TextField
          ref={this.inputAnswerRef}
          id={this.props.wordID}
          disabled={this.props.disabled}
          autoComplete="off"
          style={{
            maxWidth: 120,
            marginLeft: 10,
            marginRight: 10,
            verticalAlign: 'middle',
          }}
          inputStyle={{
            fontSize: 24,
            textAlign: 'center',
          }}
          onChange={this.handleFieldChange}
          value={this.state.field}
          errorText={this.props.error}
        />
        {
          //render hint
          <Hint
            className="mr5"
            hint={this.props.hint}
            hintType={this.props.hintType}
            wordID={this.props.wordID}
          />
        }
        {//render second part of the phrase
        this.props.phrase.substring(
          this.props.endIndex,
          this.props.phrase.length
        )}
      </form>
    );
  }

  render() {
    const isPhraseAvailable =
      this.props.startIndex !== undefined &&
      this.props.endIndex !== undefined &&
      this.props.endIndex !== 0 &&
      this.props.startIndex !== this.props.endIndex &&
      this.props.phrase;
    if (this.props.hideIfNotAvailable && !isPhraseAvailable) return null;
    return (
      <div className={this.props.className} style={this.props.style}>
        {isPhraseAvailable ? this.renderPhrase() : 'Not available'}
      </div>
    );
  }
}

QuestionPhrase.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  word: PropTypes.string.isRequired,
  wordID: PropTypes.string.isRequired,
  phrase: PropTypes.string,
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
  onQuestionReady: PropTypes.func,
  onFieldChange: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  hideIfNotAvailable: PropTypes.bool,
  error: PropTypes.string,
  hint: PropTypes.string,
  hintType: PropTypes.string,
};

QuestionPhrase.defaultProps = {
  disabled: false,
  hideIfNotAvailable: false,
  error: '',
};

export default QuestionPhrase;
