import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const DialogImport = ({ active, onCancel, onConfirm }) => {
  const dialogActions = [
    <RaisedButton
      className="ml10"
      key="btn-cancel"
      label="Cancel"
      onClick={onCancel}
    />,
    <RaisedButton
      className="ml10"
      key="btn-continue"
      label="Continue"
      primary
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
      Items with same ID will be replaced, do you wish to continue?
    </Dialog>
  );
};

DialogImport.propTypes = {
  active: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DialogImport;
