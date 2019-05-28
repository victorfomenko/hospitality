import storage from 'local-storage-fallback';
import React from 'react';
import Iframe from 'react-iframe';
import { CHATBOT_KEY } from '../../../../data/constants';

const { location } = window;
const CHATBOT_URL =
  'http://demo-ui.sofiapulse.com/flow/5cc0971e3b38664237b6a077';
const CHATBOT_POST_MESSAGE_URL = `postMessageUrl=${location.origin}`;

const ChatbotPage = () => {
  React.useEffect(() => {
    // const iframe = document.getElementById('iframe');
    window.addEventListener('message', handleMessage);
    // if (iframe) {
    //   iframe.addEventListener('load', handleIframeLoad);
    // }
    return () => window.removeEventListener('message', handleMessage);
  });

  const handleMessage = ({ data }: { data: JSON }) => {
    if (data && typeof data === 'string') {
      storage.setItem(CHATBOT_KEY, data);
    }
  };

  // const handleIframeLoad = () => {
  //   console.log('load');
  // };

  return (
    <Iframe
      id="iframe"
      url={`${CHATBOT_URL}?${CHATBOT_POST_MESSAGE_URL}`}
      frameBorder={0}
      width="100%"
      height="100%"
    />
  );
};

export default ChatbotPage;
