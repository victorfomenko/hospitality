import styled from '@emotion/styled';
import React, { FunctionComponent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../../../../components/Badge/Badge';
import { CATEGORIES_KEY } from '../../../../data/constants';
import { useStateWithLocalStorage } from '../../../../utils/useStateWithLocalStorage';
import withWidth from '../../../../utils/withWidth';

interface ICategoriesProps {
  categories: string[];
  width: number;
  height: number;
  children?: ReactNode;
}

const CategoriesPage: FunctionComponent<ICategoriesProps> = ({
  width,
  categories,
}) => {
  const [state, setState] = useStateWithLocalStorage(CATEGORIES_KEY, []);
  const categoryStyle = {
    width: `${width / 4}px`,
    height: `${width / 4}px`,
  };

  const handleClickCategory = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const { name } = e.currentTarget.dataset;
    const index = state.indexOf(name);
    if (index !== -1) {
      setState([
        ...state.slice(0, index),
        ...state.slice(index + 1, state.length),
      ]);
    } else {
      setState([...state, name]);
    }
  };

  return (
    <Wrapper>
      <Title>
        What are you in the mood for?
        <Divider />
      </Title>
      <CategoriesWrapper>
        <Categories>
          {[...new Set(categories)].map((item: string, index) => (
            <Badge
              key={index}
              style={categoryStyle}
              data-name={item}
              onClick={handleClickCategory}
              isActive={state.includes(item)}
            >
              {item}
            </Badge>
          ))}
        </Categories>
      </CategoriesWrapper>
      {state.length > 0 && (
        <ButtonWrapper>
          <Button to="/places">Recomendations</Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  padding: 35px 20px 0px 20px;
  background-color: #5fe9f8;
  background-image: linear-gradient(
    210deg,
    #15b0e9 0%,
    #5fe9f8 51%,
    #b6f8dbbd 75%
  );
  display: flex;
  flex-flow: column;
  position: relative;
  padding-bottom: 56px;
  overflow: auto;
`;

const Title = styled.h1`
  color: white;
  font-size: 1.3rem;
  align-self: center;
  padding-bottom: 30px;
  max-width: 70%;
  text-align: center;
  line-height: 1.35417em;
  font-weight: 400;
  margin: 35px 0;
`;

const Divider = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  &:after {
    content: ' ';
    border-bottom: 3px solid rgb(255, 255, 255);
    border-color: rgb(255, 255, 255);
    width: 25%;
    border-radius: 3px;
  }
`;

const CategoriesWrapper = styled.div`
  flex-grow: 1;
`;

const Categories = styled.div`
  grid-template-columns: auto auto auto;
  display: grid;
  grid-row-gap: 25px;
  justify-content: space-between;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled(Link)`
  font-size: 18px;
  font-weight: 500;
  background-color: #fff;
  padding: 14px 24px;
  cursor: pointer;
  align-items: center;
  color: #1f437f !important;
  border-radius: 24px;
`;

export default withWidth(CategoriesPage);
