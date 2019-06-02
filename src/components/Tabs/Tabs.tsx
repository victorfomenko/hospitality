import styled from '@emotion/styled';
import React, { FunctionComponent, ReactNode } from 'react';
import { ITabProps } from '../Tab/Tab';

interface ITabsProps {
  value: any;
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
}

const Tabs: FunctionComponent<ITabsProps> = ({
  children: childrenProp,
  onChange,
  value,
}) => {
  const valueToIndex = new Map();
  let childIndex = 0;

  const children = React.Children.map(
    childrenProp,
    (child: React.ReactElement<ITabProps>) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const childValue =
        child.props.value === undefined ? childIndex : child.props.value;
      valueToIndex.set(childValue, childIndex);
      const selected = childValue === value;

      childIndex += 1;
      return React.cloneElement(child, {
        selected,
        onChange,
        value: childValue,
      });
    },
  );

  return <FlexContainer>{children}</FlexContainer>;
};

const FlexContainer = styled.div`
  display: flex;
`;

export default Tabs;
