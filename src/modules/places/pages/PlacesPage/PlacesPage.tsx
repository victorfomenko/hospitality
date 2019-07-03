import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import PlaceCard from '../../../../components/PlaceCard';
import Tab from '../../../../components/Tab';
import Tabs from '../../../../components/Tabs';
import {
  ACTIVE_CATEGORY_KEY,
  CATEGORIES_KEY,
  CATEGORIES_MAP,
  CHATBOT_KEY,
} from '../../../../data/constants';
import { IPlace, IPlaceCollection } from '../../../../dux/init/initApi';
import { useStateWithLocalStorage } from '../../../../utils/useStateWithLocalStorage';
import BackLink from '../../components/BackLink';

interface IPlacePageProps {
  collection: IPlaceCollection;
}

const PlacesPage: FunctionComponent<IPlacePageProps> = ({ collection }) => {
  const [categories] = useStateWithLocalStorage(CATEGORIES_KEY, []);
  const [activeCategory, setActiveCategory] = useStateWithLocalStorage(
    ACTIVE_CATEGORY_KEY,
  );
  const [chatbot] = useStateWithLocalStorage(CHATBOT_KEY, {});
  const [state, setState] = React.useState(
    categories.indexOf(activeCategory) !== -1
      ? categories.indexOf(activeCategory)
      : 0,
  );
  const isEmpty = !categories.length && !Object.keys(chatbot).length;

  let places: IPlace[] = collection.places;
  if (categories.length !== 0) {
    places = places.filter(item => categories.includes(item.type));
  }
  const handleTabChange = (e: React.ChangeEvent<{}>, index: number) => {
    setState(index);
    setActiveCategory(null);
  };

  const handleChangeIndex = (index: number) => {
    setState(index);
  };

  return isEmpty ? (
    <Empty>
      <div>
        For get recomended places plese answer for couple questions on{' '}
        <Link to="/categories">categories page</Link> or talk with our{' '}
        <Link to="/chatbot">assistant</Link>
      </div>
    </Empty>
  ) : (
    <Wrapper>
      <Header>
        <StyledBackLink />
        <Title>Our Top Picks</Title>
        <TabsWrapper>
          <Tabs value={state} onChange={handleTabChange}>
            {categories.map((category: string) => (
              <Tab
                key={category}
                label={
                  CATEGORIES_MAP[category] ? CATEGORIES_MAP[category] : category
                }
              />
            ))}
          </Tabs>
        </TabsWrapper>
      </Header>
      <Content>
        <SwipeableViews
          index={state}
          containerStyle={swipableContainerStyle}
          animateHeight={true}
          enableMouseEvents={true}
          onChangeIndex={handleChangeIndex}
        >
          {categories.map((category: string) => (
            <div key={category}>
              {places
                .filter(item => item.type === category)
                .map(place => (
                  <PlaceCard key={place.id} place={place} />
                ))}
            </div>
          ))}
        </SwipeableViews>
      </Content>
    </Wrapper>
  );
};

const swipableContainerStyle: React.CSSProperties = {
  marginBottom: '20px',
};

const Empty = styled.div`
  height: 100%;
  padding: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  a {
    color: blue;
  }
`;

const Wrapper = styled.div`
  background-color: #eeeeee;
  min-height: 100%;
  display: flex;
  max-height: 100%;
  flex-direction: column;
  overflow: auto;
`;

const Header = styled.div`
  padding-top: 25px;
  background-color: #eeeeee;
  position: fixed;
  top: 0;
  left: 20px;
  right: 20px;
  z-index: 1;
  display: flex;
  box-sizing: border-box;
  flex-shrink: 0;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  flex-grow: 1;
  padding: 146px 20px 0 20px;
`;

const Title = styled.h1`
  color: #1f437f;
  font-size: 1.6rem;
  align-self: center;
  padding-bottom: 20px;
  max-width: 70%;
  text-align: center;
  line-height: 1.35417em;
  font-weight: 400;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
`;

const StyledBackLink = styled(BackLink)`
  top: 24px;
  background: none;
  border-color: #b7b7b7;
  svg {
    fill: #b7b7b7;
  }
`;

const TabsWrapper = styled.div`
  width: 100%;
  display: flex;
  font-size: 18px;
  white-space: nowrap;
  overflow-x: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default PlacesPage;
