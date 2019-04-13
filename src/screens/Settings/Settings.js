/*global FileReader*/

import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../containers/PageHeader';
import LoaderText from '../../components/LoaderText';
import PageFooter from '../../components/PageFooter';
import DialogDelete from './components/DialogDelete';
import DialogImport from './components/DialogImport';
import DialogLoadData from './components/DialogLoadData';
import SettingsCheckbox from './components/SettingsCheckbox';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { getStateLocalStorage } from '../../storage/load';
import { saveStateFile as saveStateToLocalStorage } from '../../storage/localStorage';
import { connect } from 'react-redux';
import {
  ITEMS_PER_PAGE_OPTIONS,
  SNACKBAR_HIDE_DURATION,
} from '../../constants';
import { getSupportedLanguages } from '../../api/api';
import {
  appLoadState,
  appSetLanguage,
  appSetItemsPerPage,
  appStateNotLoaded,
} from '../../actions/app';
import { lessonsDelete, lessonsImport } from '../../actions/lesson';
import { listsDelete, listsImport } from '../../actions/list';
import { wordsDelete, wordsImport } from '../../actions/word';
import { gapiSignIn, gapiSignOut } from '../../gapi';
import {
  getBasicExportStructure,
  exportStoreToFile,
  objectToArray,
} from '../../misc';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.inputImportRef = React.createRef();
    this.handlePartExportChange = this.handlePartExportChange.bind(this);
    this.handlePartDeleteChange = this.handlePartDeleteChange.bind(this);
  }

  state = {
    isDialogDeleteOpened: false,
    isDialogImportOpened: false,
    isDialogLoadDataOpened: false,
    partsToExport: [],
    partsToDelete: [],
    languages: [],
    languagesLoaded: false,
    isSnackbarOpened: false,
    dataSource: null,
    snackbarMessage: '',
  };

  componentDidMount() {
    this.loadLanguages();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  async loadLanguages() {
    try {
      const response = await getSupportedLanguages();
      if (this.isUnmounted) return;
      this.setState({
        languages: response.data,
        languagesLoaded: true,
      });
    } catch (e) {
      if (this.isUnmounted) return;
      this.setState({
        languages: [],
        languagesLoaded: true,
      });
    }
  }

  handlePartDeleteChange = partName => {
    const partsToDelete = this.getNewCheckedItems(
      this.state.partsToDelete,
      partName
    );
    this.setState({
      partsToDelete,
    });
  };

  handlePartExportChange = partName => {
    const partsToExport = this.getNewCheckedItems(
      this.state.partsToExport,
      partName
    );
    this.setState({
      partsToExport,
    });
  };

  getNewCheckedItems = (items, itemName) => {
    const newItems = [...items];
    const partIndex = newItems.indexOf(itemName);
    if (partIndex !== -1) {
      newItems.splice(partIndex, 1);
    } else {
      newItems.push(itemName);
    }
    return newItems;
  };

  handleDeleteBtnClick = () => {
    const lessonChecked = this.state.partsToDelete.includes('lessons'),
      listsChecked = this.state.partsToDelete.includes('lists'),
      wordsChecked = this.state.partsToDelete.includes('words');
    if (!lessonChecked && !listsChecked && !wordsChecked) {
      this.setState({
        isSnackbarOpened: true,
        snackbarMessage: 'Nothing to delete',
      });
      return;
    }
    this.setState({
      isDialogDeleteOpened: true,
    });
  };

  handleExportBtnClick = () => {
    const lessonChecked = this.state.partsToExport.includes('lessons'),
      listsChecked = this.state.partsToExport.includes('lists'),
      wordsChecked = this.state.partsToExport.includes('words');
    if (!lessonChecked && !listsChecked && !wordsChecked) {
      this.setState({
        isSnackbarOpened: true,
        snackbarMessage: 'Nothing to export',
      });
      return;
    }
    let exportData = getBasicExportStructure();
    lessonChecked && (exportData.lessons = this.props.lessons);
    listsChecked && (exportData.lists = this.props.lists);
    wordsChecked && (exportData.words = this.props.words);
    exportStoreToFile(exportData);
    this.setState({
      partsToExport: [],
    });
  };

  handleImportBtnClick = () => {
    this.setState({
      isDialogImportOpened: true,
    });
  };

  handleDialogImportConfirm = () => {
    this.setState({
      isDialogImportOpened: false,
    });
    this.inputImportRef.current.click();
  };

  handleInputImportChange = e => {
    //read file selected for import
    const reader = new FileReader();
    reader.onloadend = e => {
      this.processImportedFileContent(e.target.result);
    };
    reader.readAsText(e.target.files[0]);
  };

  handleSnackbarClose = () => {
    this.setState({
      isSnackbarOpened: false,
    });
  };

  processImportedFileContent(content) {
    try {
      //try to parse file content
      const { words, lessons, lists } = JSON.parse(content);

      //perform import
      this.props.onLessonImport(lessons);
      this.props.onListsImport(lists);
      this.props.onWordsImport(words);

      this.setState({
        isSnackbarOpened: true,
        snackbarMessage: 'Import was successful',
      });
    } catch (e) {
      this.setState({
        isSnackbarOpened: true,
        snackbarMessage: 'Import failed',
      });
    }
  }

  handleLanguageChange = (event, index, value) => {
    //when set to "none" reset value to empty string so it simply evaluates as false
    let newVal = value === 'none' ? '' : value;
    this.props.onAppSetLanguage(newVal);
  };

  handleDialogDeleteClose = () => {
    this.setState({
      isDialogDeleteOpened: false,
    });
  };

  handleDialogDeleteConfirm = () => {
    const deleteLessons = this.state.partsToDelete.includes('lessons'),
      deleteLists = this.state.partsToDelete.includes('lists'),
      deleteWords = this.state.partsToDelete.includes('words');

    //get deleted items counts
    const wordsCnt = objectToArray(this.props.words).length,
      lessonsCnt = this.props.lessons.length,
      listsCnt = this.props.lists.length;
    const deletedItemsCount = [
      { name: 'lessons', value: deleteLessons ? lessonsCnt : 0 },
      { name: 'lists', value: deleteLists ? listsCnt : 0 },
      { name: 'words', value: deleteWords ? wordsCnt : 0 },
    ];

    //perform delete
    deleteLessons && this.props.onDeleteLessons();
    deleteLists && this.props.onDeleteLists();
    deleteWords && this.props.onDeleteWords();

    //update UI
    const snackbarMessage = `Deleted: ${this.getDeletedItemCountsStr(
      deletedItemsCount
    ) || 'nothing'}`;
    this.setState({
      isDialogDeleteOpened: false,
      isSnackbarOpened: true,
      snackbarMessage,
      isDeleteLessonsChecked: false,
      partsToDelete: [],
      isDeleteWordsChecked: false,
    });
  };

  handleDialogLoadDataClose = () => {
    this.setState({
      isDialogLoadDataOpened: false,
    });
  };

  handleDialogLoadDataConfirm = () => {
    if (this.state.dataSource === 'local') {
      this.loadLocalStorageData();
    } else if (this.state.dataSource === 'google-drive') {
      this.saveGoogleDriveToLocalStorage();
    }
    this.setState({
      isDialogLoadDataOpened: false,
    });
  };

  handleDialogImportClose = () => {
    this.setState({
      isDialogImportOpened: false,
    });
  };

  handleGapiSignInButtonClick = () => {
    gapiSignIn();
  };

  handleGapiSignOutButtonClick = () => {
    gapiSignOut();
  };

  handleReloadButtonClick = () => {
    this.props.onAppStateReload();
  };

  getDeletedItemCountsStr(deletedItems) {
    if (deletedItems.length === 0) return '';
    return deletedItems
      .filter(item => item.value !== 0)
      .map(item => `${item.value} ${item.name}`)
      .join(', ');
  }

  handleSaveFromGoogleDrive = () => {
    this.setState({
      isDialogLoadDataOpened: true,
      dataSource: 'google-drive',
    });
  };

  handleLoadFromLocalStorage = () => {
    this.setState({
      isDialogLoadDataOpened: true,
      dataSource: 'local',
    });
  };

  handleItemsPerPageChange = (event, index, value) => {
    this.props.onAppSetItemsPerPage(value);
  };

  saveGoogleDriveToLocalStorage() {
    saveStateToLocalStorage(this.props.appState);
    this.setState({
      isSnackbarOpened: true,
      snackbarMessage: 'Data from Google Drive saved to local storage',
    });
  }

  loadLocalStorageData() {
    const state = getStateLocalStorage();
    this.props.onAppLoadState(state, this.props.storageType);
    this.setState({
      isSnackbarOpened: true,
      snackbarMessage: 'Loaded data from local storage',
    });
  }

  render() {
    return (
      <div className="page-all bg-dark2">
        <PageHeader>Settings</PageHeader>
        <main className="page-content text-light">
          <div className="container">
            <div className="section-content">
              <h2 className="mb15">Synchronize with Google Drive</h2>
              {!this.props.gapi.isConnected && <p>Not available</p>}
              {this.props.gapi.isConnected && (
                <React.Fragment>
                  {!this.props.gapi.isClientSignedIn && (
                    <RaisedButton
                      className="mt10"
                      label="Sign in"
                      primary
                      onClick={this.handleGapiSignInButtonClick}
                    />
                  )}
                  {this.props.gapi.isClientSignedIn && (
                    <React.Fragment>
                      <RaisedButton
                        className="mt10 mr10"
                        label="Reload Google Drive"
                        primary
                        onClick={this.handleReloadButtonClick}
                      />
                      <RaisedButton
                        className="mt10 mr10"
                        label="Sign out"
                        primary
                        onClick={this.handleGapiSignOutButtonClick}
                      />
                      <br />
                      <RaisedButton
                        className="mt10 mr10"
                        label="Load data from local storage to Google Drive"
                        primary
                        onClick={this.handleLoadFromLocalStorage}
                      />
                      <RaisedButton
                        className="mt10 mr10"
                        label="Save data from Google Drive to local storage"
                        primary
                        onClick={this.handleSaveFromGoogleDrive}
                      />
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
            <hr className="mt30 mb30 delimiter-white" />
            <div className="section-content">
              <h2 className="mb15">Import</h2>
              <RaisedButton
                className="mt10"
                label="Import from file"
                primary
                onClick={this.handleImportBtnClick}
              />
              <input
                style={{ display: 'none' }}
                type="file"
                onChange={this.handleInputImportChange}
                ref={this.inputImportRef}
              />
            </div>
            <hr className="mt30 mb30 delimiter-white" />
            <div className="section-content">
              <h2 className="mb15">Export</h2>
              <SettingsCheckbox
                label="lessons"
                checked={this.state.partsToExport.includes('lessons')}
                onCheck={this.handlePartExportChange.bind(null, 'lessons')}
              />
              <SettingsCheckbox
                label="lists"
                checked={this.state.partsToExport.includes('lists')}
                onCheck={this.handlePartExportChange.bind(null, 'lists')}
              />
              <SettingsCheckbox
                label="words"
                checked={this.state.partsToExport.includes('words')}
                onCheck={this.handlePartExportChange.bind(null, 'words')}
              />
              <RaisedButton
                className="mt20"
                label="Export to file"
                primary
                onClick={this.handleExportBtnClick}
              />
            </div>
            <hr className="mt30 mb30 delimiter-white" />
            <div className="section-content">
              <h2 className="mb15">Delete</h2>
              <SettingsCheckbox
                label="lessons"
                checked={this.state.partsToDelete.includes('lessons')}
                onCheck={this.handlePartDeleteChange.bind(null, 'lessons')}
                data-testid="check-delete-lessons"
              />
              <SettingsCheckbox
                label="lists"
                checked={this.state.partsToDelete.includes('lists')}
                onCheck={this.handlePartDeleteChange.bind(null, 'lists')}
                data-testid="check-delete-list"
              />
              <SettingsCheckbox
                label="words"
                checked={this.state.partsToDelete.includes('words')}
                onCheck={this.handlePartDeleteChange.bind(null, 'words')}
                data-testid="check-delete-words"
              />
              <RaisedButton
                className="mt20"
                label="Delete data"
                primary
                onClick={this.handleDeleteBtnClick}
                data-testid="button-delete"
              />
            </div>
            <hr className="mt30 mb30 delimiter-white" />
            <div className="section-content">
              <h2 className="mb15">Number of items per page</h2>
              <SelectField
                style={{ width: '100%', maxWidth: 300 }}
                iconStyle={{ fill: '#fff' }}
                labelStyle={{ color: '#fff' }}
                underlineStyle={{ backgroundColor: '#fff' }}
                floatingLabelStyle={{ color: '#fff' }}
                floatingLabelText="Items per page"
                value={this.props.itemsPerPage}
                onChange={this.handleItemsPerPageChange}
              >
                {ITEMS_PER_PAGE_OPTIONS.map(number => (
                  <MenuItem key={number} value={number} primaryText={number} />
                ))}
              </SelectField>
            </div>
            <hr className="mt30 mb30 delimiter-white" />
            <div className="section-content">
              <h2 className="mb15">Your language</h2>
              <p className="mb20">
                If you set your language, application will suggest translation
                for words (in word&apos;s page below custom field).
                <br />
                You will also be able to run translation-type lesson.
              </p>
              {!this.state.languagesLoaded && (
                <LoaderText style={{ textAlign: 'left' }} />
              )}
              {this.state.languagesLoaded && (
                <React.Fragment>
                  {this.state.languages.length === 0 ? (
                    <p className="text-not-available text-not-available--left">
                      Not available
                    </p>
                  ) : (
                    <SelectField
                      style={{ width: '100%', maxWidth: 300 }}
                      iconStyle={{ fill: '#fff' }}
                      labelStyle={{ color: '#fff' }}
                      underlineStyle={{ backgroundColor: '#fff' }}
                      floatingLabelStyle={{ color: '#fff' }}
                      floatingLabelText="Your language"
                      value={this.props.language || 'none'}
                      onChange={this.handleLanguageChange}
                    >
                      <MenuItem value="none" primaryText="Select language" />
                      {this.state.languages.map(language => (
                        <MenuItem
                          key={language.code}
                          value={language.code}
                          primaryText={language.name}
                        />
                      ))}
                    </SelectField>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
          <Snackbar
            open={this.state.isSnackbarOpened}
            message={this.state.snackbarMessage}
            autoHideDuration={SNACKBAR_HIDE_DURATION}
            onRequestClose={this.handleSnackbarClose}
          />
          <DialogImport
            active={this.state.isDialogImportOpened}
            onCancel={this.handleDialogImportClose}
            onConfirm={this.handleDialogImportConfirm}
          />
          <DialogDelete
            active={this.state.isDialogDeleteOpened}
            onCancel={this.handleDialogDeleteClose}
            onConfirm={this.handleDialogDeleteConfirm}
            partsToDelete={this.state.partsToDelete}
          />
          <DialogLoadData
            active={this.state.isDialogLoadDataOpened}
            onCancel={this.handleDialogLoadDataClose}
            onConfirm={this.handleDialogLoadDataConfirm}
          />
        </main>
        <PageFooter />
      </div>
    );
  }
}

Settings.propTypes = {
  appState: PropTypes.object.isRequired,
  gapi: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  lessons: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  words: PropTypes.object.isRequired,
  onAppStateReload: PropTypes.func.isRequired,
  onDeleteLessons: PropTypes.func.isRequired,
  onDeleteLists: PropTypes.func.isRequired,
  onDeleteWords: PropTypes.func.isRequired,
  onLessonImport: PropTypes.func.isRequired,
  onListsImport: PropTypes.func.isRequired,
  onWordsImport: PropTypes.func.isRequired,
  onAppSetLanguage: PropTypes.func.isRequired,
  onAppSetItemsPerPage: PropTypes.func.isRequired,
  onAppLoadState: PropTypes.func.isRequired,
  storageType: PropTypes.string,
  itemsPerPage: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  appState: state,
  gapi: state.gapi,
  lessons: state.lessons,
  lists: state.lists,
  words: state.words,
  language: state.app.language,
  storageType: state.app.storageType,
  itemsPerPage: state.app.itemsPerPage,
});

const mapDispatchToProps = dispatch => ({
  onAppStateReload: () => dispatch(appStateNotLoaded()),
  onAppLoadState: (stateToLoad, storageType) =>
    dispatch(appLoadState(stateToLoad, storageType)),
  onAppSetLanguage: language => dispatch(appSetLanguage(language)),
  onAppSetItemsPerPage: number => dispatch(appSetItemsPerPage(number)),
  onDeleteLessons: () => dispatch(lessonsDelete()),
  onDeleteLists: () => dispatch(listsDelete()),
  onDeleteWords: () => dispatch(wordsDelete()),
  onLessonImport: lessons => dispatch(lessonsImport(lessons)),
  onListsImport: lists => dispatch(listsImport(lists)),
  onWordsImport: words => dispatch(wordsImport(words)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
