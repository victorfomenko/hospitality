import styled from '@emotion/styled';
import React, { FunctionComponent, ReactNode } from 'react';
import { ReactComponent as CheckIcon } from './img/check.svg';

interface IBadge {
  children?: ReactNode;
  isActive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: object;
}

interface ICategory {
  isActive?: boolean;
}

const Badge: FunctionComponent<IBadge> = ({
  children,
  onClick,
  isActive,
  ...other
}: IBadge): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <StyledBadge onClick={handleClick} isActive={isActive} {...other}>
      {isActive && <StyledCheckIcon />}
      {children}
    </StyledBadge>
  );
};

const StyledBadge = styled.div<ICategory>`
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #1f437f;
  font-size: 18px;
  box-shadow: 5px 5px 15px rgb(133, 145, 176, 0.5);
  ${({ isActive }) =>
    isActive && `background-color: #1F437F; box-shadow: none; color: white;`}
  position: relative;
`;

const StyledCheckIcon = styled(CheckIcon)`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background-image: url('./img/check.svg');
`;

export default Badge;
