import React from 'react';
import PageHeader from '../../containers/PageHeader';
import PageFooter from '../../components/PageFooter';
import Paper from 'material-ui/Paper';
import PageBackground from '../../containers/PageBackground/PageBackground';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => (
  <PageBackground className="page-all bg-dark">
    <PageHeader>Privacy Policy</PageHeader>
    <main className="page-content page-content--center">
      <div className="container container--w-limit paragraphs-mid">
        <Paper className="section-content-paper article">
          <h2>Privacy policy</h2>
          <p>
            Aleš Trunda built the <strong>Vocabulary Scholar</strong> app as a
            Free app. This SERVICE is provided by Aleš Trunda at no cost and is
            intended for use as is.
          </p>
          <p>
            This page is used to inform visitors regarding my policies with the
            collection, use, and disclosure of Personal Information if anyone
            decided to use my Service.
          </p>
          <p>
            If you choose to use my Service, then you agree to the collection
            and use of information in relation to this policy. The Personal
            Information that I collect is used for providing and improving the
            Service. I will not use or share your information with anyone except
            as described in this Privacy Policy.
          </p>
          <p>
            The terms used in this Privacy Policy have the same meanings as in
            our{' '}
            <Link to="/terms-and-conditions/">
              <strong>Terms and Conditions</strong>
            </Link>
            , which is accessible at Vocabulary Scholar unless otherwise defined
            in this Privacy Policy.
          </p>

          <h3>Information Collection and Use</h3>
          <p>
            For a better experience, while using our Service, I may require you
            to provide us with certain personally identifiable information. The
            information that I request will be retained on your computer or on
            your Google Drive{' '}
            <strong>and is not collected by me in any way</strong>.
          </p>
          <p>
            The app does use third party services that may collect information
            used to identify you.
          </p>
          <p>
            Link to privacy policy of third party service providers used by the
            app:
          </p>
          <ul className="list-arrows">
            <li className="list-arrows__item">
              <a href="https://policies.google.com/privacy">Google Drive</a>
            </li>
            <li className="list-arrows__item">
              <a href="https://global.oup.com/privacy">Oxford Dictionaries</a>
            </li>
            <li className="list-arrows__item">
              <a href="https://www.microsoft.com/en-us/trustcenter/privacy/privacy-overview">
                Microsoft Azure
              </a>
            </li>
          </ul>

          <h3>Log Data</h3>
          <p>
            I want to inform you that whenever you use my Service, in a case of
            an error in the app I collect data and information (through third
            party products) on your phone calledLog Data. This Log Data may
            include information such as your device Internet Protocol (“IP”)
            address, device name, operating system version, the configuration of
            the app when utilizing my Service, the time and date of your use of
            the Service, and other statistics.
          </p>

          <h3>Cookies</h3>
          <p>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device&apos;s
            internal memory.
          </p>
          <p>
            This Service does not use these “cookies” explicitly. However, the
            app may use third party code and libraries that use “cookies” to
            collect information and improve their services. You have the option
            to either accept or refuse these cookies and know when a cookie is
            being sent to your device. If you choose to refuse our cookies, you
            may not be able to use some portions of this Service.
          </p>

          <h3>Service Providers</h3>
          <p>
            I may employ third-party companies and individuals due to the
            following reasons:
          </p>
          <ul className="list-arrows">
            <li className="list-arrows__item">To facilitate our Service;</li>
            <li className="list-arrows__item">
              To provide the Service on our behalf;
            </li>
            <li className="list-arrows__item">
              To perform Service-related services; or
            </li>
            <li className="list-arrows__item">
              To assist us in analyzing how our Service is used.
            </li>
          </ul>
          <p>
            I want to inform users of this Service that these third parties have
            access to your Personal Information. The reason is to perform the
            tasks assigned to them on our behalf. However, they are obligated
            not to disclose or use the information for any other purpose.
          </p>

          <h3>Security</h3>
          <p>
            I value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and I
            cannot guarantee its absolute security.
          </p>

          <h3>Links to Other Sites</h3>
          <p>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by me. Therefore, I strongly advise
            you to <strong>review the Privacy Policy of these websites</strong>.
            I have no control over and assume no responsibility for the content,
            privacy policies, or practices of any third-party sites or services.
          </p>

          <h3>Children’s Privacy</h3>
          <p>
            These Services do not address anyone under the age of 13. I do not
            knowingly collect personally identifiable information from children
            under 13. In the case I discover that a child under 13 has provided
            me with personal information, I immediately delete this from our
            servers. If you are a parent or guardian and you are aware that your
            child has provided us with personal information, please contact me
            so that I will be able to do necessary actions.
          </p>

          <h3>Changes to This Privacy Policy</h3>
          <p>
            I may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. I will
            notify you of any changes by posting the new Privacy Policy on this
            page. These changes are effective immediately after they are posted
            on this page.
          </p>

          <h3>Contact Us</h3>
          <p>
            If you have any questions or suggestions about my Privacy Policy, do
            not hesitate to contact me.
          </p>
          <p>
            This privacy policy page was created at{' '}
            <a href="https://privacypolicytemplate.net">
              privacypolicytemplate.net
            </a>{' '}
            and modified/generated by{' '}
            <a href="https://app-privacy-policy-generator.firebaseapp.com/">
              App Privacy Policy Generator
            </a>
          </p>
          <div className="article__footer">Last updated: January 18, 2019</div>
        </Paper>
      </div>
    </main>
    <PageFooter />
  </PageBackground>
);

export default PrivacyPolicy;
