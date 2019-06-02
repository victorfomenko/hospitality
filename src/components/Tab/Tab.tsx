import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

export interface ITabProps {
  selected?: boolean;
  value?: any;
  icon?: string | React.ReactElement;
  label?: React.ReactNode;
  onChange?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: any,
  ) => void;
  onClick?: React.EventHandler<any>;
}

interface IWrapper {
  selected?: boolean;
}

const Tab = ({
  selected,
  onChange,
  onClick,
  value,
  label,
  icon,
  ...other
}: ITabProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onChange) {
      onChange(e, value);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Wrapper selected={selected} onClick={handleChange} {...other}>
      <StyledTab>
        {icon}
        {label}
      </StyledTab>
    </Wrapper>
  );
};

const Wrapper = styled.div<IWrapper>`
  padding: 10px 26px;
  font-size: 18px;
  cursor: pointer;
  border-bottom: ${({ selected }) =>
    selected ? '2px solid #7B7A87' : '1px solid #d7d7da'};
`;

const StyledTab = styled.span`
  display: inline-flex,
  alignItems: center,
  justifyContent: center,
  width: 100%,
  flexDirection: column,
`;

export default Tab;
