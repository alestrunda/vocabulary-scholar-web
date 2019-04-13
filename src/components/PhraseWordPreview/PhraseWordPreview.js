import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import classNames from 'classnames';

const PhraseWordPreview = ({
  id,
  phrase,
  startIndex,
  endIndex,
  className,
  fillClassName,
  onEdit,
  onRemove,
  style,
  buttonStyle,
}) => {
  const handleRemoveBtnClick = () => {
    onRemove(id);
  };

  const handleEditBtnClick = () => {
    onEdit(id);
  };

  return (
    <div className={classNames('phrase-word', className)} style={style}>
      <p className="phrase-word__phrase">
        {phrase.substring(0, startIndex)}
        <span className={classNames('text-weight-bold', fillClassName)}>
          {phrase.substring(startIndex, endIndex)}
        </span>{' '}
        {phrase.substring(endIndex, phrase.length)}
      </p>
      <div className="phrase-word__action">
        {onEdit && (
          <FlatButton
            style={{
              minWidth: 70,
              height: 30,
              lineHeight: '30px',
              ...buttonStyle,
            }}
            labelStyle={{ fontSize: 12 }}
            className="mr10"
            primary
            data-testid="btn-edit"
            label="Edit"
            onClick={handleEditBtnClick}
          />
        )}
        {onRemove && (
          <FlatButton
            style={{
              minWidth: 70,
              height: 30,
              lineHeight: '30px',
              ...buttonStyle,
            }}
            labelStyle={{ fontSize: 12 }}
            data-testid="btn-remove"
            label="Remove"
            onClick={handleRemoveBtnClick}
          />
        )}
      </div>
    </div>
  );
};

PhraseWordPreview.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  fillClassName: PropTypes.string,
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
  phrase: PropTypes.string,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  style: PropTypes.object,
  buttonStyle: PropTypes.object,
};

export default PhraseWordPreview;
