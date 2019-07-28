import { connect } from 'react-redux';
import { IAppState } from '../../../../dux/duxRoot';
import * as initDux from '../../../../dux/init/initDux';
import PlacesPage from './PlacesPage';

const mapStateToProps = (state: IAppState) => ({
  collection: initDux.collectionSelector(state),
});

const mapDispatch = null;

export default connect(
  mapStateToProps,
  mapDispatch,
)(PlacesPage);
