import React from 'react';
import { shallow, mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import RatingStars from '../../../components/RatingStars';

it('renders correctly', () => {
  const ratingStars = shallow(<RatingStars stars={2} />);
  expect(ratingStars).toMatchSnapshot();
});

it('renders stars', () => {
  const length = 6,
    activeStars = 3,
    iconSize = 20;
  const ratingStars = shallow(
    <RatingStars iconSize={iconSize} length={length} stars={activeStars} />
  );
  expect(ratingStars.prop('style')).toHaveProperty('width', iconSize * length);
  expect(ratingStars.find('[data-testid="rating-star-unactive"]').length).toBe(
    length - activeStars
  );
  expect(ratingStars.find('[data-testid="rating-star-active"]').length).toBe(
    activeStars
  );
});

it('triggers onStarClick when Star clicked', () => {
  const activeStars = 2,
    onClick = jest.fn();
  const root = mount(
    <MuiThemeProvider>
      <RatingStars onStarClick={onClick} stars={activeStars} />
    </MuiThemeProvider>
  );
  const ratingStars = root.find('RatingStars');
  ratingStars
    .find('[data-testid="rating-star-unactive"]')
    .first()
    .simulate('click');
  expect(onClick).toHaveBeenCalledWith(activeStars + 1);
});

it('colors correct stars when Star hovered', () => {
  const activeStars = 3,
    colorUnactive = '#000',
    hoverColor = '#f00';
  const root = mount(
    <MuiThemeProvider>
      <RatingStars
        colorUnactive={colorUnactive}
        hoverColor={hoverColor}
        stars={activeStars}
      />
    </MuiThemeProvider>
  );
  const ratingStars = root.find('RatingStars');
  ratingStars
    .find('[data-testid="rating-star-unactive"]')
    .first()
    .simulate('mouseenter');
  ratingStars.find('Star').map(item => {
    if (item > activeStars) expect(item.prop('color')).toBe(colorUnactive);
    else expect(item.prop('color')).toBe(hoverColor);
  });
});
