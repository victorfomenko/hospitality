import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { ReactComponent as AddIcon } from './img/add.svg';
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
      {children}
      {isActive ? <StyledCheckIcon /> : <StyledAddIcon />}
    </StyledBadge>
  );
};

const StyledBadge = styled.div<ICategory>`
  height: 42px;
  padding: 8px 18px;
  background-color: #ffffff;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1f437f;
  font-size: 16px;
  box-shadow: 5px 5px 15px rgb(133, 145, 176, 0.5);
  ${({ isActive }) =>
    isActive && `background-color: #1F437F; box-shadow: none; color: white;`}
  position: relative;
  transition background-color 0.2s
`;

const StyledCheckIcon = styled(CheckIcon)`
  width: 18px;
  height: 18px;
  min-width: 18px;
  background-image: url('./img/check.svg');
`;

const StyledAddIcon = styled(AddIcon)`
  width: 18px;
  height: 18px;
  min-width: 18px;
  background-image: url('./img/add.svg');
`;

export default Badge;
