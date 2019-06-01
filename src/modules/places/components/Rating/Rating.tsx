import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import Rate from 'react-rating';
import { ReactComponent as StarIcon } from './img/star.svg';

const Rating: FunctionComponent<any> = props => {
  return (
    <Rate
      readonly={true}
      placeholderSymbol={<ActiveStar />}
      emptySymbol={<EmptyStar />}
      {...props}
    />
  );
};

const ActiveStar = styled(StarIcon)`
  fill: #ffdc64;
`;

const EmptyStar = styled(StarIcon)`
  fill: #e0e0e0;
`;

export default Rating;
