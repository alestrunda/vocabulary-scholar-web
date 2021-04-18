/*global console document window*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  cyan700,
  grey400,
  pinkA200,
  grey100,
  grey500,
  white,
  cyan500,
  darkBlack,
  fullBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import PageNotFound from './screens/PageNotFound';
import Popup from './components/Popup';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import {
  appStateNotLoaded,
  appInfoMessage,
  appWarningClose,
  appWarning,
} from './actions/app';
import { gapiConnected, gapiClientStatusUpdate } from './actions/gapi';
import { SNACKBAR_HIDE_DURATION } from './constants';
import { routes } from './routes';
import { connect } from 'react-redux';
import { logError } from './api/api';
import { GOOGLE_API_KEY, GOOGLE_CLIENT_ID } from './settings';
import './scss/main.css';
import MenuContainer from './containers/MenuContainer';

class App extends Component {
  state = {
    catchedError: false,
  };

  componentDidCatch(error, info) {
    this.setState({ catchedError: true });
    console.log(error); // eslint-disable-line no-console
    logError(error.toString(), info.componentStack).catch(() => {
      //cannot save error to db, at least log also error info to the client
      console.log(info); // eslint-disable-line no-console
    });
  }

  componentDidMount() {
    this.loadGapi();
  }

  loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('client:auth2', this.gapiClientInit);
    };
    script.onerror = () => {
      const clientSignedIn = false;
      const initial = true;
      this.props.onGapiClientStatusUpdate(clientSignedIn, initial);
    };
    document.body.appendChild(script);
  }

  gapiClientInit = () => {
    window.gapi.client
      .init({
        apiKey: GOOGLE_API_KEY,
        clientId: GOOGLE_CLIENT_ID,
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/drive.appfolder',
      })
      .then(() => {
        this.props.onGapiConnected();
        // Listen for sign-in state changes.
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(this.gapiClientStatusUpdate);

        // Handle the initial sign-in state.
        const isInitialLoad = true;
        this.gapiClientStatusUpdate(
          window.gapi.auth2.getAuthInstance().isSignedIn.get(),
          isInitialLoad
        );
      })
      .catch(() => {
        //const warningType = 'googleDriveNotAvailable';
        //this.props.onAppWarning('Google Drive is not available.', warningType);
        const clientSignedIn = false;
        const isInitialLoad = true;
        this.props.onGapiClientStatusUpdate(clientSignedIn, isInitialLoad);
        this.props.onAppStateNotLoaded();
      });
  };

  gapiClientStatusUpdate = (isClientSignedIn, isInitial = false) => {
    this.props.onGapiClientStatusUpdate(isClientSignedIn, isInitial);
  };

  handleDialogWarningClose = () => {
    this.props.onAppWarningClose(this.props.app.warningType);
  };

  handlePopupClose = () => {
    this.setState({
      hasError: false,
    });
  };

  handleSnackBarAppInfoClose = () => {
    this.props.onAppInfoMessageChange();
  };

  renderDialogWarning() {
    const isAppWarning = !!this.props.app.warning;
    const dialogAction = [
      <RaisedButton
        className="mb5 mr5"
        key="confirm"
        label="OK"
        onClick={this.handleDialogWarningClose}
      />,
    ];
    return (
      <Dialog
        title="Warning"
        actions={dialogAction}
        modal={true}
        open={isAppWarning}
      >
        {this.props.app.warning}
      </Dialog>
    );
  }

  render() {
    const routeComponents = routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    ));

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: '#00adb5',
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: '#222831',
        alternateTextColor: '#eee',
        canvasColor: white,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
      },
    });

    const isAppWarning = !!this.props.app.warning;
    const hasError = this.state.catchedError || isAppWarning;
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme}>
          <React.Fragment>
            <Popup
              isActive={this.state.catchedError}
              title="Something went wrong"
            >
              <div className="text-center">
                <p className="mb25">
                  Last action caused unexpected problems in the application.
                </p>
                <Link onClick={this.handlePopupClose} to="/">
                  <RaisedButton
                    className="mb35"
                    onClick={this.handlePopupClose}
                    label="Continue to homepage"
                  />
                </Link>
              </div>
            </Popup>
            {this.renderDialogWarning()}
            {!hasError && (
              <div className="App">
                <MenuContainer />
                <Switch>
                  {routeComponents}
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            )}
            <Snackbar
              open={!!this.props.app.infoMessage}
              message={this.props.app.infoMessage || ''}
              autoHideDuration={SNACKBAR_HIDE_DURATION}
              onRequestClose={this.handleSnackBarAppInfoClose}
            />
            <Snackbar
              open={!this.props.app.isStateLoaded}
              message="Loading store..."
              autoHideDuration={SNACKBAR_HIDE_DURATION}
            />
          </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

App.propTypes = {
  app: PropTypes.object,
  lessons: PropTypes.array,
  lists: PropTypes.array,
  words: PropTypes.object,
  onAppInfoMessageChange: PropTypes.func.isRequired,
  onAppWarning: PropTypes.func.isRequired,
  onAppWarningClose: PropTypes.func.isRequired,
  onGapiConnected: PropTypes.func.isRequired,
  onGapiClientStatusUpdate: PropTypes.func.isRequired,
  onAppStateNotLoaded: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  app: state.app,
  lessons: state.lessons,
  lists: state.lists,
  words: state.words,
});

const mapDispatchToProps = dispatch => ({
  onAppWarning: (message, warningType) =>
    dispatch(appWarning(message, warningType)),
  onAppInfoMessageChange: message => dispatch(appInfoMessage(message)),
  onGapiConnected: () => dispatch(gapiConnected()),
  onGapiClientStatusUpdate: (isClientSignedIn, isInitial) =>
    dispatch(gapiClientStatusUpdate(isClientSignedIn, isInitial)),
  onAppWarningClose: warningType => dispatch(appWarningClose(warningType)),
  onAppStateNotLoaded: () => dispatch(appStateNotLoaded()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
