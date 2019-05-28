import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import { IGalleryRes } from '../../../../dux/init/initApi';
interface IWelcomeProps {
  gallery: IGalleryRes;
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

  return (
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
        <NavItem
          isActive={state.index === gallery.items.length}
          data-index={gallery.items.length}
          onClick={handleNavClick}
        />
      </Nav>
      <SwipeableViews
        index={state.index}
        onChangeIndex={handleChangeIndex}
        style={swipableViewStyle}
        containerStyle={swipableContainerStyle}
        slideStyle={swipableSlideStyle}
        enableMouseEvents={true}
      >
        {gallery.items.map(item => {
          return <img key={item.image} src={item.image} alt={item.name} />;
        })}
        <LastSection>
          <Button to="/chatbot">Start now</Button>
        </LastSection>
      </SwipeableViews>
    </Wrapper>
  );
};

const swipableViewStyle = {
  flexGrow: 1,
};

const swipableContainerStyle = {
  height: '100%',
};
const swipableSlideStyle = {
  margin: 'auto',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

const LastSection = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;
  justify-content: center;
`;

const Button = styled(Link)`
  isplay: inline-block;
  background-color: #6093f8;
  padding: 15px 30px;
  color: white !important;
  border-radius: 30px;
  position: absolute;
  bottom: 10%;
  font-size: 24px;
`;

export default WelcomePage;
