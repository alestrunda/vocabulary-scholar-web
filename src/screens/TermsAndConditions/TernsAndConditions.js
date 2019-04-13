import React from 'react';
import PageHeader from '../../containers/PageHeader';
import PageFooter from '../../components/PageFooter';
import Paper from 'material-ui/Paper';
import PageBackground from '../../containers/PageBackground/PageBackground';

const TermsAndConditions = () => (
  <PageBackground className="page-all bg-dark">
    <PageHeader>Terms and Conditions</PageHeader>
    <main className="page-content page-content--center">
      <div className="container container--w-limit paragraphs-mid">
        <Paper className="section-content-paper article">
          <h2>Terms of Service &quot;Terms&quot;</h2>
          <p>
            Please read these Terms of Service (&quot;Terms&quot;, &quot;Terms
            of Service&quot; carefully before using this app (the
            &quot;Service&quot;).
          </p>
          <p>
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users and others who access or use the Service.
          </p>
          <p>
            By accessing or using the Service you agree to be bound by these
            Terms. If you disagree with any part of the terms then you may not
            access the Service. The Terms of Service agreement for Vocabulary
            Scholar is based on the{' '}
            <a href="https://termsfeed.com/blog/sample-terms-of-service-template/">
              TermsFeed&apos;s Terms of Service Template
            </a>
            .
          </p>

          <h3>Other Web Sites and Services</h3>
          <p>
            Our Service may contain links to{' '}
            <strong>third-party web sites or services</strong> that are not
            owned or controlled by Vocabulary Scholar.
          </p>
          <p>
            Vocabulary Scholar has no control over, and assumes no
            responsibility for, the content, privacy policies, or practices of
            any third party web sites or services. You further acknowledge and
            agree that Vocabulary Scholar shall not be responsible or liable,
            directly or indirectly, for any damage or loss caused or alleged to
            be caused by or in connection with use of or reliance on any such
            content, goods or services available on or through any such web
            sites or services.
          </p>
          <p>
            We strongly advise you to read the terms and conditions and privacy
            policies of any third-party web sites or services that you visit.
          </p>
          <ul className="list-arrows">
            <li className="list-arrows__item">
              <a href="https://www.google.com/drive/terms-of-service/">
                Google Drive
              </a>
            </li>
            <li className="list-arrows__item">
              <a href="https://developer.oxforddictionaries.com/api-terms-and-conditions">
                Oxford Dictionaries
              </a>
            </li>
            <li className="list-arrows__item">
              <a href="https://wordnet.princeton.edu/">
                WordNet, Princeton University
              </a>
            </li>
            <li className="list-arrows__item">
              <a href="https://www.microsoft.com/en-us/trustcenter/privacy/privacy-overview">
                Microsoft Azure
              </a>
            </li>
          </ul>

          <h3>Governing Law</h3>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of <strong>Czech Republic</strong>, without regard to its
            conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect. These
            Terms constitute the entire agreement between us regarding our
            Service, and supersede and replace any prior agreements we might
            have between us regarding the Service.
          </p>

          <h3>Changes</h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material we will try to
            provide at least 30 days notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, please stop using the Service.
          </p>

          <h3>Contact Us</h3>
          <p>If you have any questions about these Terms, please contact us.</p>
          <div className="article__footer">Last updated: January 18, 2019</div>
        </Paper>
      </div>
    </main>
    <PageFooter />
  </PageBackground>
);

export default TermsAndConditions;
