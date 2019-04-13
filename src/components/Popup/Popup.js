/*global window*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Cover from '../Cover';
import Paper from 'material-ui/Paper';

const Popup = props => {
  const handleCoverClick = () => {
    props.onClose && props.onClose();
  };

  const popupTop = window.pageYOffset;
  const popupTopMargin = 15;

  return (
    <React.Fragment>
      <Cover isActive={props.isActive} onClick={handleCoverClick} />
      <Paper
        zDepth={2}
        style={{
          top: popupTop,
          borderRadius: 5,
          maxHeight: `calc(100% - ${popupTopMargin * 2}px - ${popupTop}px) `,
          ...props.style,
        }}
        className={classNames('popup', props.className, {
          active: props.isActive,
        })}
      >
        <h2 className="mb25 text-center">{props.title}</h2>
        <div className="popup__content">{props.children}</div>
      </Paper>
    </React.Fragment>
  );
};

Popup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  isActive: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  style: PropTypes.object,
};

Popup.defaultProps = {
  isActive: false,
};

export default Popup;
