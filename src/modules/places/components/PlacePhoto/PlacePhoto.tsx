import styled from '@emotion/styled';
import React from 'react';
import noImageSrc from './img/noImage.png';
interface IPlacePhotoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const PlacePhoto = ({ src, ...other }: IPlacePhotoProps): JSX.Element => {
  const [error, setErrorState] = React.useState(false);
  const handleError = () => {
    setErrorState(true);
  };

  return error ? (
    <ErrorBlock>
      <img src={noImageSrc} alt="noImage" />
    </ErrorBlock>
  ) : (
    <Photo src={src} onError={handleError} {...other} />
  );
};

const Photo = styled.img`
  height: 40%;
  width: 100%;
  object-fit: cover;
`;

const ErrorBlock = styled.div`
  height: 40%;
  background: linear-gradient(60deg, #2ae9dc 0%, #6093f8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 120px;
  }
`;

export default PlacePhoto;
