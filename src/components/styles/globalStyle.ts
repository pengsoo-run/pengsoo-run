import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    font-family: 'Staatliches', 'Noto Sans KR', cursive, sans-serif;
    background-color: ${theme.color.blue};
    background-image: ${theme.gradient.main};
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
    animation: fadeIn 0.7s;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
