import styled from '@emotion/styled';
import React from 'react';
import noImageSrc from '../../static/img/noImage.png';
interface IImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Img = ({ alt, src, ...other }: IImgProps): JSX.Element => {
  const [error, setErrorState] = React.useState(false);
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    setErrorState(true);
  };

  return error || src === noImageSrc ? (
    <ErrorBlock>
      <img src={noImageSrc} alt="noImage" />
    </ErrorBlock>
  ) : (
    <img onError={handleImageError} alt={alt} src={src} {...other} />
  );
};

const ErrorBlock = styled.div`
  background-image: linear-gradient(60deg, #2ae9dc 0%, #6093f8 100%);
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  width: 200px;
  text-align: center;
  border-radius: 10px;
`;

export default Img;
