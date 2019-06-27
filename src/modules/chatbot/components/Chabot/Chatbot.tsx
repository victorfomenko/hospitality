import styled from '@emotion/styled';
import storage from 'local-storage-fallback';
import React, { FunctionComponent } from 'react';
import Iframe from 'react-iframe';
import { RouteComponentProps, withRouter } from 'react-router';
import CircularProgress from '../../../../components/CircularProgress/CurcularProgress';
import {
  ACTIVE_CATEGORY_KEY,
  CATEGORIES_KEY,
  CHATBOT_KEY,
} from '../../../../data/constants';
import { IChatbotMessage } from '../../../../dux/chatbot/chatbotDux';
import { useStateWithLocalStorage } from '../../../../utils/useStateWithLocalStorage';

interface IChatbotProps extends RouteComponentProps {
  isLoading: boolean;
  startLoading: () => void;
  finishLoading: () => void;
}

const CHATBOT_URL = `${process.env.REACT_APP_CHATBOT_URL}?postMessageUrl=${
  window.location.origin
}`;

const ChatbotPage: FunctionComponent<IChatbotProps> = ({
  startLoading,
  finishLoading,
  isLoading,
  history,
}) => {
  const isChatbotUrl = window.location.pathname.includes('/chatbot');
  const [, setCategories] = useStateWithLocalStorage(CATEGORIES_KEY, []);
  const [, setActiveCategory] = useStateWithLocalStorage(ACTIVE_CATEGORY_KEY);

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
  }, []);

  const handleMessage = ({ data }: { data: JSON }) => {
    if (data && typeof data === 'string') {
      const { type, data: parsedData }: IChatbotMessage = JSON.parse(data);
      if (type === 'chatbotChange') {
        const { categories, selectedCategory } = parsedData;
        storage.setItem(CHATBOT_KEY, JSON.stringify(parsedData));
        if (categories && selectedCategory) {
          setCategories(categories);
          setActiveCategory(selectedCategory);
        }
        if (parsedData.isBackButton) {
          setCategories([]);
          setActiveCategory(null);
        }
        if (parsedData.isLast) {
          history.push('/places');
        }
      }
    }
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
