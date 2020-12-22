import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    size: {
      width: string;
      height: string;
    };
    color: {
      [key: string]: string;
    };
    gradient: {
      [key: string]: string;
    };
  }
}
