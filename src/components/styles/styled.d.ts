import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    basicWidth: string;

    color: {
      [key: string]: string;
    };
  }
}
