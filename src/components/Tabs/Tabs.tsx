import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import animate from '../../utils/animate';
import useEventCallback from '../../utils/useEventCallback';
import { ITabProps } from '../Tab/Tab';

interface ITabsProps {
  value: any;
  scrollable?: boolean;
  children?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
}

const Tabs: FunctionComponent<ITabsProps> = ({
  children: childrenProp,
  onChange,
  value,
  scrollable,
}) => {
  const tabsRef = React.useRef<HTMLDivElement>(null);
  const valueToIndex = new Map();

  const getTabsMeta = () => {
    const tabsNode: HTMLDivElement | null = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect: DOMRect | ClientRect = tabsNode.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollWidth: tabsNode.scrollWidth,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (tabsNode && value !== false) {
      const child: HTMLCollection = tabsNode.children[0].children;

      if (child.length > 0) {
        const tab = child[valueToIndex.get(value)];
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return { tabsMeta, tabMeta };
  };

  const scroll = (scrollValue: number) => {
    animate('scrollLeft', tabsRef.current, scrollValue);
  };

  const scrollSelectedIntoView = useEventCallback(() => {
    const { tabsMeta, tabMeta } = getTabsMeta();
    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta.left < tabsMeta.left) {
      // left side of button is out of view
      const nextScrollLeft =
        tabsMeta.scrollLeft + (tabMeta.left - tabsMeta.left);
      scroll(nextScrollLeft);
    } else if (tabMeta.right > tabsMeta.right) {
      // right side of button is out of view
      const nextScrollLeft =
        tabsMeta.scrollLeft + (tabMeta.right - tabsMeta.right);
      scroll(nextScrollLeft);
    }
  });

  React.useEffect(() => {
    scrollSelectedIntoView();
  });

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

  return (
    <FlexContainer>
      <Scroller scrollable={scrollable} ref={tabsRef}>
        <FlexContainer>{children}</FlexContainer>
      </Scroller>
    </FlexContainer>
  );
};

const FlexContainer = styled.div<{ scrollable?: boolean }>`
  display: flex;
`;
const Scroller = styled.div<{ scrollable?: boolean }>`
  position: relative;
  display: inline-block;
  flex: 1 1 auto;
  white-space: nowrap;
  ${({ scrollable }) =>
    scrollable
      ? `overflow-x: scroll; scrollbar-width: none; ::-webkit-scrollbar { display: none; }`
      : `overflow-x: hidden; width: 100%;`}
`;

export default Tabs;
