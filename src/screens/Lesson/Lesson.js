import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageHeader from '../../containers/PageHeader';
import ListPreviewContainer from '../../containers/ListPreviewContainer';
import PageFooter from '../../components/PageFooter';
import PropertySingle from '../../components/PropertySingle';
import Dialog from 'material-ui/Dialog';
import classNames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {
  lessonRemove,
  lessonResetScore,
  lessonListRemove,
} from '../../actions/lesson';
import { SNACKBAR_HIDE_DURATION } from '../../constants';
import {
  exportStoreToFile,
  getListByID,
  getDateStr,
  getScoreStr,
  getQuestionTypeNameByID,
} from '../../misc';

class Lesson extends React.Component {
  state = {
    lessonDetailsLoaded: false,
    wasLessonRemoved: false,
    isDialogRemoveOpened: false,
    isDialogResetScoreOpened: false,
    snackBarScoreResetedOpened: false,
    lessonNotFound: false,
  };

  handleRemoveLessonClick = () => {
    this.setState({
      isDialogRemoveOpened: true,
    });
  };

  handleDialogRemoveLessonClose = () => {
    this.setState({
      isDialogRemoveOpened: false,
    });
  };

  handleDialogRemoveLessonConfirm = () => {
    this.setState({
      wasLessonRemoved: true,
    });
    this.props.onLessonRemoved(this.props.id);
  };

  handleResetScoreClick = () => {
    this.setState({
      isDialogResetScoreOpened: true,
    });
  };

  handleDialogResetScoreClose = () => {
    this.setState({
      isDialogResetScoreOpened: false,
    });
  };

  handleDialogResetScoreConfirm = () => {
    this.props.onResetScore(this.props.id);
    this.setState({
      isDialogResetScoreOpened: false,
      snackBarScoreResetedOpened: true,
    });
  };

  handleSnackBarResetedScoreClose = () => {
    this.setState({
      snackBarScoreResetedOpened: false,
    });
  };

  handleExportLessonClick = () => {
    const exportData = {
      lessons: this.props.lessons.filter(
        lessons => lessons.id === this.props.id
      ),
    };
    exportStoreToFile(exportData);
  };

  getExistingLists() {
    const listAllIDs = this.props.listsAll.map(list => list.id);
    return this.props.listIDs.filter(listID => listAllIDs.includes(listID));
  }

  getLeftoverLists() {
    const listAllIDs = this.props.listsAll.map(list => list.id);
    return this.props.listIDs.filter(listID => !listAllIDs.includes(listID));
  }

  handleRemoveLeftoversClick = () => {
    this.getLeftoverLists().map(listID =>
      this.props.onLessonListRemoved(this.props.id, listID)
    );
  };

  renderDialogResetScore() {
    const dialogActions = [
      <RaisedButton
        className="ml10"
        key="btn-cancel"
        label="Cancel"
        onClick={this.handleDialogResetScoreClose}
      />,
      <RaisedButton
        className="ml10"
        key="btn-reset"
        label="Reset"
        secondary
        onClick={this.handleDialogResetScoreConfirm}
      />,
    ];

    return (
      <Dialog
        className="text-weight-bold text-big"
        actions={dialogActions}
        modal={false}
        open={this.state.isDialogResetScoreOpened}
        onRequestClose={this.handleDialogResetScoreClose}
      >
        Reset top score?
      </Dialog>
    );
  }

  renderDialogRemoveLesson() {
    const dialogActions = [
      <RaisedButton
        className="ml10"
        key="btn-cancel"
        label="Cancel"
        onClick={this.handleDialogRemoveLessonClose}
      />,
      <RaisedButton
        className="ml10"
        key="btn-remove"
        label="Remove"
        secondary
        onClick={this.handleDialogRemoveLessonConfirm}
      />,
    ];

    return (
      <Dialog
        className="text-weight-bold text-big"
        actions={dialogActions}
        modal={false}
        open={this.state.isDialogRemoveOpened}
        onRequestClose={this.handleDialogRemoveLessonClose}
      >
        Remove the lesson?
      </Dialog>
    );
  }

  render() {
    if (this.state.wasLessonRemoved) return <Redirect push to="/lesson" />;
    const existingLists = this.getExistingLists();
    const hasLists = existingLists.length > 0;
    const leftoverLists = this.getLeftoverLists();

    return (
      <div className="page-all">
        <PageHeader>
          {this.props.lessonNotFound
            ? 'Lesson not found'
            : `Lesson: ${this.props.name}`}
        </PageHeader>
        <main
          className={classNames('page-content', {
            'page-content--center': this.props.lessonNotFound,
          })}
        >
          {this.props.lessonNotFound && (
            <div className="container">
              <p className="text-error">Lesson not found</p>
            </div>
          )}
          {!this.props.lessonNotFound && (
            <React.Fragment>
              <div className="container mb40 mt10">
                <div className="text-center">
                  {this.props.bestScore >= 0 && (
                    <React.Fragment>
                      <h2 className="mb15">Top score</h2>
                      <p className="text-score mb15">
                        {getScoreStr(this.props.bestScore)}
                      </p>
                      {this.props.finishedIn >= 0 && (
                        <p className="mb20">
                          in{' '}
                          <span className="text-weight-bold text-bigger">
                            {this.props.finishedIn}
                          </span>{' '}
                          seconds
                        </p>
                      )}
                    </React.Fragment>
                  )}
                  {hasLists && (
                    <Link to={`/lesson/run/${this.props.id}`}>
                      <RaisedButton
                        className="mt10"
                        primary
                        label="Run lesson"
                      />
                    </Link>
                  )}
                </div>
              </div>
              <div className="bg-light clearfix">
                <div className="container mt25 mb25">
                  <div className="text-center">
                    <PropertySingle label="Question type">
                      <span>{getQuestionTypeNameByID(this.props.type)}</span>
                    </PropertySingle>
                    <PropertySingle label="Number of question">
                      <span>{this.props.questionsCnt}</span>
                    </PropertySingle>
                    {this.props.dateViewed && (
                      <PropertySingle label="Last viewed">
                        {getDateStr(this.props.dateViewed)}
                      </PropertySingle>
                    )}
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="text-center">
                  <h3 className="mt40 mb15">Lists included</h3>
                  {!hasLists && (
                    <p className="text-no-data mb25 mt10">No lists found</p>
                  )}
                  {hasLists && (
                    <div className="grid grid--mid grid--center">
                      {existingLists.map(listID => {
                        const list = getListByID(listID, this.props.listsAll);
                        return (
                          <div
                            className="grid__item grid__item--xxxl-span-2 grid__item--xl-span-3 grid__item--lg-span-4 grid__item--md-span-6"
                            key={list.id}
                          >
                            <Link to={`/list/${list.id}`}>
                              <ListPreviewContainer list={list} />
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="grid grid--small">
                  <div className="grid__item grid__item--sm-span-6 text-xs-center">
                    {this.props.bestScore >= 0 && (
                      <div className="mb10">
                        <RaisedButton
                          onClick={this.handleResetScoreClick}
                          label="Reset top score"
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid__item grid__item--sm-span-6 grid__item--break-xs-10 text-right text-xs-center">
                    <RaisedButton
                      onClick={this.handleExportLessonClick}
                      label="Export lesson"
                    />
                    {leftoverLists.length > 0 && (
                      <React.Fragment>
                        <div className="m10" />
                        <RaisedButton
                          onClick={this.handleRemoveLeftoversClick}
                          label={`Remove leftover lists (${
                            leftoverLists.length
                          })`}
                        />
                      </React.Fragment>
                    )}
                    <div className="m10" />
                    <RaisedButton
                      onClick={this.handleRemoveLessonClick}
                      label="Remove lesson"
                      secondary
                    />
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
        </main>
        <PageFooter />
        <Snackbar
          open={this.state.snackBarScoreResetedOpened}
          message="Top score reseted"
          autoHideDuration={SNACKBAR_HIDE_DURATION}
          onRequestClose={this.handleSnackBarResetedScoreClose}
        />
        {this.renderDialogResetScore()}
        {this.renderDialogRemoveLesson()}
      </div>
    );
  }
}

Lesson.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  listsAll: PropTypes.array,
  listIDs: PropTypes.array,
  lessons: PropTypes.array,
  lessonNotFound: PropTypes.bool,
  bestScore: PropTypes.number,
  finishedIn: PropTypes.number,
  questionsCnt: PropTypes.number,
  type: PropTypes.string,
  dateViewed: PropTypes.number,
  onLessonRemoved: PropTypes.func.isRequired,
  onLessonListRemoved: PropTypes.func.isRequired,
  onResetScore: PropTypes.func.isRequired,
};

Lesson.defaultProps = {
  listIDs: [],
};

const mapStateToProps = (state, ownProps) => {
  const urlID = ownProps.match.params.id; //get id part from url
  let lesson, currentLesson;
  for (lesson of state.lessons) {
    if (lesson.id === urlID) {
      currentLesson = lesson;
      break;
    }
  }
  if (!currentLesson) return { listsAll: state.lists, lessonNotFound: true };
  return {
    listsAll: state.lists,
    lessons: state.lessons,
    ...currentLesson,
  };
};

const mapDispatchToProps = dispatch => ({
  onLessonListRemoved: (lessonID, listID) =>
    dispatch(lessonListRemove(lessonID, listID)),
  onResetScore: lessonID => dispatch(lessonResetScore(lessonID)),
  onLessonRemoved: lessonID => dispatch(lessonRemove(lessonID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);
