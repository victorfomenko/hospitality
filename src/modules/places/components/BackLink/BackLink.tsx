import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { ReactComponent as BackIcon } from './img/arrowBack.svg';

const BackLink: FunctionComponent<NavLinkProps> = props => {
  return (
    <StyledNavLink {...props}>
      <BackIcon />
    </StyledNavLink>
  );
};

const StyledNavLink = styled(NavLink)`
  cursor: pointer;
  height: 50px;
  width: 50px;
  top: -25px;
  background-color: #4ebbff;
  border: 2px solid white;
  color: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #15b0e9, #99d8bc);
  justify-content: center;
  svg {
    width: 32px;
    height: 32px;
    fill: white;
  }
`;

export default BackLink;
