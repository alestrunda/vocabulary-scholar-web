import React from 'react';
import PageHeader from '../containers/PageHeader';
import PageFooter from '../components/PageFooter';

const PageNotFound = () => (
  <div className="page-all">
    <PageHeader>Page not found</PageHeader>
    <main className="page-content page-content--center">
      <div className="container text-center text-huge text-weight-bold">
        <p>Sorry, requested page was not found</p>
      </div>
    </main>
    <PageFooter />
  </div>
);

export default PageNotFound;
