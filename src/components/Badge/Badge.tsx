import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { ReactComponent as CheckIcon } from './img/check.svg';

interface IBadge
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isActive?: boolean;
}

interface ICategory {
  isActive?: boolean;
}

const Badge: FunctionComponent<IBadge> = ({
  children,
  onClick,
  isActive,
  ...props
}: IBadge): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <StyledBadge onClick={handleClick} isActive={isActive} {...props}>
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
  color: #1f437f;
  font-size: 18px;
  box-shadow: 5px 5px 15px rgb(133, 145, 176, 0.5);
  ${({ isActive }) =>
    isActive && `background-color: #1F437F; box-shadow: none; color: white;`}
  position: relative;
  transition background-color 0.2s
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