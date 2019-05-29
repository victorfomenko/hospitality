import styled from '@emotion/styled';
import storage from 'local-storage-fallback';
import React from 'react';
import Iframe from 'react-iframe';
import CircularProgress from '../../../../components/CircularProgress/CurcularProgress';
import { CHATBOT_KEY } from '../../../../data/constants';
import { IChatbotMessage } from '../../../../dux/chatbot/chatbotDux';

interface IChatbotProps {
  isLoading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
  saveChatbotState: (data: object) => void;
}

const { location } = window;
const CHATBOT_URL =
  'http://demo-ui.sofiapulse.com/flow/5cc0971e3b38664237b6a077';
const CHATBOT_POST_MESSAGE_URL = `postMessageUrl=${location.origin}`;
let CHATBOT_START_MESSAGE = '';

const ChatbotPage = ({
  saveChatbotState,
  startLoading,
  finishLoading,
  isLoading,
}: IChatbotProps) => {
  React.useEffect(() => {
    startLoading();
    const iframe = document.getElementById('iframe');
    window.addEventListener('message', handleMessage);
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }
    const prevStateJSON = storage.getItem(CHATBOT_KEY);
    const prevState = prevStateJSON ? JSON.parse(prevStateJSON) : null;
    if (prevState) {
      CHATBOT_START_MESSAGE = `&start=${prevState.data.id}`;
    }
    return () => window.removeEventListener('message', handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null]);

  const handleMessage = ({ data }: { data: JSON }) => {
    if (data && typeof data === 'string') {
      const { type, data: parsedData }: IChatbotMessage = JSON.parse(data);
      if (type === 'chatbotChange') {
        chatbotChangeHandler(parsedData);
        storage.setItem(CHATBOT_KEY, data);
      }
    }
  };

  const chatbotChangeHandler = (data: object) => {
    saveChatbotState(data);
  };

  const handleIframeLoad = () => {
    finishLoading();
  };

  return (
    <>
      {isLoading && (
        <Wrapper>
          <CircularProgress />
        </Wrapper>
      )}
      <Iframe
        id="iframe"
        url={`${CHATBOT_URL}?${CHATBOT_POST_MESSAGE_URL}${CHATBOT_START_MESSAGE}`}
        frameBorder={0}
        width="100%"
        height="100%"
      />
    </>
  );
};

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translate(0, -100%);
`;

export default ChatbotPage;
