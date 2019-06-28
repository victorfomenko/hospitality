import styled from '@emotion/styled';
import React, { CSSProperties, FC } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { ReactComponent as InfoIcon } from './img/info.svg';
import { ReactComponent as ListIcon } from './img/list.svg';
import { ReactComponent as MoodIcon } from './img/mood.svg';
import { ReactComponent as ProfileIcon } from './img/profile.svg';
import { ReactComponent as StarIcon } from './img/star.svg';

const svgGradientStyle: CSSProperties = {
  height: 0,
  width: 0,
  position: 'absolute',
};

const Menu: FC<{}> = () => (
  <Nav>
    <svg aria-hidden="true" focusable="false" style={svgGradientStyle}>
      <linearGradient id="icon-gradient" x2="1" y2="1">
        <stop offset="0%" stopColor="#6093F8" />
        <stop offset="100%" stopColor="#2AE9DC" />
      </linearGradient>
    </svg>
    <NavItem to="/welcome">
      <InfoIcon />
      <NavTitle>Info</NavTitle>
    </NavItem>
    <NavItem to="/chatbot">
      <ProfileIcon />
      <NavTitle>Chatbot</NavTitle>
    </NavItem>
    <NavItem to="/categories">
      <MoodIcon />
      <NavTitle>Mood</NavTitle>
    </NavItem>
    <NavItem to="/places">
      <ListIcon />
      <NavTitle>Places</NavTitle>
    </NavItem>
    <NavItem to="/saved">
      <StarIcon />
      <NavTitle>Wishlist</NavTitle>
    </NavItem>
  </Nav>
);

const Nav = styled.nav`
  height: 80px;
  min-height: 80px;
  display: flex;
  justify-content: space-around;
  box-shadow: rgba(0, 0, 0, 0.1) 0px -5px 50px;
  z-index: 1;
`;

const NavItem = styled(NavLink)<NavLinkProps>`
  height: 80%;
  align-self: center;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  cursor: pointer;
  border-right: 1px solid #eaeaea;
  flex-direction: column;
  &.active {
    svg {
      fill: url(#icon-gradient) #6093f8;
    }
  }
  svg {
    width: 32px;
    height: 32px;
    fill: #ccc;
    display: inline-block;
  }
  &:last-child {
    border-right: none;
  }
`;

const NavTitle = styled.div`
  font-size: 14px;
  margin-top: 6px;
  text-align: center;
`;

export default Menu;
