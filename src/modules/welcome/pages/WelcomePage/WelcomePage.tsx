import styled from '@emotion/styled';
import React from 'react';
import { IGalleryRes } from '../../../../dux/init/initApi';

interface IWelcomeProps {
  gallery: IGalleryRes;
}

const WelcomePage = ({ gallery }: IWelcomeProps) => (
  <Wrapper>
    <Title>{gallery.name}</Title>
    {JSON.stringify(gallery)}
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 30px;
`;
const Title = styled.h1`
  color: #31e0e0;
  font-size: 22px;
`;

export default WelcomePage;
