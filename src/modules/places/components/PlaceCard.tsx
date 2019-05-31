import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { NO_PHOTO_URL } from '../../../data/constants';
import { IPlace, IPlacePhoto } from '../../../dux/init/initApi';
import { ReactComponent as CommentIcon } from './img/comment.svg';
import { ReactComponent as LocationIcon } from './img/location.svg';

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
  ...props
}: IPlaceCard): JSX.Element => {
  const prepareImageUrl = (photoList: IPlacePhoto[]) => {
    if (!photoList.length) {
      return NO_PHOTO_URL;
    }
    const [firstPhoto] = photoList;

    return `/api/googleplace/photo/${firstPhoto.photo_reference}`;
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
            <Reviews>
              <StyledCommentIcon />
              <ReviewCount>{place.details.reviews.length}</ReviewCount>
            </Reviews>
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

const Adress = styled.span`
  vertical-align: middle;
`;

const Reviews = styled.div`
  white-space: nowrap;
  font-size: 12px;
`;

const ReviewCount = styled.span`
  vertical-align: middle;
`;

const StyledLocationIcon = styled(LocationIcon)`
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
