import styled from '@emotion/styled';
import storage from 'local-storage-fallback';
import React, { FunctionComponent } from 'react';
import Iframe from 'react-iframe';
import { RouteComponentProps, withRouter } from 'react-router';
import CircularProgress from '../../../../components/CircularProgress/CurcularProgress';
import { CHATBOT_KEY, PROFILES_KEY } from '../../../../data/constants';
import { IChatbotMessage } from '../../../../dux/chatbot/chatbotDux';

interface IChatbotProps extends RouteComponentProps {
  isLoading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
}
const CHATBOT_URL = `http://demo-ui.sofiapulse.com/flow/5cc0971e3b38664237b6a077?postMessageUrl=${
  window.location.origin
}`;

const ChatbotPage: FunctionComponent<IChatbotProps> = ({
  startLoading,
  finishLoading,
  isLoading,
  history,
}) => {
  const isChatbotUrl = window.location.pathname.includes('/chatbot');
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
      const { customAttributes } = parsedData;
      if (type === 'chatbotChange') {
        storage.setItem(CHATBOT_KEY, JSON.stringify(parsedData));
        if (customAttributes && customAttributes.profile) {
          upsertProfile(customAttributes.profile);
        }
        if (parsedData.isBackButton) {
          removeLastProfile();
        }
        if (parsedData.isLast) {
          history.push('/categories');
        }
      }
    }
  };

  const upsertProfile = (profile: string) => {
    const proflesJSON = storage.getItem(PROFILES_KEY);
    const oldProfiles = proflesJSON ? JSON.parse(proflesJSON) || [] : [];

    const newProfiles = [...new Set([...oldProfiles, profile])];
    setTimeout(() => {
      storage.setItem(PROFILES_KEY, JSON.stringify(newProfiles));
    }, 0);
  };

  const removeLastProfile = () => {
    const proflesJSON = storage.getItem(PROFILES_KEY);
    const profiles = proflesJSON ? JSON.parse(proflesJSON) || [] : [];

    const newProfiles = [...profiles.slice(0, -1)];
    storage.setItem(PROFILES_KEY, JSON.stringify(newProfiles));
  };

  const handleIframeLoad = () => {
    finishLoading();
  };

  return (
    <Chatbot isHidden={!isChatbotUrl}>
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
    </Chatbot>
  );
};

const Chatbot = styled.div<{ isHidden?: boolean }>`
  position: absolute;
  left: -10000px;
  ${({ isHidden }) => !isHidden && `position: static; height: 100%;`}
`;

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translate(0, -100%);
`;

export default withRouter(ChatbotPage);
