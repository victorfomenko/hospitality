import storage from 'local-storage-fallback';
import React from 'react';
import Iframe from 'react-iframe';

const ChatbotPage = () => {
  React.useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  });

  const handleMessage = ({ data }: { data: JSON }) => {
    if (data && typeof data === 'string') {
      const { type, data: parseData } = JSON.parse(data);
      storage.setItem(type, parseData);
    }
  };

  return (
    <Iframe
      url="http://demo-ui.sofiapulse.com/flow/5cc0971e3b38664237b6a077?postMessageUrl=http://localhost:3000"
      frameBorder={0}
      width="100%"
      height="100%"
    />
  );
};

export default ChatbotPage;
