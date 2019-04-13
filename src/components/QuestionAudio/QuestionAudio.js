import React from 'react';
import PropTypes from 'prop-types';
import AudioIconApiLoad from '../../containers/AudioIconApiLoad';

const QuestionAudio = ({
  audioSrc,
  className,
  onQuestionReady,
  style,
  wordID,
}) => {
  const handleQuestionReady = () => {
    onQuestionReady && onQuestionReady();
  };

  return (
    <div className={className} style={style}>
      <AudioIconApiLoad
        onReady={handleQuestionReady}
        size={100}
        sizeIcon={60}
        wordID={wordID}
        src={audioSrc}
        hideIfNoSource={false}
        autoplay
      />
    </div>
  );
};

QuestionAudio.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  audioSrc: PropTypes.string,
  wordID: PropTypes.string,
  onQuestionReady: PropTypes.func,
};

export default QuestionAudio;
