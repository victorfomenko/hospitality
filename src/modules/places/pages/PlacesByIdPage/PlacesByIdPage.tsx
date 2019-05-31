import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import { GOOGLE_PHOTO_API, NO_PHOTO_URL } from '../../../../data/constants';
import { IPlaceCollection, IPlacePhoto } from '../../../../dux/init/initApi';
import NotFoundPage from '../../../notFound';

interface IPlacesByIdPageProps extends RouteComponentProps<{ id: string }> {
  collection: IPlaceCollection;
}

interface IPlaceWrapper {
  bgImg: string;
}

const PlacesByIdPage: FunctionComponent<IPlacesByIdPageProps> = ({
  match,
  collection,
}) => {
  const { id } = match.params;
  const place = collection.places.find(item => item.id === id);
  if (!place) {
    return <NotFoundPage />;
  }
  const imgUrl = prepareImageUrl(place.details.photos);

  return (
    <Place>
      <PlacePhoto bgImg={imgUrl} />
      <Content>
        <PlaceName>{place.name}</PlaceName>
        <FlexRow>
          <Rate>{place.details.rating}</Rate>
          <Reviews>{place.details.reviews.length} Google reviews</Reviews>
        </FlexRow>
      </Content>
    </Place>
  );
};

const prepareImageUrl = (photoList: IPlacePhoto[]) => {
  if (!photoList.length) {
    return NO_PHOTO_URL;
  }
  return `${GOOGLE_PHOTO_API}/${photoList[0].photo_reference}`;
};

const Place = styled.div`
  width: 100%;
  height: 100%;
`;

const PlacePhoto = styled.div<IPlaceWrapper>`
  height: 40%;
  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Content = styled.div`
  padding: 35px 20px 0px 20px;
`;

const PlaceName = styled.div`
  font-size: 24px;
  color: #444;
`;

const FlexRow = styled.div`
  display: flex;
`;

const Rate = styled.div`
  color: #ffc850;
  font-size: 18px;
`;

const Reviews = styled.div`
  color: #8591b0;
  margin-left: 20px;
`;

export default PlacesByIdPage;
