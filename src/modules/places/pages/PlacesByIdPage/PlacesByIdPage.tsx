import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import SwipeableViews from 'react-swipeable-views';
import { GOOGLE_PHOTO_API, NO_PHOTO_URL } from '../../../../data/constants';
import { IPlaceCollection, IPlacePhoto } from '../../../../dux/init/initApi';
import NotFoundPage from '../../../notFound';
import AdressIcon from '../../components/AdressIcon';
import Rating from '../../components/Rating';

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
        <RankingContainer>
          <Rate>
            <Rating placeholderRating={place.details.rating} />
            <RateValue>{place.details.rating}</RateValue>
          </Rate>
          <Reviews>{place.details.reviews.length} Google reviews</Reviews>
        </RankingContainer>
        <div>{place.name}</div>
        <PlaceAdress>
          <StyledAdressIcon />
          {place.details.formatted_address}
        </PlaceAdress>
        <SwipeableViews
          index={0}
          enableMouseEvents={true}
          containerStyle={containerStyle}
        >
          <ScrollWrapper>
            {place.details.photos.map(item => {
              return (
                <ImgWrapper key={item.photo_reference}>
                  <img
                    src={`${GOOGLE_PHOTO_API}/${item.photo_reference}`}
                    alt={place.name}
                  />
                </ImgWrapper>
              );
            })}
          </ScrollWrapper>
        </SwipeableViews>
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

const containerStyle = {
  width: '100%',
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

const RankingContainer = styled.div`
  display: flex;
  margin: 16px 0;
  align-items: center;
`;

const Rate = styled.div`
  font-size: 18px;
  display: flex;
`;

const RateValue = styled.div`
  color: #ffc850;
  margin-left: 15px;
  font-weight: bold;
`;

const Reviews = styled.div`
  color: #8591b0;
  margin-left: 20px;
`;

const PlaceAdress = styled.div`
  margin: 32px 0 16px 0;
  display: flex;
  max-width: 80%;
`;

const StyledAdressIcon = styled(AdressIcon)`
  width: 20px;
  height: 20px;
  margin-right: 4px;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: flex;
`;

const ImgWrapper = styled.div`
  height: 150px;
  width: auto;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  img {
    border-radius: 10px;
    height: 146px;
  }
`;

export default PlacesByIdPage;
