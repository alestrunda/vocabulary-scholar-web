import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import { HINT_TYPES, QUESTION } from '../../../constants';

const LessonFooter = ({
  hintType,
  isImmediateEval,
  questionType,
  onHintTypeChange,
  onImmediateEvalChange,
}) => {
  const showHintSelect =
    questionType !== QUESTION.AUDIO && questionType !== QUESTION.WORD;
  return (
    <div className="grid grid--items-center grid--small mt15">
      <div className="grid__item grid__item--sm-span-6">
        {showHintSelect && (
          <SelectField
            className="text-left mb10"
            style={{ maxWidth: 256, width: '100%' }}
            labelStyle={{ color: '#fff' }}
            floatingLabelStyle={{ color: '#fff' }}
            underlineStyle={{ borderColor: '#fff' }}
            floatingLabelText="Hint"
            value={hintType}
            onChange={onHintTypeChange}
          >
            {HINT_TYPES.map(type => {
              //do not include current question type
              if (type.value === questionType) return null;
              return (
                <MenuItem
                  key={type.value}
                  value={type.value}
                  primaryText={type.text}
                />
              );
            })}
          </SelectField>
        )}
      </div>
      <div className="grid__item grid__item--sm-span-6">
        <div className="container-content-wrapper container-content-wrapper--right text-right">
          <Toggle
            style={{ width: 'auto' }}
            labelStyle={{
              color: '#fff',
              whiteSpace: 'nowrap',
            }}
            label="Immediate evaluation"
            onToggle={onImmediateEvalChange}
            defaultToggled={isImmediateEval}
          />
        </div>
      </div>
    </div>
  );
};

LessonFooter.propTypes = {
  hintType: PropTypes.string.isRequired,
  isImmediateEval: PropTypes.bool.isRequired,
  questionType: PropTypes.string.isRequired,
  onHintTypeChange: PropTypes.func.isRequired,
  onImmediateEvalChange: PropTypes.func.isRequired,
};

export default LessonFooter;
