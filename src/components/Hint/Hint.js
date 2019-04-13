import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AudioIconApiLoad from '../../containers/AudioIconApiLoad';
import WordTranslationLoader from '../../containers/WordTranslationLoader';
import LoaderText from '../LoaderText';
import { HINT } from '../../constants';

const Hint = ({ className, classNameImage, hint, hintType, style, wordID }) => {
  const renderHint = () => {
    if (hintType === HINT.AUDIO)
      return (
        <AudioIconApiLoad size={35} sizeIcon={21} wordID={wordID} src={hint} />
      );
    if (hintType === HINT.IMAGE)
      return (
        <img className={classNameImage} width="35" alt="not found" src={hint} />
      );
    if (hintType === HINT.TRANSLATION)
      return (
        <WordTranslationLoader
          word={hint}
          render={(translation, isError) => (
            <React.Fragment>
              {isError ? (
                <span className="text-no-data" style={{ fontSize: 'inherit' }}>
                  Not available
                </span>
              ) : (
                <React.Fragment>
                  {translation ? (
                    <span className="text-italic">{translation}</span>
                  ) : (
                    <LoaderText style={{ fontSize: 'inherit' }} />
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        />
      );
    if (hintType === HINT.WORD_FIRST_LETTER)
      return (
        <span className="text-italic">starts with &quot;{hint}&quot;</span>
      );
    if (hintType === HINT.WORD_LENGTH)
      return <span className="text-italic">the word has {hint} letters</span>;
    if (hintType === HINT.CUSTOM_FIELD && hint)
      return <span className="text-italic">{hint}</span>;
    return (
      <span className="text-no-data" style={{ fontSize: 'inherit' }}>
        not available
      </span>
    );
  };

  if (!hintType || hintType === HINT.NONE) {
    return null;
  }

  return (
    <span
      className={classNames('text-small', 'text-center', className)}
      style={{
        display: 'inline-block',
        ...style,
      }}
    >
      {renderHint()}
    </span>
  );
};

Hint.propTypes = {
  className: PropTypes.string,
  classNameImage: PropTypes.string,
  hint: PropTypes.string,
  hintType: PropTypes.string,
  style: PropTypes.object,
  wordID: PropTypes.string,
};

export default Hint;
