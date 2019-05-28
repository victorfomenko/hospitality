import styled from '@emotion/styled';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IAppState } from '../../dux/duxRoot';
import { loadingSelector } from '../../dux/init/initDux';
import CircularProgress from '../CircularProgress/CurcularProgress';
import Menu from '../Menu';

interface ILayoutProps extends RouteComponentProps {
  children: React.ReactNode;
  isLoading: boolean;
}

const Layout = (props: ILayoutProps) =>
  props.isLoading ? (
    <ProgressWrapper>
      <CircularProgress />
    </ProgressWrapper>
  ) : (
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

const ProgressWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-height: 100%;
`;

const mapStateToProps = (state: IAppState) => ({
  isLoading: loadingSelector(state),
});

export default connect(mapStateToProps)(withRouter(Layout));
