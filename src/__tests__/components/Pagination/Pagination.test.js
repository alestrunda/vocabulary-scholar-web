import React from 'react';
import { shallow } from 'enzyme';

import Pagination from '../../../components/Pagination';

const items = [
  <span className="item-1" key="1">
    1
  </span>,
  <span className="item-2" key="2">
    2
  </span>,
  <span className="item-3" key="3">
    3
  </span>,
  <span className="item-4" key="4">
    4
  </span>,
  <span className="item-5" key="5">
    5
  </span>,
  <span className="item-6" key="6">
    6
  </span>,
  <span className="item-7" key="7">
    7
  </span>,
  <span className="item-8" key="8">
    8
  </span>,
];

it('renders no pagination', () => {
  const className = 'items-class';
  const pagination = shallow(
    <Pagination listClassName={className} itemsPerPage={items.length}>
      {items}
    </Pagination>
  );
  expect(pagination.find('.pagination').length).toBe(0);
  expect(pagination.find(`.${className}`).children().length).toBe(items.length);
});

it('renders pagination by one item', () => {
  const itemsPerPage = 1,
    className = 'items-class',
    maxItemsInOneDirection = -1; //disables showing dots instead of pagination items
  const pagination = shallow(
    <Pagination
      itemsPerPage={itemsPerPage}
      listClassName={className}
      maxItemsInOneDirection={maxItemsInOneDirection}
    >
      {items}
    </Pagination>
  );
  expect(pagination.find('.pagination__item').length).toBe(items.length);
  expect(pagination.find(`.${className}`).children().length).toBe(itemsPerPage);
});

it('renders items from active page', () => {
  const itemsPerPage = 2,
    activePage = 1;
  const pagination = shallow(
    <Pagination activePage={activePage} itemsPerPage={itemsPerPage}>
      {items}
    </Pagination>
  );
  expect(pagination.find('.item-3').length).toBe(1);
  expect(pagination.find('.item-4').length).toBe(1);
});

it('renders last page with the rest of items', () => {
  const itemsPerPage = 7,
    activePage = 1,
    className = 'items-class';
  const pagination = shallow(
    <Pagination
      listClassName={className}
      activePage={activePage}
      itemsPerPage={itemsPerPage}
    >
      {items}
    </Pagination>
  );
  expect(pagination.find('.pagination__item').length).toBe(
    Math.ceil(items.length / itemsPerPage)
  );
  expect(pagination.find(`.${className}`).children().length).toBe(1);
});

it('renders new items on page click', () => {
  const itemsPerPage = 1,
    className = 'items-class';
  const pagination = shallow(
    <Pagination listClassName={className} itemsPerPage={itemsPerPage}>
      {items}
    </Pagination>
  );
  expect(pagination.find(`.item-1`).length).toBe(1);
  pagination
    .find('.pagination__item')
    .at(2)
    .simulate('click');
  expect(pagination.find(`.item-1`).length).toBe(0);
  expect(pagination.find(`.item-2`).length).toBe(0);
  expect(pagination.find(`.item-3`).length).toBe(1);
  expect(pagination.find(`.item-4`).length).toBe(0);
});

it('hides some pagination items', () => {
  const itemsPerPage = 1,
    className = 'items-class',
    activePage = 1,
    maxItemsInOneDirection = 1;
  const pagination = shallow(
    <Pagination
      listClassName={className}
      maxItemsInOneDirection={maxItemsInOneDirection}
      itemsPerPage={itemsPerPage}
      activePage={activePage}
    >
      {items}
    </Pagination>
  );
  expect(pagination.find('.pagination__item--clean').length).toBe(1);
  expect(pagination.find('.pagination__item').length).toBe(5);
});

it('hides some pagination items2', () => {
  const itemsPerPage = 1,
    className = 'items-class',
    activePage = 6,
    maxItemsInOneDirection = 1;
  const pagination = shallow(
    <Pagination
      listClassName={className}
      maxItemsInOneDirection={maxItemsInOneDirection}
      itemsPerPage={itemsPerPage}
      activePage={activePage}
    >
      {items}
    </Pagination>
  );
  expect(pagination.find('.pagination__item--clean').length).toBe(1);
  expect(pagination.find('.pagination__item').length).toBe(5);
});

it('hides some pagination items from beginning behind dots', () => {
  const itemsPerPage = 1,
    className = 'items-class',
    maxItemsInOneDirection = 1;
  const pagination = shallow(
    <Pagination
      listClassName={className}
      maxItemsInOneDirection={maxItemsInOneDirection}
      itemsPerPage={itemsPerPage}
    >
      {items}
    </Pagination>
  );
  expect(pagination.find('.pagination__item--clean').length).toBe(1);
  expect(
    pagination
      .find('.pagination__item')
      .at(0)
      .text()
  ).toBe('1');
  expect(
    pagination
      .find('.pagination__item')
      .at(1)
      .text()
  ).toBe('2');
  expect(
    pagination
      .find('.pagination__item')
      .at(2)
      .hasClass('pagination__item--clean')
  ).toBe(true);
  expect(
    pagination
      .find('.pagination__item')
      .at(3)
      .text()
  ).toBe('8');
});

it('hides some pagination items from end behind dots', () => {
  const itemsPerPage = 1,
    className = 'items-class',
    activePage = 7,
    maxItemsInOneDirection = 1;
  const pagination = shallow(
    <Pagination
      listClassName={className}
      maxItemsInOneDirection={maxItemsInOneDirection}
      itemsPerPage={itemsPerPage}
      activePage={activePage}
    >
      {items}
    </Pagination>
  );
  expect(pagination.find('.pagination__item--clean').length).toBe(1);
  expect(
    pagination
      .find('.pagination__item')
      .at(0)
      .text()
  ).toBe('1');
  expect(
    pagination
      .find('.pagination__item')
      .at(1)
      .hasClass('pagination__item--clean')
  ).toBe(true);
  expect(
    pagination
      .find('.pagination__item')
      .at(2)
      .text()
  ).toBe('7');
  expect(
    pagination
      .find('.pagination__item')
      .at(3)
      .text()
  ).toBe('8');
});

it('hides some pagination items from both ends behind dots', () => {
  const itemsPerPage = 1,
    className = 'items-class',
    activePage = 3,
    maxItemsInOneDirection = 1;
  const pagination = shallow(
    <Pagination
      listClassName={className}
      maxItemsInOneDirection={maxItemsInOneDirection}
      itemsPerPage={itemsPerPage}
      activePage={activePage}
    >
      {items}
    </Pagination>
  );
  expect(pagination.find('.pagination__item--clean').length).toBe(2);
  expect(
    pagination
      .find('.pagination__item')
      .at(0)
      .text()
  ).toBe('1');
  expect(
    pagination
      .find('.pagination__item')
      .at(1)
      .hasClass('pagination__item--clean')
  ).toBe(true);
  expect(
    pagination
      .find('.pagination__item')
      .at(2)
      .text()
  ).toBe('3');
  expect(
    pagination
      .find('.pagination__item')
      .at(3)
      .text()
  ).toBe('4');
  expect(
    pagination
      .find('.pagination__item')
      .at(4)
      .text()
  ).toBe('5');
  expect(
    pagination
      .find('.pagination__item')
      .at(5)
      .hasClass('pagination__item--clean')
  ).toBe(true);
  expect(
    pagination
      .find('.pagination__item')
      .at(6)
      .text()
  ).toBe('8');
});

it('handles activePage prop outside of pages range', () => {
  const itemsPerPage = 5,
    className = 'items-class',
    activePage = 2;
  const pagination = shallow(
    <Pagination
      listClassName={className}
      itemsPerPage={itemsPerPage}
      activePage={activePage}
    >
      {items}
    </Pagination>
  );
  expect(pagination.find('.pagination__item').length).toBe(2);
  expect(pagination.find('.item-5').length).toBe(0);
  expect(pagination.find('.item-6').length).toBe(1);
  expect(pagination.find('.item-8').length).toBe(1);
});
