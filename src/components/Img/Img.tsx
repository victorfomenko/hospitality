import styled from '@emotion/styled';
import React from 'react';
import noImageSrc from './img/noImage.svg';
interface IImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Img = ({ alt, src, ...other }: IImgProps): JSX.Element => {
  const [error, setErrorState] = React.useState(false);
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    setErrorState(true);
  };

  return (
    <StyledImg
      error={error}
      onError={handleImageError}
      alt={alt}
      src={error ? noImageSrc : src}
      {...other}
    />
  );
};

const StyledImg = styled.img<{ error: boolean }>`
  ${({ error }) => error && 'opacity: 0.2'}
`;

export default Img;
