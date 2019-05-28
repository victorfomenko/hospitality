import styled from '@emotion/styled';
import React from 'react';

const CircularProgress = (props: { className?: string }) => {
  return (
    <Loader className={props.className}>
      <svg className="circular-loader" viewBox="25 25 50 50">
        <circle
          className="loader-path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke="#2196f3"
          strokeWidth="2"
        />
      </svg>
    </Loader>
  );
};

const Loader = styled.div`
  position: relative;
  margin: 0px auto;
  width: 100px;
  height: 100px;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
  & .circular-loader {
    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
  }
  & .loader-path {
    stroke-dasharray: 150, 200;
    stroke-dashoffset: -10;
    animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
    stroke-linecap: round;
  }
  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124;
    }
  }
  @keyframes color {
    0% {
      stroke: #2196f3;
    }
    40% {
      stroke: #2196f3;
    }
    66% {
      stroke: #2196f3;
    }
    80%,
    90% {
      stroke: #2196f3;
    }
  }
`;

export default CircularProgress;
