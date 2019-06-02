import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { ReactComponent as CrossIcon } from './img/cross.svg';

interface IActionButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  type: 'save' | 'remove';
}

interface IButtonProps {
  type: 'save' | 'remove';
}

const ActionButton: FunctionComponent<IActionButtonProps> = ({
  type = 'save',
  ...props
}): JSX.Element => {
  return (
    <StyledActionButton type={type} {...props}>
      <CrossIcon />
    </StyledActionButton>
  );
};

const StyledActionButton = styled.div<IButtonProps>`
  cursor: pointer;
  height: 50px;
  width: 50px;
  top: -25px;
  background-color: #4ebbff;
  border: 2px solid white;
  color: white;
  border-radius: 50%;
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  ${({ type }) =>
    type === 'save' &&
    `background: linear-gradient(to right, #494aff, #006efe);`}
  ${({ type }) =>
    type === 'remove' &&
    `background: linear-gradient(to right, #c50349, #f1216c); transform: rotate(45deg);`}

  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
    fill: white;
  }
`;

export default ActionButton;
