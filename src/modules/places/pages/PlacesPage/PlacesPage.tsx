import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import PlaceCard from '../../../../components/PlaceCard';
import {
  ACTIVE_CATEGORY_KEY,
  CATEGORIES_KEY,
  CATEGORIES_MAP,
  CHATBOT_KEY,
} from '../../../../data/constants';
import { IPlace, IPlaceCollection } from '../../../../dux/init/initApi';
import { useStateWithLocalStorage } from '../../../../utils/useStateWithLocalStorage';

interface IPlacePageProps {
  collection: IPlaceCollection;
}

const PlacesPage: FunctionComponent<IPlacePageProps> = ({ collection }) => {
  const [categories] = useStateWithLocalStorage(CATEGORIES_KEY, []);
  const [activeCategory] = useStateWithLocalStorage(ACTIVE_CATEGORY_KEY, []);
  const [chatbot] = useStateWithLocalStorage(CHATBOT_KEY, {});
  const [state, setState] = React.useState({
    index: categories.indexOf(activeCategory),
  });
  const isEmpty = !categories.length && !Object.keys(chatbot).length;

  let places: IPlace[] = collection.places;
  if (categories.length !== 0) {
    places = places.filter(item => categories.includes(item.type));
  }
  const handleNavClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { index } = e.currentTarget.dataset;
    setState({ index: Number(index) });
  };

  const handleChangeIndex = (index: number) => {
    setState({ index });
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
      <Title>Recomendation</Title>
      <Nav>
        {categories.map((category: string, index: number) => (
          <NavItem
            key={category}
            isActive={state.index === index}
            data-index={index}
            onClick={handleNavClick}
          >
            {CATEGORIES_MAP[category] ? CATEGORIES_MAP[category] : category}
          </NavItem>
        ))}
      </Nav>
      <SwipeableViews
        index={state.index}
        onChangeIndex={handleChangeIndex}
        // style={swipableViewStyle}
        containerStyle={swipableContainerStyle}
        animateHeight={true}
        enableMouseEvents={true}
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
  padding: 35px 20px 0px 20px;
  height: 100%;
  overflow: auto;
  background-color: #eeeeee;
`;

const Title = styled.h1`
  color: #1f437f;
  font-size: 1.6rem;
  align-self: center;
  padding-bottom: 30px;
  max-width: 70%;
  text-align: center;
  line-height: 1.35417em;
  font-weight: 400;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
`;

const Nav = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 24px;
  overflow: auto;
`;

const NavItem = styled.div<{ isActive: boolean }>`
  flex-grow: 1;
  display: flex;
  cursor: pointer;
  color: #595959;
  padding: 16px 32px;
  text-align: center;
  justify-content: center;
  font-size: 20px;
  ${({ isActive }) =>
    isActive && 'border-bottom: 2px solid #3A51FE; color: #3A51FE;'}
  transition: border-color 300ms;
`;

export default PlacesPage;
