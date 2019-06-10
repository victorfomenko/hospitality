import styled from '@emotion/styled';
import storage from 'local-storage-fallback';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import PlaceCard from '../../../../components/PlaceCard';
import {
  PLACE_COLLECTION_KEY,
  SAVED_PLACES_KEY,
} from '../../../../data/constants';
import { IPlaceCollection } from '../../../../dux/init/initApi';
import { useStateWithLocalStorage } from '../../../../utils/useStateWithLocalStorage';

interface ISavedPageProps extends RouteComponentProps<{ id: string }> {
  collection: IPlaceCollection;
}

const SavedPage: FunctionComponent<ISavedPageProps> = ({ collection }) => {
  const placeCollectionId = storage.getItem(PLACE_COLLECTION_KEY) || '';
  const [placesById] = useStateWithLocalStorage(SAVED_PLACES_KEY, {});
  const savedPlaces: string[] = placesById[placeCollectionId] || [];

  return savedPlaces.length === 0 ? (
    <Empty>
      <div>You have no saved places</div>
    </Empty>
  ) : (
    <Wrapper>
      <Title>Saved places</Title>
      {savedPlaces.map(placeId => {
        const place = collection.places.find(item => item.id === placeId);
        return place && <PlaceCard key={placeId} place={place} />;
      })}
    </Wrapper>
  );
};

const Empty = styled.div`
  height: 100%;
  padding: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: blue;
  }
`;

const Wrapper = styled.div`
  padding: 35px 20px 0px 20px;
  height: 100%;
  overflow: auto;
  background-color: #eeeeee;
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

export default SavedPage;
