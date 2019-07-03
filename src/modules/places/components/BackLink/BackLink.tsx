import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ReactComponent as BackIcon } from './img/arrowBack.svg';

interface IProps extends RouteComponentProps {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const BackLink: FunctionComponent<IProps> = props => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (props.onClick) {
      props.onClick(e);
    } else {
      props.history.goBack();
    }
  };

  return (
    <NavLink onClick={handleClick} {...props}>
      <BackIcon />
    </NavLink>
  );
};

const NavLink = styled.div`
  cursor: pointer;
  height: 50px;
  width: 50px;
  top: -25px;
  background-color: #4ebbff;
  border: 2px solid white;
  color: white;
  border-radius: 50%;
  position: absolute;
  display: flex;
  align-items: center;
  background: linear-gradient(to right, #15b0e9, #99d8bc);
  justify-content: center;
  svg {
    width: 32px;
    height: 32px;
    fill: white;
  }
`;

export default withRouter(BackLink);
