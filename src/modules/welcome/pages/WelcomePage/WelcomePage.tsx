import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { IGalleryRes } from '../../../../dux/init/initApi';
interface IWelcomeProps {
  gallery: IGalleryRes | null;
}

interface INavItem {
  isActive: boolean;
}

const WelcomePage = ({ gallery }: IWelcomeProps) => {
  const [state, setState] = React.useState({ index: 0 });

  const handleNavClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { index } = e.currentTarget.dataset;
    setState({ index: Number(index) });
  };

  const handleChangeIndex = (index: number) => {
    setState({ index });
  };

  return gallery ? (
    <Wrapper>
      <Title>{gallery.name}</Title>
      <Nav>
        {gallery.items.map((item, index) => (
          <NavItem
            key={item.image}
            isActive={state.index === index}
            data-index={index}
            onClick={handleNavClick}
          />
        ))}
      </Nav>
      <SwipeableViews
        index={state.index}
        onChangeIndex={handleChangeIndex}
        style={swipableViewStyle}
        containerStyle={swipableContainerStyle}
        slideStyle={swipableSlideStyle}
        enableMouseEvents={true}
      >
        {gallery.items.map((item, index) => (
          <React.Fragment key={item.image}>
            <Img src={item.image} alt={item.name} />
            <Button to="/chatbot">Start now</Button>
          </React.Fragment>
        ))}
      </SwipeableViews>
    </Wrapper>
  ) : null;
};

const swipableViewStyle: React.CSSProperties = {
  flexGrow: 1,
};

const swipableContainerStyle: React.CSSProperties = {
  height: '100%',
};

const swipableSlideStyle: React.CSSProperties = {
  margin: 'auto',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  padding: 30px 30px 0 30px;
  color: #31e0e0;
  font-size: 22px;
  margin: 0 0 8px 0;
`;

const Nav = styled.div`
  width: 100%;
  height: 14px;
  min-height: 14px;
  padding: 0 28px;
  display: flex;
`;

const NavItem = styled.div<INavItem>`
  flex-grow: 1;
  display: flex;
  background-color: #cccccc;
  margin: 5px 2px 5px 2px;
  border-radius: 2px;
  cursor: pointer;
  ${({ isActive }) => isActive && 'background-color: #30b9fb;'}
  transition: background-color 300ms;
`;

const Img = styled.img<{ isLast?: boolean }>`
  max-width: 100%;
  max-height: 100%;
  max-height: calc(100% - 128px);
`;

const Button = styled(Link)`
  white-space: nowrap;
  font-size: 18px;
  font-weight: 500;
  background: linear-gradient(to right, #15b0e9, #99d8bc);
  height: 48px;
  min-height: 48px;
  padding: 0px 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white !important;
  border-radius: 24px;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export default WelcomePage;
