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
}
const CHATBOT_URL = `http://demo-ui.sofiapulse.com/flow/5cc0971e3b38664237b6a077?postMessageUrl=${
  window.location.origin
}`;

const ChatbotPage = ({
  startLoading,
  finishLoading,
  isLoading,
}: IChatbotProps) => {
  const [url] = React.useState(() => {
    const chatbotData = storage.getItem(CHATBOT_KEY);
    const data = chatbotData ? JSON.parse(chatbotData) : null;

    if (!data) {
      return CHATBOT_URL;
    }
    return `${CHATBOT_URL}&start=${data.id}`;
  });

  React.useEffect(() => {
    startLoading();
    const iframe = document.getElementById('iframe');
    window.addEventListener('message', handleMessage);
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
    }
    return () => window.removeEventListener('message', handleMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [null]);

  const handleMessage = ({ data }: { data: JSON }) => {
    if (data && typeof data === 'string') {
      const { type, data: parsedData }: IChatbotMessage = JSON.parse(data);
      if (type === 'chatbotChange') {
        storage.setItem(CHATBOT_KEY, JSON.stringify(parsedData));
      }
    }
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
        url={url}
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
