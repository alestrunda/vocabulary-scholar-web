import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import AudioIcon from '../../../components/AudioIcon';
import WordTranslationLoader from '../../../containers/WordTranslationLoader';

class WordInputFields extends React.Component {
  handleFieldChange = event => {
    this.props.onChange(event.target.name, event.target.value);
  };

  handlePutInCustomFieldClick = translation => {
    this.props.onChange('customField', translation);
  };

  render() {
    const { audio, customField, image } = this.props;
    return (
      <React.Fragment>
        <div className="input-preview">
          <TextField
            style={{
              width: '100%',
            }}
            className="input-preview__input"
            floatingLabelText="Image source"
            onChange={this.handleFieldChange}
            value={image}
            name="imageSrc"
          />
          {image && (
            <div className="input-preview__preview">
              <img width="25" alt="not found" src={image} />
            </div>
          )}
        </div>
        <div className="input-preview">
          <TextField
            style={{
              width: '100%',
            }}
            className="input-preview__input"
            floatingLabelText="Audio source"
            onChange={this.handleFieldChange}
            value={audio}
            name="audioSrc"
          />
          {audio && (
            <div className="input-preview__preview">
              <AudioIcon src={audio} />
            </div>
          )}
        </div>
        <p className="text-xsmall text-gray text-right">
          If empty, audio from dictionary service will be used.
        </p>
        <div className="input-preview">
          <TextField
            style={{
              width: '100%',
            }}
            className="input-preview__input"
            floatingLabelText="Custom field"
            onChange={this.handleFieldChange}
            value={customField}
            name="customField"
          />
        </div>
        <p className="text-xsmall text-gray text-right">
          Could be your own translation, some note etc.
        </p>
        <WordTranslationLoader
          word={this.props.word}
          render={translation => (
            <React.Fragment>
              {translation && (
                <p className="text-xsmall text-gray text-right">
                  Suggested translation:{' '}
                  <span className="text-weight-bold">
                    &quot;{translation}&quot;
                  </span>
                  ,{' '}
                  <button
                    onClick={this.handlePutInCustomFieldClick.bind(
                      null,
                      translation
                    )}
                    className="link-underline link-hover-blue p0"
                  >
                    put in the custom field
                  </button>
                  ?
                </p>
              )}
            </React.Fragment>
          )}
        />
      </React.Fragment>
    );
  }
}

WordInputFields.propTypes = {
  audio: PropTypes.string,
  customField: PropTypes.string,
  image: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  word: PropTypes.string,
};

export default WordInputFields;
