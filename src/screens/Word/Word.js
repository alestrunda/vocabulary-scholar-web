import React from 'react';
import PropTypes from 'prop-types';
import { getWordData, parseWordResponse } from '../../api/api';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import RaisedButton from 'material-ui/RaisedButton';
import AudioIcon from '../../components/AudioIcon';
import PageHeader from '../../containers/PageHeader';
import RatingStars from '../../components/RatingStars';
import PageFooter from '../../components/PageFooter';
import LoaderText from '../../components/LoaderText';
import PhrasesWord from '../../containers/PhrasesWord/PhrasesWord';
import TextHighlightMenu from '../../containers/TextHighlightMenu';
import WordListsEditContainer from '../../containers/WordListsEditContainer';
import DialogWordRemove from './components/DialogWordRemove';
import WordProps from './components/WordProps';
import WordInputFields from './components/WordInputFields';
import PopupSetRating from './components/PopupSetRating';
import Snackbar from 'material-ui/Snackbar';
import { Link } from 'react-scroll';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  wordSetCustomField,
  wordSetFavorite,
  wordSetImageSrc,
  wordSetAudioSrc,
  wordSetRating,
  wordView,
} from '../../actions/word';
import { SNACKBAR_HIDE_DURATION } from '../../constants';
import { getAverageFromArray, wordIDToQuery } from '../../misc';

class Word extends React.Component {
  constructor(props) {
    super(props);
    const typingToStoreDebounce = 250; //ms
    this.triggerPropertyChangeAction = debounce(
      this.triggerPropertyChangeAction,
      typingToStoreDebounce
    );
  }

  state = this.getDefaultState();

  getDefaultState() {
    return {
      loaded: false,
      openedSections: [],
      popupRatingOpened: false,
      snackBarRatingOpened: false,
      isDialogRemoveOpened: false,
      customField: '',
      word: {},
    };
  }

  componentDidMount() {
    this.initLoad();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.entry !== this.props.entry) {
      this.setState(this.getDefaultState()); //reset state
      this.initLoad();
    }
    //word state could be inited when the app state is not loaded yet, so make sure to load data from the app state
    if (!prevProps.isStateLoaded && this.props.isStateLoaded) {
      this.setStateFromProps();
    }
  }

  initLoad() {
    this.setStateFromProps();
    this.updateWordViewedDate();
    this.loadWordData(this.props.entry);
  }

  setStateFromProps() {
    this.setState({
      word: {
        id: this.props.id,
        ...this.state.word,
      },
      audioSrc: this.props.audioSrc,
      customField: this.props.customField,
      imageSrc: this.props.imageSrc,
    });
  }

  async loadWordData(entry) {
    let res;
    //get api response
    try {
      res = await getWordData(entry);
      //do not update if component already unmounted - though it's an anti-pattern, found no 'clean' way how to solve it in async function
      if (this.isUnmounted) return;
    } catch (e) {
      //do not update if component already unmounted - though it's an anti-pattern, found no 'clean' way how to solve it in async function
      if (this.isUnmounted) return;
      let error;
      if (e.response && e.response.status === 403)
        error = 'Max number of queries reached, try again later';
      else if (e.response && e.response.status === 404) error = 'Not found';
      else error = 'Service not available';
      this.setState({
        error,
        loaded: true,
        word: {
          id: this.props.id,
        },
      });
      return;
    }
    //parse the response
    try {
      const wordData = parseWordResponse(res);
      this.setState({
        word: wordData,
        loaded: true,
        error: null,
      });
    } catch (e) {
      this.setState({
        loaded: true,
        error: 'Data format not recognized',
      });
    }
  }

  handleFavoriteClick = () => {
    if (this.props.isFavorite) {
      //show dialog when removing from favorites
      this.setState({
        isDialogRemoveOpened: true,
      });
    } else {
      //add to favorites and init prop date viewed
      this.props.onSetFavorite(this.state.word.id, this.state.word.word, true);
      this.props.onUpdateWordViewedDate(this.state.word.id);
    }
  };

  handleRatingClick = val => {
    this.props.onSetRating(this.state.word.id, val);
    this.setState({
      popupRatingOpened: false,
      snackBarRatingOpened: true,
    });
  };

  updateWordViewedDate() {
    if (this.props.isFavorite)
      this.props.onUpdateWordViewedDate(this.state.word.id || this.props.id);
  }

  closeRatingPopup = () => {
    this.setState({
      popupRatingOpened: false,
    });
  };

  handleSnackBarRatingClose = () => {
    this.setState({
      snackBarRatingOpened: false,
    });
  };

  handlePropertyChange = (inputName, inputValue) => {
    this.setState({
      [inputName]: inputValue,
    });
    this.triggerPropertyChangeAction(inputName, inputValue);
  };

  triggerPropertyChangeAction(name, value) {
    if (name === 'audioSrc') {
      this.props.onSetAudioSrc(this.state.word.id, value);
    } else if (name === 'customField') {
      this.props.onSetCustomField(this.state.word.id, value);
    } else if (name === 'imageSrc') {
      this.props.onSetImageSrc(this.state.word.id, value);
    }
  }

  getLexicalEntries(lexicalEntry) {
    let hasMultipleEntries = false;
    const entries = lexicalEntry.entries.map(entry => {
      const entryParts = entry.filter(
        entryItem =>
          entryItem.definitions.length || entryItem.shortDefinitions.length
      );
      if (!hasMultipleEntries && entryParts.length > 1)
        hasMultipleEntries = true;
      return entryParts.map((entryItem, entryIndex) => {
        if (
          !this.state.openedSections.includes(lexicalEntry.category) &&
          entryIndex > 0
        )
          return null;
        const definitions = entryItem.definitions.map((definition, index) => (
          <div key={`definition-${index}`}>
            <TextHighlightMenu isPhraseDisabled={!this.props.isFavorite}>
              {definition}
            </TextHighlightMenu>
          </div>
        ));
        const shortDefinitions = entryItem.shortDefinitions.map(
          (definition, index) => (
            <div key={`shortDefinition-${index}`}>
              <TextHighlightMenu isPhraseDisabled={!this.props.isFavorite}>
                {definition}
              </TextHighlightMenu>
            </div>
          )
        );
        const examples = entryItem.examples.map((example, index) => (
          <li className="list-arrows__item" key={`examples-${index}`}>
            <TextHighlightMenu isPhraseDisabled={!this.props.isFavorite}>{`"${
              example.text
            }"`}</TextHighlightMenu>
          </li>
        ));
        return (
          <div
            key={`${lexicalEntry.category.toLowerCase()}-${entryIndex}`}
            className="word-section__part"
          >
            <div className="section-items">
              <div className="section-items__content text-big">
                {definitions.length > 0 ? definitions : shortDefinitions}
              </div>
            </div>
            {examples.length > 0 && (
              <div className="section-items">
                <p className="heading-tiny section-items__title">Examples:</p>
                <div className="section-items__content">
                  <ul className="list-arrows text-italic">{examples}</ul>
                </div>
              </div>
            )}
          </div>
        );
      });
    });
    return (
      <React.Fragment>
        <TransitionGroup>
          {entries.map(parts =>
            parts.map((entry, index) => {
              if (!entry) return null;
              return (
                <CSSTransition key={index} classNames="fade" timeout={500}>
                  {entry}
                </CSSTransition>
              );
            })
          )}
        </TransitionGroup>
        {hasMultipleEntries &&
          !this.state.openedSections.includes(lexicalEntry.category) && (
            <div className="text-center">
              <RaisedButton
                key={`${lexicalEntry.category.toLowerCase()}-show-more`}
                label="Show all definitions"
                onClick={() => {
                  this.openSection(lexicalEntry.category);
                }}
              />
            </div>
          )}
      </React.Fragment>
    );
  }

  openSection(category) {
    this.setState({
      openedSections: [...this.state.openedSections, category],
    });
  }

  openRatingPopup = () => {
    this.setState({
      popupRatingOpened: true,
    });
  };

  getMainSpelling() {
    const word = this.state.word;
    return this.state.loaded &&
      word &&
      word.lexicalEntries &&
      word.lexicalEntries[0].pronunciations &&
      word.lexicalEntries[0].pronunciations.spelling
      ? word.lexicalEntries[0].pronunciations.spelling
      : 'not available';
  }

  handleDialogRemoveClose = () => {
    this.setState({
      isDialogRemoveOpened: false,
    });
  };

  handleDialogRemoveConfirm = () => {
    this.setState({
      isDialogRemoveOpened: false,
    });
    this.props.onSetFavorite(this.state.word.id, this.state.word.word, false);
  };

  getWordName() {
    return (
      (this.state.word && this.state.word.word) || //word name loaded from api
      this.props.word || //word name saved earlier when set to favourite
      wordIDToQuery(this.props.entry) //search query
    );
  }

  render() {
    const wordData = this.state.word,
      isLoaded = this.state.loaded,
      isWordDataAvailable = isLoaded && !this.state.error && wordData,
      spelling = this.getMainSpelling();

    const avgRating = getAverageFromArray(this.props.ratings);

    return (
      <div className="page-all">
        <PageHeader>{this.getWordName()}</PageHeader>
        <main className="page-content">
          <div className="container word-detail">
            <div className="word-detail__head word-head">
              <div className="word-head__left">
                {(isWordDataAvailable || this.props.isFavorite) && (
                  <FloatingActionButton
                    data-testid="button-favorite"
                    onClick={this.handleFavoriteClick}
                    backgroundColor={this.props.isFavorite ? '' : '#aaa'}
                    style={{ width: 50, height: 50 }}
                    iconStyle={{ width: 50, height: 50 }}
                  >
                    <ActionFavorite style={{ width: 28 }} />
                  </FloatingActionButton>
                )}
              </div>
              <div className="word-head__center">
                {isWordDataAvailable && (
                  <div className="word-spelling-audio">
                    <span className="word-spelling">{`[${spelling}]`}</span>
                    {wordData.lexicalEntries &&
                      wordData.lexicalEntries[0].pronunciations &&
                      wordData.lexicalEntries[0].pronunciations.audio && (
                        <div className="word-spelling-audio__audio">
                          <AudioIcon
                            src={
                              wordData.lexicalEntries[0].pronunciations.audio
                            }
                            size={30}
                            iconSize={18}
                          />
                        </div>
                      )}
                  </div>
                )}
              </div>
              <div className="word-head__right">
                {this.props.isFavorite && (
                  <RatingStars
                    onStarClick={this.openRatingPopup}
                    iconSize={24}
                    stars={avgRating}
                  />
                )}
              </div>
            </div>
            <div className="word-detail__content">
              {!isLoaded && <LoaderText className="mb25 mt10" />}
              {isLoaded && this.state.error && (
                <p className="text-error mb25 mt10">{this.state.error}</p>
              )}
              {isWordDataAvailable && (
                <React.Fragment>
                  <ul className="list-tabs">
                    {wordData.lexicalEntries.map((lexicalEntry, index) => (
                      <li
                        className="list-tabs__item"
                        key={`${lexicalEntry.category}-${index}`} //lexicalEntry.category is not unique
                      >
                        <Link
                          className="list-tabs__link cursor-pointer"
                          to={`category-${lexicalEntry.category}`}
                          smooth={true}
                          duration={500}
                        >
                          {lexicalEntry.category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  {wordData.lexicalEntries.map((lexicalEntry, itemIndex) => (
                    <div
                      className="word-section"
                      id={`category-${lexicalEntry.category}`}
                      key={`${lexicalEntry.category}-${itemIndex}`} //lexicalEntry.category is not unique
                    >
                      <div className="word-section__head">
                        <h3 className="word-section__title">
                          <span className="word-section__title-num">
                            {itemIndex + 1}.
                          </span>
                          {lexicalEntry.category}
                        </h3>
                        <span className="word-section__head-spelling word-spelling">
                          {lexicalEntry.pronunciations.spelling &&
                            lexicalEntry.pronunciations.spelling !== spelling &&
                            `[${lexicalEntry.pronunciations.spelling}]`}
                        </span>
                      </div>
                      <div className="word-section__content">
                        {this.getLexicalEntries(lexicalEntry)}
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              )}
            </div>
          </div>
          {this.props.isFavorite && (
            <React.Fragment>
              <section className="section-content section-content--v-big bg-light">
                <h4 className="mb10">In lists</h4>
                <WordListsEditContainer
                  wordID={this.state.word.id || this.props.id}
                />
              </section>
              <section className="section-content section-content--v-big">
                <h4>Lesson settings</h4>
                <WordInputFields
                  word={this.getWordName()}
                  image={this.state.imageSrc}
                  audio={this.state.audioSrc}
                  customField={this.state.customField}
                  onChange={this.handlePropertyChange}
                />
              </section>
              <section className="section-content section-content--v-big bg-light">
                <h4 className="mb10">Word phrases</h4>
                <PhrasesWord
                  word={this.getWordName()}
                  wordID={this.state.word.id || this.props.id}
                  phrases={this.props.phrases}
                />
              </section>
              <section className="section-content section-content--v-big pb0">
                <WordProps
                  dateViewed={this.props.dateViewed}
                  dateRated={this.props.dateRated}
                  dateAdded={this.props.dateAdded}
                />
              </section>
            </React.Fragment>
          )}
        </main>
        <PopupSetRating
          avgRating={avgRating}
          isActive={this.state.popupRatingOpened}
          onClose={this.closeRatingPopup}
          onStarClick={this.handleRatingClick}
          ratings={this.props.ratings}
        />
        {this.props.ratings && (
          <Snackbar
            open={this.state.snackBarRatingOpened}
            message={`Rating ${
              this.props.ratings[this.props.ratings.length - 1]
            } saved`}
            autoHideDuration={SNACKBAR_HIDE_DURATION}
            onRequestClose={this.handleSnackBarRatingClose}
          />
        )}
        <DialogWordRemove
          active={this.state.isDialogRemoveOpened}
          onCancel={this.handleDialogRemoveClose}
          onConfirm={this.handleDialogRemoveConfirm}
        />
        <PageFooter />
      </div>
    );
  }
}

Word.propTypes = {
  id: PropTypes.string,
  entry: PropTypes.string,
  isFavorite: PropTypes.bool,
  ratings: PropTypes.arrayOf(PropTypes.number),
  dateRated: PropTypes.number,
  dateViewed: PropTypes.number,
  dateAdded: PropTypes.number,
  imageSrc: PropTypes.string,
  audioSrc: PropTypes.string,
  customField: PropTypes.string,
  isStateLoaded: PropTypes.bool,
  onSetAudioSrc: PropTypes.func.isRequired,
  onSetCustomField: PropTypes.func.isRequired,
  onSetFavorite: PropTypes.func.isRequired,
  onSetImageSrc: PropTypes.func.isRequired,
  onSetRating: PropTypes.func.isRequired,
  onUpdateWordViewedDate: PropTypes.func.isRequired,
  wordInLists: PropTypes.array,
  word: PropTypes.string,
  phrases: PropTypes.array,
};

const mapDispatchToProps = dispatch => ({
  onSetCustomField: (id, customField) =>
    dispatch(wordSetCustomField(id, customField)),
  onSetFavorite: (id, word, isSettingAsFavorite) =>
    dispatch(wordSetFavorite({ wordID: id, word, isSettingAsFavorite })),
  onUpdateWordViewedDate: id => dispatch(wordView(id)),
  onSetImageSrc: (id, imageSrc) => dispatch(wordSetImageSrc(id, imageSrc)),
  onSetAudioSrc: (id, audioSrc) => dispatch(wordSetAudioSrc(id, audioSrc)),
  onSetRating: (id, rating) => dispatch(wordSetRating({ wordID: id, rating })),
});

const findWord = (entry, words) => {
  const entryNorm = entry.toLowerCase();
  if (words.hasOwnProperty(entryNorm))
    //search word by ID
    return words[entryNorm];
  //search word by name
  let wordID;
  for (wordID in words) {
    if (entryNorm === words[wordID].word) return words[wordID];
  }
  return null;
};

const mapStateToProps = (state, ownProps) => {
  const entry = ownProps.match.params.entry; //get entry part from url
  let word = findWord(entry, state.words);
  const wordExists = !!word;
  const wordInLists = wordExists
    ? state.lists
        .filter(list => list.wordIDs.includes(word.id))
        .map(list => list.id)
    : [];
  if (!word) word = {};
  return {
    isStateLoaded: state.app.isStateLoaded,
    entry,
    isFavorite: wordExists,
    wordInLists,
    ...word,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Word);
