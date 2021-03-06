import styled from '@emotion/styled';
import storage from 'local-storage-fallback';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router';
import SwipeableViews from 'react-swipeable-views';
import Img from '../../../../components/Img';
import Tab from '../../../../components/Tab';
import Tabs from '../../../../components/Tabs';
import {
  GOOGLE_PHOTO_API,
  NO_PHOTO_URL,
  PLACE_COLLECTION_KEY,
  SAVED_PLACES_KEY,
} from '../../../../data/constants';
import { IPlaceCollection } from '../../../../dux/init/initApi';
import {
  IDetails,
  IPlacePhoto,
  IPlaceReview,
} from '../../../../dux/places/placesApi';
import { useStateWithLocalStorage } from '../../../../utils/useStateWithLocalStorage';
import NotFoundPage from '../../../notFound';
import ActionButton from '../../components/ActionButton';
import AdressIcon from '../../components/AdressIcon';
import BackLink from '../../components/BackLink';
import PlacePhoto from '../../components/PlacePhoto';
import Rating from '../../components/Rating';
import Review from '../../components/Review';

interface IPlacesByIdPageProps extends RouteComponentProps<{ id: string }> {
  collection: IPlaceCollection;
  details: IDetails;
  reviews: IPlaceReview[];
  getReviews: (id: string) => void;
}

const PlacesByIdPage: FunctionComponent<IPlacesByIdPageProps> = ({
  match,
  collection,
  details,
  reviews,
  getReviews,
}) => {
  const [state, setState] = React.useState(0);
  const placeCollectionId = storage.getItem(PLACE_COLLECTION_KEY) || '';
  const [placesById, setPlacesById] = useStateWithLocalStorage(
    SAVED_PLACES_KEY,
    {},
  );
  const { id } = match.params;
  const savedPlaces = placesById[placeCollectionId] || [];
  const indexOfSavedPlace = savedPlaces.indexOf(id);
  const place = collection.places.find(item => item.id === id);

  React.useEffect(() => {
    if (!reviews) {
      getReviews(id);
    }
  }, [getReviews, id, reviews]);

  if (!place) {
    return <NotFoundPage />;
  }
  const imgUrl = prepareImageUrl(details && details.photos);

  const handleTabChange = (e: React.ChangeEvent<{}>, index: number) => {
    setState(index);
  };

  const handleChangeIndex = (index: number) => {
    setState(index);
  };

  const handleSavePlace = () => {
    if (indexOfSavedPlace !== -1) {
      setPlacesById({
        ...placesById,
        [placeCollectionId]: [
          ...savedPlaces.slice(0, indexOfSavedPlace),
          ...savedPlaces.slice(indexOfSavedPlace + 1, savedPlaces.length),
        ],
      });
    } else {
      setPlacesById({
        ...placesById,
        [placeCollectionId]: [...savedPlaces, id],
      });
    }
  };

  return (
    <Place>
      <PlacePhoto src={imgUrl} />
      <Content>
        <BackLink />
        {indexOfSavedPlace === -1 ? (
          <ActionButton
            type="save"
            text="Add to wishlist"
            onClick={handleSavePlace}
          />
        ) : (
          <ActionButton type="remove" onClick={handleSavePlace} />
        )}

        <PlaceName>{place.name}</PlaceName>
        {details && (
          <>
            <RankingContainer>
              <Rate>
                <Rating placeholderRating={details.rating} />
                <RateValue>{details.rating}</RateValue>
              </Rate>
              <Reviews>{(reviews || []).length} Google reviews</Reviews>
            </RankingContainer>
            <PlaceAdress>
              <StyledAdressIcon />
              {details.formatted_address}
            </PlaceAdress>
            {reviews && (
              <>
                <TabsWrapper>
                  <Tabs value={state} onChange={handleTabChange}>
                    <Tab label="Reviews" />
                    {details.photos && <Tab label="Gallery" />}
                  </Tabs>
                </TabsWrapper>
                <SwipeableViews
                  index={state}
                  enableMouseEvents={true}
                  animateHeight={true}
                  containerStyle={containerStyle}
                  onChangeIndex={handleChangeIndex}
                >
                  <div>
                    {reviews.map(review => (
                      <Review key={review.time} {...review} />
                    ))}
                  </div>
                  <ScrollWrapper>
                    {(details.photos || []).slice(1).map(item => {
                      return (
                        <ImgWrapper key={item.photo_reference}>
                          <Img
                            src={`${GOOGLE_PHOTO_API}/${item.photo_reference}`}
                            alt={place.name}
                          />
                        </ImgWrapper>
                      );
                    })}
                  </ScrollWrapper>
                </SwipeableViews>
              </>
            )}
          </>
        )}
      </Content>
    </Place>
  );
};

const prepareImageUrl = (photoList: IPlacePhoto[] = []) => {
  if (!photoList.length) {
    return NO_PHOTO_URL;
  }
  return `${GOOGLE_PHOTO_API}/${photoList[0].photo_reference}`;
};

const containerStyle = {
  width: '100%',
  marginBottom: '20px',
};

const Place = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  position: relative;
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
  font-size: 22px;
  display: flex;
`;

const RateValue = styled.div`
  color: #ffc850;
  margin-left: 10px;
  font-weight: 500;
`;

const Reviews = styled.div`
  color: #8591b0;
  margin-left: 20px;
`;

const PlaceAdress = styled.div`
  margin: 32px 0 24px 0;
  display: flex;
  max-width: 80%;
`;

const StyledAdressIcon = styled(AdressIcon)`
  width: 20px;
  min-width: 20px;
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

const TabsWrapper = styled.div`
  margin-bottom: 24px;
`;

export default PlacesByIdPage;
