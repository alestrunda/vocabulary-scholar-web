import { connect } from 'react-redux';
import { appWordListSetPage } from '../../actions/app';
import { listSort } from '../../actions/list';
import { wordSetRating } from '../../actions/word';
import ListWords from '../../components/ListWords';

const mapStateToProps = (state, ownProps) => ({
  activePage: state.app.wordListsActivePages[ownProps.listID],
  itemsPerPage: state.app.itemsPerPage,
});

const mapDispatchToProps = dispatch => ({
  onPageChange: (pageNumber, listID) =>
    dispatch(appWordListSetPage(pageNumber, listID)),
  onRating: (wordID, rating) => dispatch(wordSetRating({ wordID, rating })),
  onSortChange: (listID, sortBy, isDescSort, words, forceResort) =>
    dispatch(listSort(listID, sortBy, isDescSort, words, forceResort)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWords);
