import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { ReactComponent as CrossIcon } from './img/cross.svg';

interface IActionButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  type: 'save' | 'remove';
  text?: string;
}

interface IButtonProps {
  type: 'save' | 'remove';
  text: string | null;
}

const ActionButton: FunctionComponent<IActionButtonProps> = ({
  type = 'save',
  text = null,
  ...props
}): JSX.Element => {
  return (
    <StyledActionButton type={type} text={text} {...props}>
      <CrossIcon />
      {text && <StyledActionButtonText>{text}</StyledActionButtonText>}
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
  ${({ text }) =>
    text !== null &&
    `
      width: auto;
      border-radius: 25px;
      padding: 0 7px;
    `}

  justify-content: center;
  svg {
    width: 20px;
    height: 20px;
    fill: white;
  }
`;

const StyledActionButtonText = styled.span`
  margin-left: 5px;
  font-size: 14px;
`;

export default ActionButton;
