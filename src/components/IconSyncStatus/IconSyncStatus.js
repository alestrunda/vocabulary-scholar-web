import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import NotificationSync from 'material-ui/svg-icons/notification/sync';
import NotificationSyncDisabled from 'material-ui/svg-icons/notification/sync-disabled';
import IconButton from 'material-ui/IconButton';

const IconSyncStatus = ({
  className,
  iconStyle,
  isLoading,
  isSynced,
  loaderColor,
  style,
  tooltip,
  tooltipPosition,
}) => {
  return (
    <IconButton
      className={className}
      style={style}
      tooltip={tooltip}
      tooltipPosition={tooltipPosition}
    >
      {isLoading && (
        <CircularProgress
          size={30}
          color={loaderColor}
          innerStyle={{ display: 'block' }}
        />
      )}
      {!isLoading && (
        <React.Fragment>
          {isSynced && <NotificationSync color={loaderColor} />}
          {!isSynced && <NotificationSyncDisabled style={iconStyle} />}
        </React.Fragment>
      )}
    </IconButton>
  );
};

IconSyncStatus.propTypes = {
  className: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipPosition: PropTypes.string,
  isLoading: PropTypes.bool,
  isSynced: PropTypes.bool,
  iconStyle: PropTypes.object,
  loaderColor: PropTypes.string,
  style: PropTypes.object,
};

IconSyncStatus.defaultProps = {
  tooltipPosition: 'bottom-center',
};

export default IconSyncStatus;
