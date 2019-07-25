import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { GOOGLE_PHOTO_API, NO_PHOTO_URL } from '../../data/constants';
import { IPlace } from '../../dux/init/initApi';
import { IPlacePhoto } from '../../dux/places/placesApi';
import { ReactComponent as CommentIcon } from './img/comment.svg';
import { ReactComponent as LocationIcon } from './img/location.svg';
import { ReactComponent as StarIcon } from './img/star.svg';

interface IPlaceCard
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  place: IPlace;
}

interface IPlaceImg {
  bgImg: string;
  isEmpty: boolean;
}

const PlaceCard: FunctionComponent<IPlaceCard> = ({
  place,
}: IPlaceCard): JSX.Element => {
  const placePhotos = place.details ? place.details.photos || [] : [];
  const isPhotosExists = placePhotos.length > 0;

  const prepareImageUrl = (photoList: IPlacePhoto[] = []) => {
    if (!isPhotosExists) {
      return NO_PHOTO_URL;
    }
    return `${GOOGLE_PHOTO_API}/${photoList[0].photo_reference}`;
  };

  return (
    <StyledLink to={`/places/${place.id}`}>
      <Card>
        <PlaceImg
          isEmpty={!isPhotosExists}
          bgImg={prepareImageUrl(placePhotos)}
        />
        <PlaceDescr>
          <PlaceName>{place.name}</PlaceName>
          {place.details && (
            <Info>
              <Location>
                <StyledLocationIcon />
                <Adress>{place.details.formatted_address}</Adress>
              </Location>
              <Right>
                <Rate>
                  <StyledStarIcon />
                  <RateCount>{place.details.rating}</RateCount>
                </Rate>
                <Reviews>
                  <StyledCommentIcon />
                  <ReviewCount>
                    {(place.details.reviews || []).length}
                  </ReviewCount>
                </Reviews>
              </Right>
            </Info>
          )}
        </PlaceDescr>
      </Card>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: block;
`;

const Card = styled.div`
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  cursor: pointer;
`;

const PlaceImg = styled.div<IPlaceImg>`
  display: inline-block;
  width: 100px;
  min-width: 100px;
  height: 60px;
  margin-right: 20px;
  border-radius: 10px;
  background-size: cover;
  ${({ bgImg, isEmpty }) =>
    isEmpty
      ? `background-image: url(${bgImg}), linear-gradient(60deg,#2ae9dc 0%,#6093f8 100%); background-size: contain; background-position: center center; background-repeat: no-repeat;`
      : `background-image: url(${bgImg});`}
`;

const PlaceDescr = styled.div`
  flex-grow: 1;
`;

const PlaceName = styled.div`
  margin-bottom: 23px;
  color: #444;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  color: #5f5e5e;
`;

const Location = styled.div`
  display: flex;
  font-size: 12px;
`;

const Right = styled.div`
  display: flex;
`;

const Adress = styled.span`
  vertical-align: middle;
`;

const Reviews = styled.div`
  white-space: nowrap;
  font-size: 12px;
  margin-left: 8px;
`;

const ReviewCount = styled.span`
  vertical-align: middle;
`;

const Rate = styled.div`
  white-space: nowrap;
  font-size: 12px;
  margin-left: 8px;
`;

const RateCount = styled.span`
  vertical-align: middle;
`;

const StyledLocationIcon = styled(LocationIcon)`
  width: 16px;
  min-width: 16px;
  height: 16px;
  margin-right: 4px;
  vertical-align: middle;
`;

const StyledStarIcon = styled(StarIcon)`
  width: 16px;
  min-width: 16px;
  height: 16px;
  margin-right: 4px;
  vertical-align: middle;
`;

const StyledCommentIcon = styled(CommentIcon)`
  width: 16px;
  min-width: 16px;
  height: 16px;
  margin-right: 4px;
  vertical-align: middle;
`;

export default PlaceCard;
