/*global clearInterval setInterval Set*/

import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../containers/PageHeader';
import Paper from 'material-ui/Paper';
import Question from '../../containers/Question';
import LessonDetails from '../../components/LessonDetails';
import PageFooter from '../../components/PageFooter';
import BackgroundImage from '../../components/BackgroundImage';
import LoaderText from '../../components/LoaderText';
import classNames from 'classnames';
import LinearProgress from 'material-ui/LinearProgress';
import QuestionEval from './components/QuestionEval';
import LessonScore from './components/LessonScore';
import LessonFooter from './components/LessonFooter';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { lessonSetScore, lessonView } from '../../actions/lesson';
import {
  shuffle,
  isCorrectAnswer,
  getRandomBgPageImg,
  objectToArray,
  populatePredefinedLists,
  wordsToArray,
} from '../../misc';
import { HINT, QUESTION } from '../../constants';

class LessonRunning extends React.Component {
  state = {
    questionsWords: [],
    currentQuestionNumber: 0,
    timerVal: 0,
    answers: [],
    questionsLoaded: false,
    isLessonDone: false,
    showQuestionResult: false,
    isImmediateEvalActive: false,
    hintType: HINT.NONE,
    bgImgClass: '',
  };

  componentDidMount() {
    this.setBgImage();
    if (this.props.lessonNotFound) return;
    this.loadQuestions();
    if (!this.props.isAnonymous)
      this.props.onLessonViewed(this.props.lesson.id);
  }

  setBgImage() {
    this.setState({
      bgImgClass: getRandomBgPageImg(),
    });
  }

  componentDidUpdate(prevProps) {
    //when loading store asynchronisely (google drive etc) questions must be re-loaded when store ready
    if (this.props.appIsStateLoaded && !prevProps.appIsStateLoaded) {
      if (!this.props.lessonNotFound) this.loadQuestions();
    }
  }

  componentWillUnmount() {
    this.stopTimer(this.timer);
  }

  startTimer() {
    if (!this.timer) this.timer = setInterval(this.tick, 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  loadQuestions() {
    let selectedWordsIDs = [],
      list;
    for (list of this.props.lists) {
      if (this.props.lesson.listIDs.includes(list.id))
        selectedWordsIDs.push(...list.wordIDs);
    }
    const pickedWords = shuffle([...new Set(selectedWordsIDs)]) //using Set removes duplicants in the array - same word may be in multiple lists
      .map(id => this.props.words[id])
      .filter(word => word !== undefined) //filter leftover words that have been deleted
      .slice(0, this.props.lesson.questionsCnt);
    this.setState({
      questionsWords: pickedWords,
      questionsLoaded: true,
      questionsCnt: pickedWords.length,
    });
  }

  tick = () => {
    if (!this.state.questionsLoaded) {
      return;
    }
    if (this.state.isLessonDone) {
      this.stopTimer(this.timer);
      return;
    }
    this.setState({
      timerVal: this.state.timerVal + 1,
    });
  };

  handleAnswer = answered => {
    let answers = [...this.state.answers];
    answers.push({
      word: this.state.questionsWords[this.state.currentQuestionNumber],
      answered,
    });
    this.setState(
      {
        answers,
      },
      () => {
        if (this.state.isImmediateEvalActive)
          this.setState({
            showQuestionResult: true,
          });
        else this.moveToNextQuestion();
      }
    );
    this.stopTimer();
  };

  handleRestart = () => {
    this.setState({
      timerVal: 0,
      answers: [],
      currentQuestionNumber: 0,
      isLessonDone: false,
      oldScore: undefined,
    });
    this.loadQuestions();
  };

  moveToNextQuestion = () => {
    const isLessonDone =
      this.state.currentQuestionNumber + 1 === this.state.questionsCnt;
    const currentQuestionNumber = isLessonDone
      ? this.state.currentQuestionNumber
      : this.state.currentQuestionNumber + 1;
    this.setState({
      currentQuestionNumber,
      isLessonDone,
    });
    if (isLessonDone) this.lessonDone();
  };

  lessonDone() {
    const score =
      this.state.answers.reduce(
        (total, item) =>
          total + (isCorrectAnswer(item.answered, item.word.word) ? 1 : 0),
        0
      ) / this.state.questionsCnt;
    this.setState(
      {
        currentScore: score,
      },
      () => {
        this.setBestScore();
      }
    );
  }

  setBestScore() {
    const currentScore = this.state.currentScore,
      bestScore = this.props.lesson.bestScore || 0;
    const finishedIn = this.props.lesson.finishedIn || this.state.timerVal + 1; //is finishedIn is not set at all make sure it's value is bigger than lesson timer so it can be compared
    if (
      currentScore > bestScore ||
      (currentScore === bestScore && this.state.timerVal < finishedIn)
    ) {
      if (!this.props.isAnonymous) {
        //lesson done with new best score
        this.setState({
          oldScore: bestScore,
        });
        this.props.onSetLessonScore(
          this.props.lesson.id,
          currentScore,
          this.state.timerVal
        );
      }
    }
  }

  handleQuestionReady = () => {
    this.startTimer();
  };

  handleQuestionEvalContinue = () => {
    this.setState({
      showQuestionResult: false,
    });
    this.moveToNextQuestion();
  };

  handleImmediateEvalChange = (event, isInputChecked) => {
    this.setState({
      isImmediateEvalActive: isInputChecked,
    });
  };

  handleHintTypeChange = (event, index, value) => {
    this.setState({
      hintType: value,
    });
  };

  getLessonProgressPercents() {
    return this.state.isLessonDone
      ? 100
      : (this.state.currentQuestionNumber / this.state.questionsCnt) * 100;
  }

  getLessonName() {
    if (this.props.isAnonymous) return 'My lesson';
    return this.props.lessonNotFound
      ? 'Lesson not found'
      : `Lesson: ${this.props.lesson.name}`;
  }

  render() {
    const word = this.state.questionsWords[this.state.currentQuestionNumber];
    const lessonNotFound = this.props.lessonNotFound;
    const languageNotSet =
      !this.props.language && this.props.lesson.type === QUESTION.TRANSLATION;
    const lessonFineToDisplay = !lessonNotFound && !languageNotSet;
    return (
      <div className="page-all bg-dark bg-page">
        <BackgroundImage className="bg-page__img" src={this.state.bgImgClass} />
        <PageHeader>{this.getLessonName()}</PageHeader>
        <main className="page-content page-content--center">
          <div className="container container--w-limit">
            {lessonNotFound && (
              <p className="text-error mb25 mt10">Lesson not found</p>
            )}
            {!lessonNotFound && languageNotSet && (
              <div className="text-bigger text-center text-white text-weight-medium mb25 mt10">
                <p className="mb10">Cannot load translation, no language set</p>
                <p>
                  please set it in{' '}
                  <Link className="link-underline" to="/settings">
                    Settings
                  </Link>
                </p>
              </div>
            )}
            {lessonFineToDisplay && (
              <React.Fragment>
                {!this.state.questionsLoaded && (
                  <LoaderText className="mb25 mt10" />
                )}
                {this.state.questionsLoaded && (
                  <React.Fragment>
                    {this.state.questionsWords.length === 0 && (
                      <p className="text-no-data text-white mb25 mt10">
                        {this.props.isAnonymous
                          ? 'No words matching selected lists'
                          : 'Lesson is empty'}
                      </p>
                    )}
                    {this.state.questionsWords.length > 0 && (
                      <div>
                        <div
                          className={classNames('lesson-running', {
                            'lesson-running--unactive': this.state
                              .showQuestionResult,
                          })}
                        >
                          <Paper
                            zDepth={3}
                            style={{ borderRadius: 6, overflow: 'hidden' }}
                          >
                            <LinearProgress
                              mode="determinate"
                              value={this.getLessonProgressPercents()}
                            />
                            {this.state.showQuestionResult && (
                              <QuestionEval
                                answer={
                                  this.state.answers[
                                    this.state.answers.length - 1 //last answer
                                  ]
                                }
                                onContinue={this.handleQuestionEvalContinue}
                              />
                            )}
                            <div className="lesson-running__content">
                              {!this.state.isLessonDone && (
                                <React.Fragment>
                                  <div className="lesson-running__steps">
                                    {this.state.currentQuestionNumber + 1}/
                                    {this.state.questionsCnt}
                                  </div>
                                  <div className="lesson-running__time">
                                    {this.state.timerVal}s
                                  </div>
                                  <div className="lesson-running__question">
                                    <Question
                                      rateBy={this.props.lesson.rateBy}
                                      onQuestionReady={this.handleQuestionReady}
                                      onAnswer={this.handleAnswer}
                                      type={this.props.lesson.type}
                                      wordID={word.id}
                                      word={word.word}
                                      customField={word.customField}
                                      audioSrc={word.audioSrc}
                                      imageSrc={word.imageSrc}
                                      hintType={this.state.hintType}
                                    />
                                  </div>
                                </React.Fragment>
                              )}
                              {this.state.isLessonDone && (
                                <LessonScore
                                  newScore={this.state.currentScore}
                                  oldScore={this.state.oldScore}
                                  timerVal={this.state.timerVal}
                                  onRestart={this.handleRestart}
                                />
                              )}
                            </div>
                          </Paper>
                        </div>
                        {!this.state.isLessonDone && (
                          <LessonFooter
                            questionType={this.props.lesson.type}
                            hintType={this.state.hintType}
                            onHintTypeChange={this.handleHintTypeChange}
                            onImmediateEvalChange={
                              this.handleImmediateEvalChange
                            }
                            isImmediateEval={this.state.isImmediateEvalActive}
                          />
                        )}
                        {this.state.isLessonDone && (
                          <Paper>
                            <LessonDetails answers={this.state.answers} />
                          </Paper>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                )}
              </React.Fragment>
            )}
          </div>
        </main>
        <PageFooter />
      </div>
    );
  }
}

LessonRunning.propTypes = {
  lists: PropTypes.array,
  words: PropTypes.object,
  id: PropTypes.string,
  lesson: PropTypes.object.isRequired,
  onSetLessonScore: PropTypes.func.isRequired,
  onLessonViewed: PropTypes.func.isRequired,
  lessonNotFound: PropTypes.bool,
  appIsStateLoaded: PropTypes.bool,
  language: PropTypes.string,
  isAnonymous: PropTypes.bool,
};

LessonRunning.defaultProps = {
  lesson: {},
  isAnonymous: false,
};

const mapStateToProps = (state, ownProps) => {
  const urlID = ownProps.match.params.id; //get id part from url

  //find the lesson by url, try normal lessons first, then anonymous lessons
  let isAnonymous = false,
    lists = state.lists,
    lesson = state.lessons.find(lesson => lesson.id === urlID);
  if (!lesson) {
    lesson = state.lessonsAnonymous.find(lesson => lesson.id === urlID);
    const wordsArray = wordsToArray(state.words);
    lists = objectToArray(
      populatePredefinedLists(state.listsPredefined, wordsArray)
    );
    isAnonymous = true;
  }
  if (!lesson) return { lessonNotFound: true };

  return {
    id: urlID,
    appIsStateLoaded: state.app.isStateLoaded,
    language: state.app.language,
    lists,
    words: state.words,
    isAnonymous,
    lesson,
  };
};

const mapDispatchToProps = dispatch => ({
  onSetLessonScore: (lessonID, score, finishedIn) =>
    dispatch(lessonSetScore(lessonID, score, finishedIn)),
  onLessonViewed: lessonID => dispatch(lessonView(lessonID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonRunning);
