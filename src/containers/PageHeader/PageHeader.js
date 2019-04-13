import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import IconSyncStatus from '../../components/IconSyncStatus';

export const PageHeader = props => {
  const getTooltipText = () => {
    if (!props.isStateLoaded) return 'Loading state';
    if (!props.isStoreLoadedFromDrive) return 'Google Drive not connected';
    return 'Synchronized with Google Drive';
  };

  return (
    <header
      style={props.style}
      className={classNames('page-header', 'container', props.className)}
    >
      <h1 className="page-header__title text-break">{props.children}</h1>
      <div className="page-header__right">
        <Link data-testid="state-status-link" to="/settings">
          <IconSyncStatus
            className={classNames({ 'is-loaded': props.isStateLoaded })}
            style={{ padding: 0 }}
            iconStyle={{ color: '#fff' }}
            loaderColor="#fff"
            isLoading={!props.isStateLoaded}
            isSynced={props.isStoreLoadedFromDrive}
            tooltip={getTooltipText()}
            tooltipPosition="bottom-left"
          />
        </Link>
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  isStateLoaded: PropTypes.bool.isRequired,
  isStoreLoadedFromDrive: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isStateLoaded: !!state.app.isStateLoaded,
  isStoreLoadedFromDrive: !!state.gapi.isStoreLoadedFromDrive,
});

export default connect(mapStateToProps)(PageHeader);
