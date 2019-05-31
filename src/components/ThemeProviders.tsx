import { css, Global } from '@emotion/core';
import { ThemeProvider } from 'emotion-theming';
import React from 'react';

const theme = {
  colors: {},
};

const globalStyles = css`
  html,
  body,
  #root {
    min-height: 100%;
    height: 100%;
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif !important;
  }

  body {
    margin: 0;
    color: #222;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
  }

  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: #222;
  }

  table {
    border-collapse: collapse;
  }
`;

export default ({ children }: { children: any }) => (
  <>
    <Global styles={globalStyles} />
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </>
);
