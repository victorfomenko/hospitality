import styled from '@emotion/styled';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Menu from '../Menu';

interface ILayoutProps extends RouteComponentProps {
  children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => (
  <Wrapper>
    <Content>{props.children}</Content>
    <Menu />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100%;
  justify-content: space-between;
`;
const Content = styled.div`
  height: calc(100% - 80px);
  overflow: auto;
`;

export default withRouter(Layout);
