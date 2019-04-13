import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const DialogDelete = ({ active, onCancel, onConfirm, partsToDelete }) => {
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
      label="Delete"
      secondary
      onClick={onConfirm}
      data-testid="button-delete-confirm"
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
      Do you wish to delete all{' '}
      <span className="text-italic">{partsToDelete.join(', ')}</span>?
    </Dialog>
  );
};

DialogDelete.propTypes = {
  active: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  partsToDelete: PropTypes.array,
};

export default DialogDelete;
