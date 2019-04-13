import React from 'react';
import PropTypes from 'prop-types';
import ListSelect from '../ListSelect';
import Popup from '../Popup';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

class WordListsEdit extends React.Component {
  state = {
    popupListsOpened: false,
  };

  closeListsPopup = () => {
    this.setState({
      popupListsOpened: false,
    });
  };

  openListsPopup = () => {
    this.setState({
      popupListsOpened: true,
    });
  };

  handleListClick = listID => {
    this.props.onListSelected(this.props.wordID, listID);
  };

  render() {
    const lists = this.props.lists
      .filter(list => list.wordIDs.includes(this.props.wordID)) //get only those lists which include the word
      .map(list => (
        <Link className="label" key={list.id} to={`/list/${list.id}`}>
          {list.name}
        </Link>
      ));

    return (
      <React.Fragment>
        <div className="mb20">
          {this.props.lists.length > 0 ? lists : 'none'}
        </div>
        {this.props.lists.length > 0 && (
          <div className="text-center">
            <RaisedButton
              primary
              onClick={this.openListsPopup}
              label="Edit lists"
            />
          </div>
        )}
        <Popup
          isActive={this.state.popupListsOpened}
          onClose={this.closeListsPopup}
          title="Set lists"
        >
          <div className="grid grid--small text-center">
            {this.props.lists.map(list => {
              const isInList = list.wordIDs.includes(this.props.wordID);
              return (
                <div
                  className="grid__item grid__item--sm-span-6 mb10"
                  key={list.id}
                >
                  <ListSelect
                    list={list}
                    isSelected={isInList}
                    onClick={this.handleListClick}
                  />
                </div>
              );
            })}
          </div>
        </Popup>
      </React.Fragment>
    );
  }
}

WordListsEdit.defaultProps = {
  lists: [],
};

WordListsEdit.propTypes = {
  lists: PropTypes.array,
  wordID: PropTypes.string,
  onListSelected: PropTypes.func.isRequired,
};

export default WordListsEdit;
