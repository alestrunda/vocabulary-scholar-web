import React from 'react';
import PropTypes from 'prop-types';
import BackgroundImage from '../../components/BackgroundImage';
import classNames from 'classnames';
import { getRandomBgPageImg } from '../../misc';

class PageBackground extends React.Component {
  state = {
    bgImgClass: '',
  };

  componentDidMount() {
    this.setState({
      bgImgClass: getRandomBgPageImg(),
    });
  }

  render() {
    return (
      <div className={classNames('bg-page', this.props.className)}>
        <BackgroundImage className="bg-page__img" src={this.state.bgImgClass} />
        {this.props.children}
      </div>
    );
  }
}

PageBackground.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default PageBackground;
