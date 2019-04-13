import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import { DEFAULT_SORTING_OPTIONS } from '../../constants';

const WithWordSorting = WrappedComponent => {
  class WithWordSortingComponent extends React.Component {
    state = {
      sortBy: undefined,
      isDescSort: false,
    };

    componentDidMount() {
      this.setState(
        {
          sortBy: this.props.sortBy,
          isDescSort: this.props.isDescSort,
        },
        () => {
          this.sortSettingsChanged(); //trigger init sorting with default sorting options
        }
      );
    }

    componentDidUpdate(prevProps) {
      //check for change in items and re-sort them
      if (
        JSON.stringify(prevProps.itemsIDs) !==
        JSON.stringify(this.props.itemsIDs)
      )
        this.sortSettingsChanged();
    }

    handleSortByChange = (event, index, value) => {
      this.setState(
        {
          sortBy: value,
        },
        () => {
          const forceResort = true;
          this.sortSettingsChanged(forceResort);
        }
      );
    };

    handleSortOrderChange = (event, isChecked) => {
      this.setState(
        {
          isDescSort: isChecked,
        },
        () => {
          const forceResort = true;
          this.sortSettingsChanged(forceResort);
        }
      );
    };

    sortSettingsChanged(forceResort = false) {
      this.props.onSortChange(
        this.props.listID,
        this.state.sortBy,
        this.state.isDescSort,
        this.props.items,
        forceResort
      );
    }

    render() {
      const extraSortingOptions = this.props.extraSortingOptions || [];
      const sortingItems = [...extraSortingOptions, ...DEFAULT_SORTING_OPTIONS];
      return (
        <React.Fragment>
          <WrappedComponent {...this.props} items={this.props.items} />
          {this.props.items.length > 0 && (
            <div className="container">
              <div className="grid grid--items-center">
                <div className="grid__item grid__item--md-span-6">
                  <SelectField
                    style={{ width: '100%', maxWidth: 300 }}
                    floatingLabelText="Sort by"
                    value={this.state.sortBy}
                    onChange={this.handleSortByChange}
                  >
                    {sortingItems.map(option => (
                      <MenuItem
                        key={option.sortingFuncName}
                        value={option.sortingFuncName}
                        primaryText={option.title}
                      />
                    ))}
                  </SelectField>
                </div>
                <div className="grid__item grid__item--md-span-6 text-right text-sm-left">
                  <Toggle
                    data-testid="sortOrderToggle"
                    label="Reverse order"
                    style={{
                      width: 170,
                      marginTop: 10,
                      marginBottom: 10,
                      display: 'inline-block',
                      textAlign: 'left',
                    }}
                    onToggle={this.handleSortOrderChange}
                    defaultToggled={this.state.isDescSort}
                  />
                </div>
              </div>
            </div>
          )}
        </React.Fragment>
      );
    }
  }

  WithWordSortingComponent.propTypes = {
    listID: PropTypes.string.isRequired,
    itemsIDs: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    sortBy: PropTypes.string,
    isDescSort: PropTypes.bool,
    onSortChange: PropTypes.func.isRequired,
    extraSortingOptions: PropTypes.array,
  };

  WithWordSortingComponent.defaultProps = {
    items: [],
    sortBy: 'date-added',
    isDescSort: false,
  };

  return WithWordSortingComponent;
};

export default WithWordSorting;
