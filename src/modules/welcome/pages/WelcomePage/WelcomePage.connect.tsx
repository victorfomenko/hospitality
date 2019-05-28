import { connect } from 'react-redux';
import { IAppState } from '../../../../dux/duxRoot';
import * as initDux from '../../../../dux/init/initDux';
import WelcomePage from './WelcomePage';

const mapStateToProps = (state: IAppState) => ({
  gallery: initDux.gallerySelector(state),
});

const mapDispatch = null;

export default connect(
  mapStateToProps,
  mapDispatch,
)(WelcomePage);
