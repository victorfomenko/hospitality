import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES_KEY, CHATBOT_KEY } from '../../../../data/constants';
import { useStateWithLocalStorage } from '../../../../utils/useStateWithLocalStorage';

const PlacesPage: FunctionComponent = () => {
  const [categories] = useStateWithLocalStorage(CATEGORIES_KEY);
  const [chatbot] = useStateWithLocalStorage(CHATBOT_KEY);
  const isEmpty = !categories && !chatbot;

  return isEmpty ? (
    <Empty>
      <div>
        For get recomended places plese answer for couple questions on{' '}
        <Link to="/categories">categories page</Link> or talk with our{' '}
        <Link to="/chatbot">assistant</Link>
      </div>
    </Empty>
  ) : (
    <Places>Places page</Places>
  );
};

const Empty = styled.div`
  height: 100%;
  padding: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  a {
    color: blue;
  }
`;
const Places = styled.div`
  height: 100%;
`;

export default PlacesPage;
