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
  width: 100%;
  overflow: hidden;
`;

const Title = styled.h1`
  padding: 30px 30px 0 30px;
  color: #31e0e0;
  font-size: 22px;
  margin: 0;
`;

export default WelcomePage;
