import React from 'react';
import PropTypes from 'prop-types';
import TextHighlight from '../../components/TextHighlight';
import QuestionPhrase from '../../components/QuestionPhrase';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PhraseWordSettings extends React.Component {
  state = {
    phraseField: '',
    phraseFieldError: undefined,
    phraseHighlight: {},
  };

  componentDidMount() {
    if (this.props.phrase) this.loadStateFromProps();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.phrase ||
      prevProps.phrase.phrase !== this.props.phrase.phrase
    )
      this.loadStateFromProps();
  }

  loadStateFromProps() {
    if (!this.props.phrase) return;
    let wordPosition;
    if (
      this.props.phrase.startIndex !== undefined &&
      this.props.phrase.endIndex !== undefined
    ) {
      //get phrase's highlight indexes from props
      wordPosition = {
        start: this.props.phrase.startIndex,
        end: this.props.phrase.endIndex,
      };
    } else {
      //phrase's highlight indexes not set, try to locate current word in the phrase and use those indexes
      wordPosition = this.locateWordInPhrase(
        this.props.word,
        this.props.phrase.phrase
      );
    }
    this.setState({
      phraseField: this.props.phrase.phrase,
      phraseHighlight: {
        start: wordPosition ? wordPosition.start : undefined,
        end: wordPosition ? wordPosition.end : undefined,
      },
    });
  }

  resetSettings() {
    this.setState({
      phraseField: '',
      phraseFieldError: undefined,
      phraseHighlight: {},
    });
  }

  locateWordInPhrase(word, phrase) {
    const wordIndex = phrase.toLowerCase().indexOf(word.toLowerCase());
    if (wordIndex !== -1) {
      return {
        start: wordIndex,
        end: wordIndex + word.length,
      };
    }
  }

  handlePhraseFieldChange = event => {
    const newPhrase = event.target.value;
    let start, end;
    //if highlight not set yet, make highlight prediction - try to locate current word and highlight it
    if (this.state.phraseHighlight.start === undefined) {
      const wordPosition = this.locateWordInPhrase(this.props.word, newPhrase);
      if (wordPosition) {
        start = wordPosition.start;
        end = wordPosition.end;
      }
    } else {
      //because phrase has changed, make sure the highlight indexes woun't get outside the phrase length
      start =
        newPhrase.length < this.state.phraseHighlight.start
          ? newPhrase.length
          : this.state.phraseHighlight.start;
      end =
        newPhrase.length < this.state.phraseHighlight.end
          ? newPhrase.length
          : this.state.phraseHighlight.end;
    }
    this.setState({
      phraseField: newPhrase,
      phraseHighlight: {
        start,
        end,
      },
    });
  };

  handleSubmitButtonClick = () => {
    if (!this.state.phraseField) {
      this.setState({
        phraseFieldError: 'This field cannot be empty',
      });
      return;
    }
    if (this.state.phraseHighlight.start === this.state.phraseHighlight.end) {
      this.setState({
        submitError:
          'Please select some part of the phrase - during lesson this part will be hidden and the goal will be to put the phrase back together',
      });
      return;
    }
    this.props.onSubmit(
      this.state.phraseField,
      this.state.phraseHighlight.start,
      this.state.phraseHighlight.end
    );
    this.resetSettings();
  };

  handleOnPhraseHighlight = (start, end) => {
    this.setState({
      phraseHighlight: {
        start,
        end,
      },
      submitError: '',
    });
  };

  render() {
    return (
      <React.Fragment>
        <h3>1. Set phrase</h3>
        <TextField
          className="mb25"
          style={{
            width: '100%',
          }}
          floatingLabelText="Phrase"
          onChange={this.handlePhraseFieldChange}
          value={this.state.phraseField}
          errorText={this.state.phraseFieldError}
        />
        <h3 className="mb5">2. Select part that will be hidden</h3>
        <TextHighlight
          className="mb30"
          onHighlight={this.handleOnPhraseHighlight}
          start={this.state.phraseHighlight.start}
          end={this.state.phraseHighlight.end}
        >
          {this.state.phraseField}
        </TextHighlight>
        <h3 className="mb5">3. Question preview</h3>
        <QuestionPhrase
          word={this.props.word}
          wordID={this.props.wordID}
          phrase={this.state.phraseField}
          startIndex={this.state.phraseHighlight.start}
          endIndex={this.state.phraseHighlight.end}
          disabled
          hideIfNotAvailable
        />
        {this.state.submitError && (
          <p className="text-error mb10">{this.state.submitError}</p>
        )}
        <div className="mb25 mt35">
          <RaisedButton
            primary
            label={this.props.submitText}
            onClick={this.handleSubmitButtonClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

PhraseWordSettings.propTypes = {
  wordID: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  submitText: PropTypes.string,
  phrase: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

PhraseWordSettings.defaultProps = {
  submitText: 'Save phrase',
};

export default PhraseWordSettings;
