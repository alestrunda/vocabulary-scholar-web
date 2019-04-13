import React from 'react';
import PageHeader from '../../containers/PageHeader';
import PageFooter from '../../components/PageFooter';
import PageBackground from '../../containers/PageBackground';
import Paper from 'material-ui/Paper';
import { Link } from 'react-router-dom';
import { APP_VERSION } from '../../constants';

const About = () => (
  <PageBackground className="page-all bg-dark">
    <PageHeader>About</PageHeader>
    <main className="page-content page-content--center">
      <div className="container container--w-limit paragraphs-mid text-center">
        <Paper className="section-content-paper article">
          <h2 className="mb20">Vocabulary Scholar</h2>
          <p>
            Personal application for improving English vocabulary. Available as
            web application and as mobile application (Android).
          </p>

          <h3>Dictionary and translation services</h3>
          <p>
            <a href="https://www.oxforddictionaries.com/">
              Oxford Dictionaries
            </a>{' '}
            is the primary dictionary service. In case it&apos;s not available
            (due to reaching free limits), app uses secondary dictionary service{' '}
            <a href="https://wordnet.princeton.edu/">
              WordNet, Princeton University
            </a>{' '}
            (does not include pronunciation, audio)
          </p>
          <p>
            <a href="https://azure.microsoft.com">Microsoft Azure</a> is used
            for the translation service.
          </p>
          <p>
            Please note that this is <strong>Free app</strong>, not generating
            any profit, that&apos;s why it uses free versions of 3rd party
            services. And of course the free versions have significant{' '}
            <strong>limits in usage</strong>, so when the service is not
            available, the limit has been probably reached, then you will have
            to wait and try again later.
          </p>

          <h3>Images</h3>
          <p>
            Background Images from{' '}
            <a href="https://unsplash.com">unsplash.com</a>
          </p>

          <div className="text-center mt20">
            <p>
              <Link
                className="link-underline link-hover-blue"
                to="/privacy-policy"
              >
                Privacy Policy
              </Link>
              <br />
              <Link
                className="link-underline link-hover-blue"
                to="/terms-and-conditions"
              >
                Terms of Service
              </Link>
            </p>
            <p>
              <a href="http://alestrunda.cz">Author</a>
            </p>
            <p>App version {APP_VERSION}</p>
          </div>
        </Paper>
      </div>
    </main>
    <PageFooter />
  </PageBackground>
);

export default About;
