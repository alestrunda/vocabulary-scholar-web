import React from 'react';
import { APP_VERSION } from '../../constants';

const PageFooter = props => {
  return (
    <footer className="page-footer" {...props}>
      <div className="container">v{APP_VERSION}</div>
    </footer>
  );
};

export default PageFooter;
