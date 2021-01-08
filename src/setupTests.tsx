import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { theme } from './components/styles/theme';

type PropsWithChildren = { children?: React.ReactNode };

const withAllTheWrappers = ({ children }: PropsWithChildren): React.ReactElement => {
  return (
    <Router>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Router>
  );
};

const createMockComponent = (componentName: string) => {
  return jest.mock(`./components/${componentName}`, () => ({
    __esModule: true,
    default: () => <span>{componentName}</span>,
  }));
};

createMockComponent('Lobby');
createMockComponent('Game');
createMockComponent('QRCode');

Object.defineProperty(HTMLMediaElement.prototype, 'muted', { set: () => {} });

const customRender = (ui: React.ReactElement<any>) =>
  render(ui, { wrapper: withAllTheWrappers });

export { customRender as render };
