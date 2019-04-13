import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PageHeader from '../../containers/PageHeader';
import PageFooter from '../../components/PageFooter';
import { connect } from 'react-redux';
import {
  BarChart,
  Bar,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';
import {
  populatePredefinedLists,
  getWordsAverageRating,
  findTheMostRecentAddedWord,
  getDateStr,
  getScoreStr,
  wordsToArray,
} from '../../misc';

class Overview extends React.Component {
  renderWordRatingCountChart(lists) {
    const listsData = [
      { name: 'not set', id: 'not-rated' },
      { name: '1', id: 'rating-1' },
      { name: '2', id: 'rating-2' },
      { name: '3', id: 'rating-3' },
      { name: '4', id: 'rating-4' },
      { name: '5', id: 'rating-5' },
    ];
    const listsDataPopulated = listsData.map(listItem => ({
      ...listItem,
      cnt: lists[listItem.id].wordIDs.length,
    }));
    return (
      <BarChart
        className="el-center chart-bar"
        width={400}
        height={230}
        data={listsDataPopulated}
      >
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="cnt" fill="#8884d8" />
      </BarChart>
    );
  }

  renderWordAverageRatingChart(words) {
    const wordsAverageRating = getWordsAverageRating(words);
    const chartData = [
      { name: 'unactive', value: 5 - wordsAverageRating, color: '#eee' },
      { name: 'active', value: wordsAverageRating, color: '#00adb5' },
    ];
    return (
      <div className="chart-donut">
        <div className="chart-donut__val">
          {isNaN(wordsAverageRating)
            ? 'no data'
            : Math.floor(wordsAverageRating * 10) / 10}
        </div>
        <PieChart width={210} height={210}>
          <Pie
            dataKey="value"
            data={chartData}
            cx={100}
            cy={100}
            innerRadius={80}
            outerRadius={100}
            paddingAngle={5}
            startAngle={90}
            endAngle={450}
          >
            {chartData.map(data => (
              <Cell key={data.name} fill={data.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }

  render() {
    const wordsArray = wordsToArray(this.props.words);
    const listsPredefinedPopulated = populatePredefinedLists(
      this.props.listsPredefined,
      wordsArray
    );
    const theMostRecentAdded = findTheMostRecentAddedWord(wordsArray);
    return (
      <div className="page-all">
        <PageHeader>Overview</PageHeader>
        <main className="page-content">
          <div className="container">
            <div className="grid text-center">
              <div className="grid__item grid__item--lg-span-6">
                <h3 className="mb20 mt20">Average rating</h3>
                {this.renderWordAverageRatingChart(wordsArray)}
              </div>
              <div className="grid__item grid__item--lg-span-6 grid__item--break-lg-40">
                <h3 className="mb20 mt20">Rating coverage</h3>
                {this.renderWordRatingCountChart(listsPredefinedPopulated)}
              </div>
            </div>
            <hr className="mt40 mb40" />
            <div className="section-content">
              <div className="grid grid--big text-lg-center">
                <div className="grid__item grid__item--xl-span-4">
                  <p className="text-huge">
                    Words total:{' '}
                    <span className="text-weight-bold">
                      {wordsArray.length}
                    </span>
                  </p>
                  {theMostRecentAdded && (
                    <p className="mt10 text-small">
                      The most recent:{' '}
                      <span className="text-weight-bold">
                        {theMostRecentAdded.word}
                      </span>{' '}
                      on{' '}
                      <span className="text-weight-bold">
                        {getDateStr(theMostRecentAdded.dateAdded)}
                      </span>
                    </p>
                  )}
                  <div className="m25" />
                </div>
                <div className="grid__item grid__item--xl-span-4 grid__item--lg-span-6 grid__item--break-lg-20">
                  <p className="text-huge">
                    Lists total:{' '}
                    <span className="text-weight-bold">
                      {this.props.lists.length}
                    </span>
                  </p>
                  {this.props.lists.length > 0 && (
                    <div className="mt10 text-small">
                      {this.props.lists.map(list => (
                        <div
                          className="row-item-cnt row-item-cnt--lg-center"
                          key={list.id}
                        >
                          <Link
                            to={`/list/${list.id}`}
                            className="row-item-cnt__item text-italic link-hover-blue link-hover-underline"
                          >
                            {list.name}
                          </Link>
                          <span className="row-item-cnt__cnt">
                            {list.wordIDs.length} words
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid__item grid__item--xl-span-4 grid__item--lg-span-6 grid__item--break-lg-40">
                  <p className="text-huge">
                    Lessons total:{' '}
                    <span className="text-weight-bold">
                      {this.props.lessons.length}
                    </span>
                  </p>
                  {this.props.lessons.length > 0 && (
                    <div className="mt10 text-small">
                      {this.props.lessons.map(lesson => (
                        <div
                          className="row-item-cnt row-item-cnt--lg-center"
                          key={lesson.id}
                        >
                          <Link
                            to={`/lesson/${lesson.id}`}
                            className="row-item-cnt__item text-italic link-hover-blue link-hover-underline"
                          >
                            {lesson.name}
                          </Link>
                          <span className="row-item-cnt__cnt">
                            {lesson.bestScore
                              ? getScoreStr(lesson.bestScore)
                              : 'no score yet'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        <PageFooter />
      </div>
    );
  }
}

Overview.propTypes = {
  lessons: PropTypes.array,
  lists: PropTypes.array,
  listsPredefined: PropTypes.object,
  words: PropTypes.object,
};

const mapStateToProps = state => ({
  lessons: state.lessons,
  lists: state.lists,
  listsPredefined: state.listsPredefined,
  words: state.words,
});

export default connect(mapStateToProps)(Overview);
