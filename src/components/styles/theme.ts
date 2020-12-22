import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  size: {
    width: '800px',
    height: '600px',
  },
  color: {
    main: '#061763',
    sub: '#ffffff',
    red: '#df4242',
    darkred: '#a01b1b',
    orange: '#f57936',
    darkorange: '#bc4809',
    blue: '#4158D0',
    darkblue: '#14095c',
    lightpink: '#da7e7a',
    yellow: '#d69f20',
    gray: '#979797',
    darkgray: '#444444',
  },
  gradient: {
    main: 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
    sub: 'linear-gradient(240deg, #c5736f 0%, #9085b4 100%)',
  },
};

export { theme };
