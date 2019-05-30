import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES_KEY, CHATBOT_KEY } from '../../../../data/constants';
import { IPlaceCollection } from '../../../../dux/init/initApi';
import { useStateWithLocalStorage } from '../../../../utils/useStateWithLocalStorage';

interface IPlacePageProps {
  collection: IPlaceCollection;
}

const PlacesPage: FunctionComponent<IPlacePageProps> = ({ collection }) => {
  const [categories] = useStateWithLocalStorage(CATEGORIES_KEY, []);
  const [chatbot] = useStateWithLocalStorage(CHATBOT_KEY, {});
  const isEmpty = !categories.length && !Object.keys(chatbot).length;
  const places = collection.places.filter(item =>
    categories.includes(item.type),
  );
  return isEmpty ? (
    <Empty>
      <div>
        For get recomended places plese answer for couple questions on{' '}
        <Link to="/categories">categories page</Link> or talk with our{' '}
        <Link to="/chatbot">assistant</Link>
      </div>
    </Empty>
  ) : (
    <Places>
      <Title>Recomendation</Title>
      {places.map(place => (
        <div key={place.id}>{place.name}</div>
      ))}
    </Places>
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
  padding: 35px 20px 0px 20px;
  height: 100%;
  overflow: auto;
`;

const Title = styled.h1`
  color: #1f437f;
  font-size: 1.6rem;
  align-self: center;
  padding-bottom: 30px;
  max-width: 70%;
  text-align: center;
  line-height: 1.35417em;
  font-weight: 400;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
`;

export default PlacesPage;
