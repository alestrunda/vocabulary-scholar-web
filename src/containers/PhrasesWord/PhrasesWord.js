import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PhraseWordPreview from '../../components/PhraseWordPreview';
import Popup from '../../components/Popup';
import PhraseWordSettings from '../../components/PhraseWordSettings';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import { appSetSelectedPhrase } from '../../actions/app';
import {
  wordAddPhrase,
  wordEditPhrase,
  wordRemovePhrase,
} from '../../actions/word';
import { SNACKBAR_HIDE_DURATION } from '../../constants';

export class PhrasesWord extends React.Component {
  state = {
    isPopupNewPhraseOpened: false,
    isPopupEditPhraseOpened: false,
    isDialogPhraseRemoveOpened: false,
    isSnackBarPhraseAddedOpened: false,
    isSnackBarPhraseEditedOpened: false,
    isSnackBarPhraseRemovedOpened: false,
  };

  componentDidMount() {
    if (this.props.phraseSelected) {
      //open popup with phrase settings right away if perticular phrase set
      this.setState({
        isPopupNewPhraseOpened: true,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.phraseSelected !== this.props.phraseSelected &&
      !this.state.isPopupNewPhraseOpened
    ) {
      //open popup with phrase settings right away if perticular phrase set
      this.setState({
        isPopupNewPhraseOpened: true,
      });
    }
  }

  componentWillUnmount() {
    //selected phrase is saved in store, so it should be cleaned when the work with phrases is done,
    //we want to see empty form next time we open it
    this.props.onPhraseSelected('');
  }

  handleNewPhraseBtnClick = () => {
    this.setState({
      isPopupNewPhraseOpened: true,
    });
  };

  closeNewPhrasePopup = () => {
    this.setState({
      isPopupNewPhraseOpened: false,
    });
  };

  closeEditPhrasePopup = () => {
    this.setState({
      isPopupEditPhraseOpened: false,
    });
  };

  handleDialogPhraseRemoveConfirm = () => {
    this.props.onWordRemovePhrase(
      this.props.wordID,
      this.state.phraseIDToRemove
    );
    this.setState({
      isSnackBarPhraseRemovedOpened: true,
    });
  };

  handleDialogPhraseRemoveClose = () => {
    this.setState({
      isDialogPhraseRemoveOpened: false,
    });
  };

  handlePhraseRemove = phrase => {
    this.setState({
      isDialogPhraseRemoveOpened: true,
      phraseIDToRemove: phrase,
    });
  };

  handlePhraseEdit = phraseID => {
    const phraseToEdit = this.props.phrases.find(
      phrase => phrase.id === phraseID
    );
    this.setState({
      isPopupEditPhraseOpened: true,
      phraseToEdit,
    });
  };

  editPhrase = (phrase, startIndex, endIndex) => {
    this.props.onEditPhrase(
      this.props.wordID,
      this.state.phraseToEdit.id,
      phrase,
      startIndex,
      endIndex
    );
    this.closeEditPhrasePopup();
    this.setState({
      isSnackBarPhraseEditedOpened: true,
    });
  };

  savePhrase = (phrase, startIndex, endIndex) => {
    this.props.onAddPhrase(this.props.wordID, phrase, startIndex, endIndex);
    this.closeNewPhrasePopup();
    this.setState({
      isSnackBarPhraseAddedOpened: true,
    });
  };

  handleSnackBarPhraseAddedClose = () => {
    this.setState({
      isSnackBarPhraseAddedOpened: false,
    });
  };

  handleSnackBarPhraseEditedClose = () => {
    this.setState({
      isSnackBarPhraseEditedOpened: false,
    });
  };

  handleSnackBarPhraseRemovedClose = () => {
    this.setState({
      isSnackBarPhraseRemovedOpened: false,
    });
  };

  renderPhraseRemoveDialog() {
    const phraseToRemove = this.props.phrases.find(
      phrase => phrase.id === this.state.phraseIDToRemove
    );
    if (phraseToRemove === undefined) return; //phrase not found
    const dialogActions = [
      <RaisedButton
        className="ml10"
        key="btn-cancel"
        label="Cancel"
        onClick={this.handleDialogPhraseRemoveClose}
      />,
      <RaisedButton
        className="ml10"
        key="btn-remove"
        label="Remove"
        secondary={true}
        onClick={this.handleDialogPhraseRemoveConfirm}
      />,
    ];
    return (
      <Dialog
        actions={dialogActions}
        modal={false}
        open={this.state.isDialogPhraseRemoveOpened}
        onRequestClose={this.handleDialogPhraseRemoveClose}
      >
        <p className="mb10 text-weight-bold text-big">
          Do you wish to remove this phrase?
        </p>
        <p className="phrase-excerpt">&quot;{phraseToRemove.phrase}&quot;</p>
      </Dialog>
    );
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.props.phrases.length === 0 && <p>None</p>}
        <div className="mb20">
          {this.props.phrases.map(phrase => (
            <PhraseWordPreview
              key={phrase.id}
              onEdit={this.handlePhraseEdit}
              onRemove={this.handlePhraseRemove}
              {...phrase}
            />
          ))}
        </div>
        <div className="text-center">
          <RaisedButton
            primary
            label="New phrase"
            onClick={this.handleNewPhraseBtnClick}
            data-test-id="btn-new-phrase"
          />
        </div>
        <Popup
          isActive={this.state.isPopupNewPhraseOpened}
          onClose={this.closeNewPhrasePopup}
          title="New phrase"
          data-test-id="popup-new-phrase"
        >
          <div className="text-center">
            <PhraseWordSettings
              phrase={{ phrase: this.props.phraseSelected }}
              word={this.props.word}
              wordID={this.props.wordID}
              onSubmit={this.savePhrase}
            />
          </div>
        </Popup>
        <Popup
          isActive={this.state.isPopupEditPhraseOpened}
          onClose={this.closeEditPhrasePopup}
          title="Edit phrase"
        >
          <div className="text-center">
            <PhraseWordSettings
              phrase={this.state.phraseToEdit}
              word={this.props.word}
              wordID={this.props.wordID}
              onSubmit={this.editPhrase}
              submitText="Edit phrase"
            />
          </div>
        </Popup>
        <Snackbar
          open={this.state.isSnackBarPhraseAddedOpened}
          message="New phrase added"
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarPhraseAddedClose}
        />
        <Snackbar
          open={this.state.isSnackBarPhraseEditedOpened}
          message="Selected phrase was changed"
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarPhraseEditedClose}
        />
        <Snackbar
          open={this.state.isSnackBarPhraseRemovedOpened}
          message="Selected phrase was removed"
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarPhraseRemovedClose}
        />
        {this.renderPhraseRemoveDialog()}
      </div>
    );
  }
}

PhrasesWord.propTypes = {
  wordID: PropTypes.string.isRequired,
  word: PropTypes.string.isRequired,
  phrases: PropTypes.array,
  className: PropTypes.string,
  phraseSelected: PropTypes.string,
  style: PropTypes.object,
  onWordRemovePhrase: PropTypes.func.isRequired,
  onAddPhrase: PropTypes.func.isRequired,
  onEditPhrase: PropTypes.func.isRequired,
  onPhraseSelected: PropTypes.func.isRequired,
};

PhrasesWord.defaultProps = {
  phrases: [],
};

const mapStateToProps = state => ({
  phraseSelected: state.app.phraseSelected,
});

const mapDispatchToProps = dispatch => ({
  onWordRemovePhrase: (wordID, phraseID) =>
    dispatch(wordRemovePhrase(wordID, phraseID)),
  onAddPhrase: (wordID, phrase, startIndex, endIndex) =>
    dispatch(wordAddPhrase({ wordID, phrase, startIndex, endIndex })),
  onEditPhrase: (wordID, phraseID, phrase, startIndex, endIndex) =>
    dispatch(
      wordEditPhrase({ wordID, phraseID, phrase, startIndex, endIndex })
    ),
  onPhraseSelected: phrase => dispatch(appSetSelectedPhrase(phrase)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhrasesWord);
