import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const DialogLoadData = ({ active, onCancel, onConfirm }) => {
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
      Loading new data will erase all current data, do you wish to continue?
    </Dialog>
  );
};

DialogLoadData.propTypes = {
  active: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DialogLoadData;
