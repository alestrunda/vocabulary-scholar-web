/*global Image*/

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class BackgroundImage extends React.PureComponent {
  state = {
    isLoaded: false,
  };

  componentDidMount() {
    if (this.props.src) this.loadBgImg();
  }

  componentDidUpdate(prevProps) {
    if (this.props.src !== prevProps.src) this.loadBgImg();
  }

  componentWillUnmount() {
    this.img && this.img.removeEventListener('load', this.loaded);
  }

  loadBgImg() {
    this.img = new Image();
    this.img.addEventListener('load', this.loaded);
    this.img.src = this.props.src;
  }

  loaded = () => {
    this.setState({
      isLoaded: true,
    });
  };

  render() {
    if (!this.props.src) return null;
    return (
      <div
        className={classNames(this.props.className, {
          loaded: this.state.isLoaded,
        })}
        style={{
          backgroundImage: `url(${this.props.src})`,
        }}
      />
    );
  }
}

BackgroundImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
};

export default BackgroundImage;
