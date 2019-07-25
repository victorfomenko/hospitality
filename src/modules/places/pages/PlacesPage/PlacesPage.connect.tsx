import { connect } from 'react-redux';
import { IAppState } from '../../../../dux/duxRoot';
import * as initDux from '../../../../dux/init/initDux';
import * as placesDux from '../../../../dux/places/placesDux';
import PlacesPage from './PlacesPage';

const mapStateToProps = (state: IAppState) => ({
  collection: initDux.collectionSelector(state),
  details: placesDux.detailsSelector(state),
});

const mapDispatch = null;

export default connect(
  mapStateToProps,
  mapDispatch,
)(PlacesPage);
