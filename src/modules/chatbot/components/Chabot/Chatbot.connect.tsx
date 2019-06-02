import { connect } from 'react-redux';
import * as chatbotDux from '../../../../dux/chatbot/chatbotDux';
import { IAppState } from '../../../../dux/duxRoot';
import Chatbot from './Chatbot';

const mapStateToProps = (state: IAppState) => ({
  isLoading: chatbotDux.loadingSelector(state),
});

const mapDispatch = {
  startLoading: chatbotDux.loading,
  finishLoading: chatbotDux.success,
};

export default connect(
  mapStateToProps,
  mapDispatch,
)(Chatbot);
