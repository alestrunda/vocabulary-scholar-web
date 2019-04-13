import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

const DialogWordRemove = ({ active, onCancel, onConfirm }) => {
  const dialogActions = [
    <RaisedButton
      className="ml10"
      key="btn-cancel"
      label="Cancel"
      onClick={onCancel}
    />,
    <RaisedButton
      className="ml10"
      key="btn-remove"
      label="Remove"
      secondary
      onClick={onConfirm}
    />,
  ];
  return (
    <Dialog
      className="text-weight-bold text-big"
      actions={dialogActions}
      modal={false}
      open={active}
      onRequestClose={onCancel}
    >
      Removing word will also delete its rating and other data
    </Dialog>
  );
};

DialogWordRemove.propTypes = {
  active: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DialogWordRemove;
