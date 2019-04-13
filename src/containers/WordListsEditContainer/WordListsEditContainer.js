import { connect } from 'react-redux';
import WordListsEdit from '../../components/WordListsEdit';
import { wordListSelected } from '../../actions/word';

const mapStateToProps = state => ({
  lists: state.lists,
});

const mapDispatchToProps = dispatch => ({
  onListSelected: (wordID, listID) =>
    dispatch(wordListSelected(wordID, listID)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordListsEdit);
