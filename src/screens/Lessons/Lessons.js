import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageHeader from '../../containers/PageHeader';
import Paper from 'material-ui/Paper';
import PageFooter from '../../components/PageFooter';
import LessonPreview from '../../components/LessonPreview';
import ListSelect from '../../components/ListSelect';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import MenuItem from 'material-ui/MenuItem';
import uniqid from 'uniqid';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  getListByID,
  compareByName,
  populatePredefinedLists,
  objectToArray,
  wordsToArray,
} from '../../misc';
import {
  DEFAULT_LESSON_QUESTIONS_CNT,
  QUESTION,
  QUESTION_TYPES,
  RATE_BY,
  SNACKBAR_HIDE_DURATION,
} from '../../constants';
import { lessonCreate, lessonAnonymousCreate } from '../../actions/lesson';

class Lessons extends React.Component {
  state = {
    listsSelected: [],
    listsSelectedWordsCnt: 0,
    formNewLessonOpened: false,
    newLessonName: '',
    createdLessonName: '',
    newLessonQuestionsCnt: 1,
    snackBarLessonCreatedOpened: false,
    rateBy: RATE_BY.SELF_RATING,
    questionType: QUESTION.WORD,
    sortBy: 'name',
    isAnonymousLesson: false,
    listsPredefinedPopulated: [],
    redirectTo: '',
  };

  componentDidMount() {
    this.populatePredefinedLists();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.words !== this.props.words) this.populatePredefinedLists();
  }

  populatePredefinedLists() {
    const wordsArray = wordsToArray(this.props.words);
    const listsPredefinedPopulated = objectToArray(
      populatePredefinedLists(this.props.listsPredefined, wordsArray)
    );
    this.setState({
      listsPredefinedPopulated,
    });
  }

  handleNewLessonNameChange = event => {
    this.setState({
      newLessonName: event.target.value,
    });
  };

  handleNewLessonBtnClick = () => {
    this.setState({
      formNewLessonOpened: !this.state.formNewLessonOpened,
    });
  };

  handleSnackBarLessonCreatedClose = () => {
    this.setState({
      snackBarLessonCreatedOpened: false,
    });
  };

  handleQuestionsCntChange = (event, value) => {
    this.setState({
      newLessonQuestionsCnt: value === 0 ? 1 : value,
    });
  };

  handleSortByChange = (event, index, value) => {
    this.setState({
      sortBy: value,
    });
  };

  createNewLesson() {
    if (!this.state.newLessonName) {
      this.setState({
        newLessonNameError: 'Please fill this field',
      });
      return;
    }
    this.props.onLessonCreate({
      name: this.state.newLessonName,
      listIDs: this.state.listsSelected,
      questionsCnt: this.state.newLessonQuestionsCnt,
      type: this.state.questionType,
      rateBy: this.state.rateBy,
    });
    this.resetNewLessonState();
    this.setState({
      createdLessonName: this.state.newLessonName,
      snackBarLessonCreatedOpened: true,
    });
  }

  createNewAnonymousLesson() {
    const id = uniqid();
    this.props.onLessonAnonymousCreate({
      id,
      listIDs: this.state.listsSelected,
      questionsCnt: this.state.newLessonQuestionsCnt,
      type: this.state.questionType,
      rateBy: this.state.rateBy,
    });
    this.resetNewLessonState();
    this.setState({
      redirectTo: `/lesson/run/${id}`,
    });
  }

  handleNewLessonCreate = () => {
    if (this.state.listsSelected.length === 0) {
      this.setState({
        newLessonListError: 'Please select some lists',
      });
      return;
    }
    if (this.state.isAnonymousLesson) {
      this.createNewAnonymousLesson();
    } else {
      this.createNewLesson();
    }
  };

  resetNewLessonState(closeNewLessonForm = true) {
    this.setState({
      formNewLessonOpened: closeNewLessonForm
        ? false
        : this.state.formNewLessonOpened,
      listsSelected: [],
      listsSelectedWordsCnt: 0,
      newLessonName: '',
      newLessonNameError: '',
      newLessonListError: '',
      newLessonQuestionsCnt: 1,
    });
  }

  handleListClick = (listID, isListSelected) => {
    const list = getListByID(
      listID,
      this.props.lists.concat(this.state.listsPredefinedPopulated)
    );
    if (!list) return;
    const listsSelected = [...this.state.listsSelected];
    let listsSelectedWordsCnt = this.state.listsSelectedWordsCnt;
    if (isListSelected) {
      const listIndex = listsSelected.indexOf(list.id);
      listsSelected.splice(listIndex, 1);
      listsSelectedWordsCnt -= list.wordIDs.length;
    } else {
      listsSelected.push(list.id);
      listsSelectedWordsCnt += list.wordIDs.length;
    }
    this.setState({
      listsSelected,
      listsSelectedWordsCnt,
      newLessonQuestionsCnt: this.getQuestionCount(listsSelectedWordsCnt),
    });
  };

  getQuestionCount(max) {
    return Math.min(DEFAULT_LESSON_QUESTIONS_CNT, max) || 1;
  }

  renderQuestionsCntSlider() {
    const max = this.state.listsSelectedWordsCnt;
    const disabled = max === 0;
    return (
      <React.Fragment>
        <Slider
          min={0}
          max={disabled ? 1 : max}
          step={1}
          value={this.state.newLessonQuestionsCnt}
          onChange={this.handleQuestionsCntChange}
          disabled={disabled}
          sliderStyle={{
            marginTop: '10px',
            marginBottom: '5px',
          }}
        />
        <div className="grid">
          <div className="grid__item grid__item--xs-span-6 text-left">{0}</div>
          <div className="grid__item grid__item--xs-span-6 text-right">
            {max}
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleRateByChange = (event, index, value) => {
    this.setState({
      rateBy: value,
    });
  };

  handleQuestionTypeChange = (event, index, value) => {
    this.setState({
      questionType: value,
    });
  };

  handleAnonymousLessonChange = (event, isChecked) => {
    this.resetNewLessonState(false);
    this.setState({
      isAnonymousLesson: isChecked,
    });
  };

  sortLessons(lessons) {
    const lessonsSorted = [...lessons];
    if (this.state.sortBy === 'name') {
      lessonsSorted.sort((itemA, itemB) => compareByName(itemA, itemB));
    } else if (this.state.sortBy === 'type') {
      lessonsSorted.sort((itemA, itemB) => {
        if (!itemA.type) return -1;
        if (!itemB.type) return 1;
        const compare = itemA.type
          .toLowerCase()
          .localeCompare(itemB.type.toLowerCase());
        //if equal sort by name
        if (compare === 0) return compareByName(itemA, itemB);
        return compare;
      });
    } else if (this.state.sortBy === 'score') {
      lessonsSorted.sort((itemA, itemB) => {
        if (!itemA.bestScore) return 1;
        if (!itemB.bestScore) return -1;
        const compare = itemB.bestScore - itemA.bestScore;
        //if equal sort by name
        if (compare === 0) return compareByName(itemA, itemB);
        return compare;
      });
    } else if (this.state.sortBy === 'least-recently-viewed') {
      lessonsSorted.sort((itemA, itemB) => {
        if (!itemA.dateViewed) return -1;
        if (!itemB.dateViewed) return 1;
        const compare = itemA.dateViewed - itemB.dateViewed;
        //if equal sort by name
        if (compare === 0) return compareByName(itemA, itemB);
        return compare;
      });
    } else if (this.state.sortBy === 'date-created') {
      lessonsSorted.sort((itemA, itemB) => {
        if (!itemA.dateCreated) return 1;
        if (!itemB.dateCreated) return -1;
        const compare = itemB.dateCreated - itemA.dateCreated;
        //if equal sort by name
        if (compare === 0) return compareByName(itemA, itemB);
        return compare;
      });
    }
    return lessonsSorted;
  }

  render() {
    const sortingOptions = [
      { title: 'Date Created', value: 'date-created' },
      { title: 'Least Recently Viewed', value: 'least-recently-viewed' },
      { title: 'Name', value: 'name' },
      { title: 'Score', value: 'score' },
      { title: 'Type', value: 'type' },
    ];

    const lessonsSorted = this.sortLessons(this.props.lessons);
    let lists;
    if (this.state.isAnonymousLesson) {
      lists = this.state.listsPredefinedPopulated;
    } else {
      lists = this.props.lists;
    }

    if (this.state.redirectTo)
      return <Redirect push to={this.state.redirectTo} />;

    return (
      <div className="page-all">
        <PageHeader>Your Lessons</PageHeader>
        <main className="page-content">
          <div className="container">
            <div className="grid grid--mid">
              {lessonsSorted.map(lesson => (
                <div
                  key={lesson.id}
                  className="grid__item grid__item--xxxl-span-2 grid__item--xl-span-3 grid__item--lg-span-4 grid__item--md-span-6"
                >
                  <Link
                    style={{ display: 'block' }}
                    to={`/lesson/${lesson.id}`}
                  >
                    <LessonPreview {...lesson} />
                  </Link>
                </div>
              ))}
            </div>
            {this.state.formNewLessonOpened && (
              <Paper className="mt20">
                <form
                  onSubmit={this.handleNewLessonCreate}
                  className="section-content mb20"
                >
                  <h2 className="text-center mb25">Create new lesson</h2>
                  <div className="text-center">
                    <Toggle
                      label="Anonymous lesson"
                      style={{
                        width: 190,
                        marginTop: 10,
                        marginBottom: 30,
                        display: 'inline-block',
                        textAlign: 'left',
                      }}
                      onToggle={this.handleAnonymousLessonChange}
                      defaultToggled={this.state.isAnonymousLesson}
                    />
                  </div>
                  <p className="mb10 text-weight-bold">Select lists:</p>
                  {lists.length === 0 && (
                    <p className="text-not-available">
                      Nothing to select, create some lists first, or select
                      anonymous lesson.
                    </p>
                  )}
                  <div className="grid grid--mid">
                    {lists.map(list => {
                      const isListSelected = this.state.listsSelected.includes(
                        list.id
                      );
                      return (
                        <div
                          key={list.id}
                          className="grid__item grid__item--xxxl-span-2 grid__item--xl-span-3 grid__item--lg-span-4 grid__item--md-span-6"
                        >
                          <ListSelect
                            className="mb20"
                            list={list}
                            isSelected={isListSelected}
                            onClick={this.handleListClick}
                          />
                        </div>
                      );
                    })}
                  </div>
                  {this.state.newLessonListError && (
                    <p className="text-error mb10">
                      {this.state.newLessonListError}
                    </p>
                  )}
                  <p className="mt30 text-weight-bold">
                    Set number of questions:{' '}
                    {this.state.listsSelectedWordsCnt === 0
                      ? 0
                      : this.state.newLessonQuestionsCnt}
                  </p>
                  {this.renderQuestionsCntSlider()}
                  <div className="grid">
                    <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6">
                      <SelectField
                        style={{ width: '100%', maxWidth: 300 }}
                        floatingLabelText="Rate by"
                        value={this.state.rateBy}
                        onChange={this.handleRateByChange}
                      >
                        <MenuItem
                          value={RATE_BY.SELF_RATING}
                          primaryText="Self-rating"
                        />
                        <MenuItem
                          value={RATE_BY.TYPE_IN}
                          primaryText="Type in"
                        />
                      </SelectField>
                    </div>
                    <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6">
                      <SelectField
                        style={{ width: '100%', maxWidth: 300 }}
                        floatingLabelText="Question type"
                        value={this.state.questionType}
                        onChange={this.handleQuestionTypeChange}
                      >
                        {QUESTION_TYPES.map(type => (
                          <MenuItem
                            key={type.value}
                            value={type.value}
                            primaryText={type.text}
                          />
                        ))}
                      </SelectField>
                    </div>
                    <div className="grid__item grid__item--lg-span-4 grid__item--md-span-6">
                      {!this.state.isAnonymousLesson && (
                        <TextField
                          style={{ width: '100%', maxWidth: 300 }}
                          floatingLabelText="Lesson name"
                          errorText={this.state.newLessonNameError}
                          onChange={this.handleNewLessonNameChange}
                          value={this.state.newLessonName}
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt15 mb5 text-right">
                    <RaisedButton
                      onClick={this.handleNewLessonCreate}
                      label={
                        this.state.isAnonymousLesson ? 'Run lesson' : 'Create'
                      }
                      primary
                      disabled={this.state.listsSelectedWordsCnt === 0}
                    />
                  </div>
                </form>
              </Paper>
            )}
            <div className="grid grid--center">
              <div className="grid__item grid__item--sm-span-6">
                <SelectField
                  style={{ width: '100%', maxWidth: 300 }}
                  floatingLabelText="Sort by"
                  value={this.state.sortBy}
                  onChange={this.handleSortByChange}
                >
                  {sortingOptions.map(option => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      primaryText={option.title}
                    />
                  ))}
                </SelectField>
              </div>
              <div className="grid__item grid__item--sm-span-6 text-right">
                <RaisedButton
                  className="mt15 mb15"
                  primary
                  onClick={this.handleNewLessonBtnClick}
                  label="New lesson"
                />
                <p className="mb10">
                  Total:{' '}
                  <span className="text-weight-bold">
                    {lessonsSorted.length}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </main>
        <Snackbar
          open={this.state.snackBarLessonCreatedOpened}
          message={`Lesson '${this.state.createdLessonName}' created`}
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarLessonCreatedClose}
        />
        <PageFooter />
      </div>
    );
  }
}

Lessons.propTypes = {
  lessons: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  listsPredefined: PropTypes.object.isRequired,
  onLessonCreate: PropTypes.func.isRequired,
  onLessonAnonymousCreate: PropTypes.func.isRequired,
  words: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  lessons: state.lessons,
  lists: state.lists,
  listsPredefined: state.listsPredefined,
  words: state.words,
});

const mapDispatchToProps = dispatch => ({
  onLessonCreate: lesson => dispatch(lessonCreate(lesson)),
  onLessonAnonymousCreate: lesson => dispatch(lessonAnonymousCreate(lesson)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lessons);
