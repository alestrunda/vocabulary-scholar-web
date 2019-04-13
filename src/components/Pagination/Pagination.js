import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  ITEMS_PER_PAGE,
  MAX_PAGINATION_ITEMS_ONE_DIRECTION_TO_SHOW,
} from '../../constants';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleDotsClick = this.handleDotsClick.bind(this);
  }

  state = {
    activePage: 0,
    directionsOpened: [],
  };

  handleDotsClick(direction) {
    //when clicked on dots (...) open that direction from the active page, so all pagination items in that direction will be rendered
    this.setState({
      directionsOpened: [...this.state.directionsOpened, direction],
    });
  }

  renderItem(pageNumber) {
    return (
      <li
        key={pageNumber}
        className={classNames('pagination__item', {
          active: this.state.activePage === pageNumber,
        })}
        onClick={this.handlePageClick.bind(null, pageNumber)}
      >
        {pageNumber + 1}
      </li>
    );
  }

  renderDots(direction) {
    return (
      <li
        key={direction}
        className="pagination__item pagination__item--clean"
        onClick={this.handleDotsClick.bind(null, direction)}
      >
        ...
      </li>
    );
  }

  renderItems(pageMax) {
    const pagesToLeftCount = this.state.activePage;
    const pagesToRightCount = pageMax - this.state.activePage;
    const items = [];

    //render items to the left from the active page
    if (
      this.props.maxItemsInOneDirection > 0 &&
      !this.state.directionsOpened.includes('left') &&
      pagesToLeftCount > this.props.maxItemsInOneDirection
    ) {
      //render only some items in left direction, render dots instead of the others
      items.push(this.renderItem(0)); //first item
      items.push(this.renderDots('left'));
      for (
        //items around the active page
        let i = pagesToLeftCount - this.props.maxItemsInOneDirection;
        i < pagesToLeftCount;
        i++
      ) {
        items.push(this.renderItem(i));
      }
    } else if (pagesToLeftCount > 0) {
      //render all items in left direction if any
      for (let i = 0; i < pagesToLeftCount; i++) {
        items.push(this.renderItem(i));
      }
    }

    //render active page
    items.push(this.renderItem(this.state.activePage));

    //render items to the right from the active page
    if (
      this.props.maxItemsInOneDirection > 0 &&
      !this.state.directionsOpened.includes('right') &&
      pagesToRightCount > this.props.maxItemsInOneDirection
    ) {
      //render only some items in right direction, render dots instead of the others
      for (
        //items around the active page
        let i = this.state.activePage + 1;
        i < this.state.activePage + this.props.maxItemsInOneDirection + 1;
        i++
      ) {
        items.push(this.renderItem(i));
      }
      items.push(this.renderDots('right'));
      items.push(this.renderItem(pageMax)); //last item
    } else if (pagesToRightCount > 0) {
      //render all items in right direction if any
      for (let i = this.state.activePage + 1; i <= pageMax; i++) {
        items.push(this.renderItem(i));
      }
    }
    return items;
  }

  componentDidUpdate(prevProps) {
    //when count of the children changes, reset the active page to prevent getting out of range
    if (prevProps.children.length !== this.props.children.length) {
      this.setState({
        activePage: 0,
      });
    }
  }

  componentDidMount() {
    this.loadStateFromProps();
  }

  loadStateFromProps() {
    const activePage = Math.min(this.props.activePage, this.getMaxPageNumber()); //make sure active page from props is not outside of pages range
    this.setState({
      activePage,
    });
  }

  handlePageClick(pageNumber) {
    if (pageNumber === this.state.activePage) return;
    this.setState({
      activePage: pageNumber,
    });
    this.props.onPageChange && this.props.onPageChange(pageNumber);
  }

  getMaxPageNumber() {
    return Math.ceil(this.props.children.length / this.props.itemsPerPage) - 1; //-1 because first page is on index 0
  }

  render() {
    const itemsToShow = React.Children.toArray(this.props.children).slice(
      this.state.activePage * this.props.itemsPerPage,
      (this.state.activePage + 1) * this.props.itemsPerPage
    );
    const pageMax = this.getMaxPageNumber();
    return (
      <React.Fragment>
        <ul className={this.props.listClassName} style={this.props.listStyle}>
          {itemsToShow}
        </ul>
        {pageMax > 0 && (
          <ul
            className={classNames('pagination', this.props.paginationClassName)}
          >
            {this.renderItems(pageMax)}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

Pagination.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.array,
  ]),
  itemsPerPage: PropTypes.number,
  listClassName: PropTypes.string,
  listStyle: PropTypes.object,
  paginationClassName: PropTypes.string,
  activePage: PropTypes.number,
  maxItemsInOneDirection: PropTypes.number,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  activePage: 0,
  itemsPerPage: ITEMS_PER_PAGE,
  maxItemsInOneDirection: MAX_PAGINATION_ITEMS_ONE_DIRECTION_TO_SHOW,
};

export default Pagination;
