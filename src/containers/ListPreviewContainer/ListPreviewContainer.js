import React from 'react';
import { connect } from 'react-redux';
import ListPreview from '../../components/ListPreview';

const ListPreviewContainer = props => <ListPreview {...props} />;

const mapStateToProps = state => ({
  words: state.words,
});

export default connect(mapStateToProps)(ListPreviewContainer);
