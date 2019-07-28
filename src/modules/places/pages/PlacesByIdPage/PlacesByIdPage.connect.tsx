import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IAppState } from '../../../../dux/duxRoot';
import * as initDux from '../../../../dux/init/initDux';
import * as placesDux from '../../../../dux/places/placesDux';
import PlacesByIdPage from './PlacesByIdPage';

const mapStateToProps = (
  state: IAppState,
  { match }: RouteComponentProps<{ id: string }>,
) => {
  return {
    collection: initDux.collectionSelector(state),
    details: placesDux.detailsByIdSelector(state, { id: match.params.id }),
  };
};

const mapDispatch = null;

export default connect(
  mapStateToProps,
  mapDispatch,
)(PlacesByIdPage);
