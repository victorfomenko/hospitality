import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { GOOGLE_PHOTO_API, NO_PHOTO_URL } from '../../data/constants';
import { IPlace, IPlacePhoto } from '../../dux/init/initApi';
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
}

const PlaceCard: FunctionComponent<IPlaceCard> = ({
  place,
}: IPlaceCard): JSX.Element => {
  const prepareImageUrl = (photoList: IPlacePhoto[]) => {
    if (!photoList.length) {
      return NO_PHOTO_URL;
    }
    return `${GOOGLE_PHOTO_API}/${photoList[0].photo_reference}`;
  };

  return (
    <Link to={`/places/${place.id}`}>
      <Card>
        <PlaceImg bgImg={prepareImageUrl(place.details.photos)} />
        <PlaceDescr>
          <PlaceName>{place.name}</PlaceName>
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
                <ReviewCount>{place.details.reviews.length}</ReviewCount>
              </Reviews>
            </Right>
          </Info>
        </PlaceDescr>
      </Card>
    </Link>
  );
};

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
  ${({ bgImg }) => `background-image: url(${bgImg})`}
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
  height: 16px;
  margin-right: 4px;
  vertical-align: middle;
`;

const StyledStarIcon = styled(StarIcon)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  vertical-align: middle;
`;

const StyledCommentIcon = styled(CommentIcon)`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  vertical-align: middle;
`;

export default PlaceCard;
