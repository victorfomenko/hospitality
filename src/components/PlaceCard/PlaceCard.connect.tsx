import { connect } from 'react-redux';
import { IAppState } from '../../dux/duxRoot';
import { IPlace } from '../../dux/init/initApi';
import * as placesDux from '../../dux/places/placesDux';
import PlaceCard from './PlaceCard';

const mapStateToProps = (
  state: IAppState,
  { place, isVisible }: { place: IPlace; isVisible?: boolean },
) => {
  return {
    details: placesDux.detailsByIdSelector(state, { id: place.id }),
    isVisible,
  };
};

const mapDispatch = {
  getDetails: placesDux.getDetails,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(PlaceCard);
