import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { GOOGLE_PHOTO_API, NO_PHOTO_URL } from '../../data/constants';
import { IPlace } from '../../dux/init/initApi';
import { IDetails, IPlacePhoto } from '../../dux/places/placesApi';
import { ReactComponent as MoreIcon } from './img/arrow.svg';
import { ReactComponent as LocationIcon } from './img/location.svg';
import { ReactComponent as StarIcon } from './img/star.svg';

interface IPlaceCard
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  details: IDetails;
  place: IPlace;
  isVisible?: boolean;
  getDetails: (ids: string[]) => void;
}

interface IPlaceImg {
  bgImg: string;
  isEmpty: boolean;
}

const PlaceCard: FunctionComponent<IPlaceCard> = ({
  place,
  details,
  isVisible,
  getDetails,
}: IPlaceCard): JSX.Element => {
  const placePhotos = details ? details.photos || [] : [];
  const isPhotosExists = placePhotos.length > 0;

  React.useEffect(() => {
    if (isVisible && !details) {
      getDetails([place.id]);
    }
  }, [details, getDetails, isVisible, place.id]);

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
          {details && (
            <Info>
              <Location>
                <StyledLocationIcon />
                <Adress>{details.formatted_address}</Adress>
              </Location>
              <Right>
                <Rate>
                  <StyledStarIcon />
                  <RateCount>{details.rating}</RateCount>
                </Rate>
                <MoreButton>
                  <MoreIcon />
                </MoreButton>
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
  margin-bottom: 10px;
  color: #444;

  @media (max-width: 379px) {
    font-size: 12px;
    line-height: 14px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  color: #5f5e5e;

  @media (max-width: 379px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const Location = styled.div`
  display: flex;
  font-size: 12px;

  @media (max-width: 379px) {
    font-size: 10px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: 379px) {
    flex-direction: row;
    align-items: center;
  }
`;

const Adress = styled.span`
  vertical-align: middle;
`;

const Rate = styled.div`
  white-space: nowrap;
  font-size: 12px;
  margin-left: 8px;

  @media (max-width: 379px) {
    margin-left: 0;
  }
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

const MoreButton = styled.div`
  cursor: pointer;
  height: 36px;
  width: 36px;
  background-color: #4ebbff;
  border: 2px solid white;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #15b0e9, #99d8bc);
  justify-content: center;
  margin-top: 5px;
  svg {
    width: 25px;
    height: 25px;
    fill: white;
    transform: rotate(180deg);
  }
`;

export default PlaceCard;
